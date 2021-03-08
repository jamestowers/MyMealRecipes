import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import moment from "moment";

import db from "../db";
import { getUserFromCode } from "./google-auth";

export const authenticateUser = async (code: string) => {
  const { googleUser } = await getUserFromCode(code);
  console.log(googleUser);

  let user;
  user = await db.user.findFirst({
    where: {
      email: googleUser.email,
    },
  });
  if (!user) {
    user = await db.user.create({
      data: {
        email: googleUser.email,
      },
    });
  }
  console.log(user);

  const authToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  const tokenExpiry = moment().add(1, "month");
  const token = await db.token.create({
    data: {
      token: authToken,
      expiresAt: tokenExpiry.toDate(),
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return {
    token: token.token,
    user,
  };
};

export const authorizeUser = async (jwt: string) => {
  // const token = jwt.verify(token, process.env.SECRET_KEY);
  if (!jwt) return null;
  const token = await db.token.findFirst({
    include: {
      user: true,
    },
    where: {
      token: jwt,
    },
  });

  if (!token) {
    throw new AuthenticationError(
      "Your token has expired, please log in again"
    );
  }
  return token.user;
};
