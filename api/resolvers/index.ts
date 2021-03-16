import { IApolloExpressContext } from "../";
import { Prisma } from '../db';

type ResolverFn = (parent: any, args: any, ctx: IApolloExpressContext) => any;
interface ResolverMap {
  [field: string]: ResolverFn;
}

interface IResolvers {
  Query: ResolverMap;
  Mutation: ResolverMap;
  Recipe: ResolverMap;
  Ingredient: ResolverMap;
}

type connectIds = { id: string };

function generateConnectAndCreateArrays<Obj extends {}>(array: (connectIds | Obj)[]) {
  return array.reduce<(connectIds | Obj)[][]>(([connectArr, newArr], item) => {
    return typeof item === "string" ? [[...connectArr, { id: item }], newArr] : [connectArr, [...newArr, item]];
  }, [[], []]);
}

const isNewIngredient = (ingredient: String | Prisma.IngredientCreateWithoutRecipesInput): ingredient is Prisma.IngredientCreateWithoutRecipesInput => typeof ingredient === "string"

// @ts-expect-error // FIXME: np idea what the problem is yet
export const resolvers: IResolvers = {
  Query: {
    recipes: async (parent, args, { db }) => await db.recipe.findMany({
      include: {
        ingredients: {
          select: {
            id: true,
            name: true
          }
        },
      },
    }),
    recipe: async (parent, args, { db }) =>
      await db.recipe.findUnique({
        where: {
          id: args.id,
        },
        include: {
          ingredients: {
            select: {
              id: true,
              name: true
            }
          }
        },
      }),
    ingredients: async (parent, args, { db }) => await db.ingredient.findMany(),
    ingredient: async (parent, args, { db }) =>
      await db.ingredient.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
  Mutation: {
    createRecipe: async (parent, args, { db }) => {
      const { ingredients, ...recipe } = args.data

      const [existing, newIngredients] = generateConnectAndCreateArrays(ingredients);
      return await db.recipe.create({
        data: {
          ...recipe,
          ingredients: {
            connect: existing,
            create: newIngredients
          }
        },
      })
    },
    createIngredient: async (parent, args, { db }) =>
      await db.ingredient.create({
        data: {
          ...args.data,
        },
      })
  },
};

export default resolvers;
