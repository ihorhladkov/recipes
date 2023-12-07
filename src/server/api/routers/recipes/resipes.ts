import { eq, ilike, or, sql } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { recipes, recipesToIngredients } from "~/server/db/schema";
import { z } from "zod";

export const recipesRouter = createTRPCRouter({
  getAllRecipes: publicProcedure
    .input(
      z.object({
        search: z.string(),
        sortBy: z.string().optional(),
        elements: z.number(),
        page: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const countResult = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(recipes)
        .where(
          or(
            ilike(recipes.name, `%${input.search}%`),
            ilike(recipes.shortDescription, `%${input.search}%`),
          ),
        );

      const count = countResult[0]?.count || 0;

      const dat = input.sortBy ?? 'author'

      const data = await ctx.db.query.recipes.findMany({
        limit: input.elements,
        offset: (input.page - 1) * input.elements,
        orderBy: (recipes, { desc }) => [
          desc(recipes[dat]),
        ],
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

      const totalPage = Math.ceil(count / input.elements);

      return {
        data,
        count,
        totalPage,
      };
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

  getOneRecipe: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.query.recipes.findFirst({
        where: eq(recipes.slug, input.slug),

        with: {
          recipesToIngredients: {
            with: {
              ingredient: true,
            },
          },
          category: true,
        },
      });

      return data;
    }),
});
