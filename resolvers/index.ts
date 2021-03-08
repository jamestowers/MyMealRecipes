import { authenticateUser, authorizeUser } from "../controllers/auth";

import { IApolloExpressContext } from "../";

type ResolverFn = (parent: any, args: any, ctx: IApolloExpressContext) => any;
interface ResolverMap {
  [field: string]: ResolverFn;
}

interface IResolvers {
  Query: ResolverMap;
  Mutation: ResolverMap;
  User: ResolverMap;
}

export const resolvers: IResolvers = {
  Query: {
    authorizeUser: async (root, args, { req }) =>
      await authorizeUser(req.cookies.token),
    signOut: (root, args, { res }) =>
      // TODO: Expire token
      res.clearCookie("token"),
    userByEmail: async (parent, args, { db }) =>
      await db.user.findFirst({
        where: {
          email: args.email,
        },
      }),
    getOrCreateUser: async (parent, args, { db }) => {
      const existingUser = await db.user.findFirst({
        where: {
          email: args.data.email,
        },
      });
      if (existingUser) return existingUser;
      return await db.user.create({
        data: args.data,
      });
    },
    users: async (parent, args, { db }) => await db.user.findMany(),
    user: async (parent, args, { db }) =>
      await db.user.findFirst({
        where: {
          id: args.id,
        },
      }),
  },
  Mutation: {
    authenticateUser: async (parent, args, { db, res }) => {
      const { token, user } = await authenticateUser(args.code);

      res.cookie("token", token, { httpOnly: true });
      return user;
    },
    createUser: async (parent, args, { db }) =>
      await db.user.create({
        data: {
          ...args.data,
        },
      })
  },
  /* User: {
    profile: async (parent, args, { db }) =>
      await db.profile.findFirst({
        where: { userId: parent.id },
      }),
  }, */
};

export default resolvers;
