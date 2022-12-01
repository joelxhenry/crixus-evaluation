import { db } from "../config";
import createError from "http-errors";
import * as bcrypt from "bcryptjs";

const validator = (username: string, password: string) => {
  if (username.trim() === "")
    return createError[500]("Please enter your username");
  if (password.trim() === "")
    return createError[500]("Please enter your password");
  if (password.trim().length < 8)
    return createError[500](
      "Your password is too short (must be atleast 8 characters)"
    );
  if (password.trim().length > 16)
    return createError[500](
      "Your password is too long (do not exceed 16 characters)"
    );
  if (!password.trim().match(/^(?=.*[a-z])(?=.*[A-Z])$/))
    return createError[500](
      "Your password must have atleast 1 uppercase and 1 lowercase character"
    );
};

export const register = async (username: string, password: string) => {
  const error = validator(username, password);
  if (error) throw error;

  const data = await db.user
    .create({
      data: {
        username: username.trim(),
        password: bcrypt.hashSync(password.trim(), 8),
      },
    })
    .catch((err) => {
      throw createError[500](
        "Your username is too long (do not exceed 25 characters)"
      );
    });

  const { password: _, ...user } = data;
  return user;
};

export const signIn = async (username: string, password: string) => {
  const error = validator(username, password);
  if (error) throw error;

  const data = await db.user.findUnique({
    where: { username },
  });

  if (!data) throw createError.NotFound("User not registered");

  const checkPassword = bcrypt.compareSync(password, data.password);
  if (!checkPassword) throw createError.Unauthorized("Invalid password");

  const { password: _, ...user } = data;
  return user;
};

export const exist = async (username: string) => {
  if (username === "") throw createError[500]("Please enter your username");
  const user = await db.user.findUnique({
    where: { username },
  });

  return user ? true : false;
};
