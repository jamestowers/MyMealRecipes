import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum IngredientCategory {
    VEG,
    FRUIT,
    MEAT,
    DAIRY,
    EGG,
    CHEESE,
    CEREAL,
    SUGAR,
    HERB,
    SPICE,
    CONDIMENT,
    OIL,
    FAT
  }

  enum IngredientSubCategory {
    VEG_SALAD,
    VEG_ROOT,
    MEAT_BEEF,
    MEAT_LAMB,
    MEAT_PORK,
    MEAT_POULTRY,
    MEAT_FISH,
    NUT,
    PASTA,
    RICE
  }

  type Recipe {
    id: ID!
    title: String!
    description: String
    isChildFriendly: Boolean
    isVeggie: Boolean
    cookingTime: Int
    difficulty: Int
    ingredients: [Ingredient]
  }

  type Ingredient {
    id:       ID!
    name:     String!
    category: IngredientCategory!
    type:     IngredientSubCategory

    recipes: [Recipe]
  }

  type Query {
    recipes: [Recipe]
    recipe(id: ID!): Recipe
    ingredients: [Ingredient]
    ingredient(id: ID!): Ingredient
  }

  type Mutation {
    createRecipe(data: RecipeCreateInput!): Recipe!
    createIngredient(data: IngredientCreateInput!): Ingredient!
  }

  input RecipeCreateInput {
    title: String!
    description: String
    isChildFriendly: Boolean
    isVeggie: Boolean
    cookingTime: Int
    difficulty: Int
    ingredients: [ID!]
  }

  input IngredientCreateInput {
    name: String!
    category: IngredientCategory!
    type: IngredientSubCategory
  }
`;

export default typeDefs;
