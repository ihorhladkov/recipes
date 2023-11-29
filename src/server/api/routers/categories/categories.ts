import { categories } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const categoriesRouter = createTRPCRouter({
  getCategory: publicProcedure.query(({ ctx }) => {
    const data = ctx.db.query.recipes.findMany()
    return data
  }),
});
