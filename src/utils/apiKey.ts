import { createHash, randomBytes } from "node:crypto";

// Keys are long random strings, so a fast SHA-256 is enough (unlike passwords) and lets us look them up by hash
export const hashApiKey = (key: string) =>
  createHash("sha256").update(key).digest("hex");

export const generateApiKey = () => {
  const key = `sk_${randomBytes(32).toString("base64url")}`;
  return { key, keyHash: hashApiKey(key), keyPrefix: key.slice(0, 8) };
};
