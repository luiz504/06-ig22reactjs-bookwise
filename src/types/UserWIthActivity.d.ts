import { Account, User } from "@prisma/client";

export interface UserWithActivity extends User {
  total_pages_read: number;
  total_rated_books: number;
  total_authors_read: number;
  most_read_category: string | null;
}
