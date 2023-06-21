import { Rating, User } from "@prisma/client";

export type AvaliationWithUser = Rating &  {user: User}
