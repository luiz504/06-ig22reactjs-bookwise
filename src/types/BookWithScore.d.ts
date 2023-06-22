import { Book } from "@prisma/client";

export interface BookWithScore extends Book {
  score: number
}