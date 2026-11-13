import * as apiKeyRepository from "../repositories/apiKey.repository.ts";
import * as userService from "./user.service.ts";
import { generateApiKey, hashApiKey } from "../utils/apiKey.ts";
import { NotFoundError } from "../errors/app.error.ts";

export const getApiKeys = (userId: string) =>
  apiKeyRepository.findAllByUser(userId);

// Throws NotFoundError if the token's user no longer exists.
// The plain key is only returned here; afterwards only its hash is stored.
export const createApiKey = async (userId: string, name: string) => {
  await userService.getUser(userId);
  const { key, keyHash, keyPrefix } = generateApiKey();
  const apiKey = await apiKeyRepository.insert({
    userId,
    name,
    keyHash,
    keyPrefix,
  });
  return { apiKey, key };
};

export const deleteApiKey = async (id: string, userId: string) => {
  const apiKey = await apiKeyRepository.removeForUser(id, userId);
  if (!apiKey) throw new NotFoundError("API key not found");
  return apiKey;
};

// Returns the key's owner (without passwordHash), or null for an unknown key
export const verifyApiKey = async (key: string) => {
  const apiKey = await apiKeyRepository.findByHashWithUser(hashApiKey(key));
  return apiKey?.user ?? null;
};
