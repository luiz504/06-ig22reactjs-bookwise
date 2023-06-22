import { Book, CategoriesOnBooks } from "@prisma/client";

export type BooksWithCategoriesName = Book & {categories: string[]}