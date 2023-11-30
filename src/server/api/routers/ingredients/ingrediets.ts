import { createTRPCRouter, publicProcedure } from "../../trpc";

export const ingredientsRouter = createTRPCRouter({
  getAllIngredients: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.ingredients.findMany();
    return data;
  }),
});
