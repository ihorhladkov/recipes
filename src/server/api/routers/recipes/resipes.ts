import { createTRPCRouter, publicProcedure } from "../../trpc";

export const recipesRouter = createTRPCRouter({
  getSortedRecipes: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.recipes.findMany({
      with: {
        recipesToIngredients: {
          with: {
            ingredient: true,
          },
        },
      },
    });

    return data;
  }),
});
