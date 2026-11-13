import * as userRepository from "../repositories/user.repository.ts";
import { hashPassword } from "../utils/password.ts";
import { ConflictError, NotFoundError } from "../errors/app.error.ts";
import type { CreateUserInput, UpdateUserInput } from "../types/user.types.ts";

export const getUsers = () => userRepository.findAll();

export const getUser = async (id: string) => {
  const user = await userRepository.findById(id);
  if (!user) throw new NotFoundError("User not found");
  return user;
};

export const getUserByEmailWithPassword = (email: string) =>
  userRepository.findByEmailWithPassword(email);

// A simultaneous duplicate signup slips past this check but still gets a 409 from errorHandler
export const createUser = async ({ email, password }: CreateUserInput) => {
  if (await userRepository.findByEmailWithPassword(email)) {
    throw new ConflictError("Email already in use");
  }
  return userRepository.insert({
    email,
    passwordHash: await hashPassword(password),
  });
};

// Changing to an email another user has is a 409 via errorHandler (unique constraint)
export const updateUser = async (
  id: string,
  { email, password }: UpdateUserInput,
) => {
  const user = await userRepository.update(id, {
    email,
    passwordHash: password ? await hashPassword(password) : undefined,
  });
  if (!user) throw new NotFoundError("User not found");
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await userRepository.remove(id);
  if (!user) throw new NotFoundError("User not found");
  return user;
};
