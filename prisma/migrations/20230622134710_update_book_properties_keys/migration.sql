/*
  Warnings:

  - You are about to drop the column `ratings_avarage` on the `books` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "total_pages" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ratings_count" INTEGER NOT NULL DEFAULT 0,
    "ratings_average" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_books" ("author", "cover_url", "created_at", "id", "name", "ratings_count", "summary", "total_pages") SELECT "author", "cover_url", "created_at", "id", "name", "ratings_count", "summary", "total_pages" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
