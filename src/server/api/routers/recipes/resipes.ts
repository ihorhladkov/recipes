import { ilike, or } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { recipes } from "~/server/db/schema";
import { z } from "zod";

export const recipesRouter = createTRPCRouter({
  getAllRecipes: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = ctx.db.query.recipes.findMany({
        with: {
          recipesToIngredients: {
            with: {
              ingredient: true,
            },
          },
        },
        where: or(
          ilike(recipes.name, `%${input.search}%`),
          ilike(recipes.shortDescription, `%${input.search}%`),
        ),
      });

      return data
    }),

  getSortedRecipes: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.recipes.findMany({
      limit: 5,
      orderBy: (recipes, { desc }) => [desc(recipes.createdAt)],
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
  createNewRecipe: publicProcedure
    .input(
      z.object({
        name: z.string(),
        shortDescription: z.string(),
        description: z.string(),
        author: z.string(),
        ingredients: z.array(z.string()),
        categoryId: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { ingredients, ...rest } = input;
      const [newRecipe] = await ctx.db.insert(recipes).values(rest).returning();

      if (!newRecipe) {
        return;
      }

      Promise.all(
        ingredients.map((ingredient) =>
          ctx.db.insert(recipesToIngredients).values({
            ingredientId: ingredient,
            recipeId: newRecipe?.id,
          }),
        ),
      );
    }),
});
