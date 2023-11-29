import { createTRPCRouter, publicProcedure } from "../../trpc";

export const recipesRouter = createTRPCRouter({
  getAllRecipes: publicProcedure.query(async ({ ctx }) => {
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
  getSortedRecipes: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.recipes.findMany({
      limit: 5,
      orderBy: (recipes, { asc }) => [asc(recipes.createdAt)],
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
