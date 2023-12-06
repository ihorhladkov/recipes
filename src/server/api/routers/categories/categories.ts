import { createTRPCRouter, publicProcedure } from "../../trpc";

export const categoriesRouter = createTRPCRouter({
  getCategory: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.categories.findMany()
    return data
  }),
});
