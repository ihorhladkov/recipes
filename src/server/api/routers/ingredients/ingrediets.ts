import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { ingredients } from "~/server/db/schema";

export const ingredientsRouter = createTRPCRouter({
  getAllIngredients: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.ingredients.findMany({
      orderBy: (ingredients, { desc }) => [desc(ingredients.createdAt)],
    });
    return data;
  }),
  addNewIngredient: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const ingredient = await ctx.db.insert(ingredients).values(input);

      return ingredient;
    }),
});
