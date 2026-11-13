import * as authorRepository from "../repositories/author.repository.ts";
import { NotFoundError } from "../errors/app.error.ts";
import type { AuthorUpdate, NewAuthor } from "../types/author.types.ts";

export const getAuthors = () => authorRepository.findAll();

export const getAuthor = async (id: string) => {
  const author = await authorRepository.findById(id);
  if (!author) throw new NotFoundError("Author not found");
  return author;
};

export const createAuthor = (data: NewAuthor) => authorRepository.insert(data);

export const updateAuthor = async (id: string, data: AuthorUpdate) => {
  const author = await authorRepository.update(id, data);
  if (!author) throw new NotFoundError("Author not found");
  return author;
};

export const deleteAuthor = async (id: string) => {
  const author = await authorRepository.remove(id);
  if (!author) throw new NotFoundError("Author not found");
  return author;
};
