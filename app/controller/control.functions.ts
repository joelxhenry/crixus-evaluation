import { User } from "@prisma/client";
import { exist, signIn, register } from "../auth/auth.function";
import * as createError from "http-errors";

export interface RequestHandleInterface {
  status: number;
  data: ResponseInterface;
}

export interface ResponseInterface {
  user?: User | null;
  error?: string[] | null;
  message?: string | null;
}

export const checkUser = async (username: string) => {
  try {
    const isUser = await exist(username);
    return {
      status: 200,
      data: {
        message: isUser
          ? `We have existing records for ${username}`
          : `There aren't any existing users with username ${username}`,
      },
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const signInOrRegister = async (username: string, password: string) => {
  try {
    let user: User | null;
    const isUser = await exist(username);

    if (isUser) {
      user = await signIn(username, password);
    } else {
      user = await register(username, password);
    }

    return {
      status: 200,
      data: {
        message: isUser ? "User Found" : "User Created",
        user,
      },
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const errorHandler = (error: any) => {
  if (createError.isHttpError(error)) {
    return {
      status: error.statusCode,
      data: { error: [error.message] },
    };
  }

  const err = createError[500]("Something went wrong");

  return {
    status: err.statusCode,
    data: {
      error: [err.message],
    },
  };
};
