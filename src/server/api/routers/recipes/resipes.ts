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
