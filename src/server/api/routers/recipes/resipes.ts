import { and, eq, ilike, inArray, ne, or, sql } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { recipes, recipesToIngredients } from "~/server/db/schema";
import { z } from "zod";
import { SortSchema } from "~/store/searchStore";
import { TRPCError } from "@trpc/server";

export const recipesRouter = createTRPCRouter({
  getAllRecipes: publicProcedure
    .input(
      z.object({
        search: z.string(),
        sortBy: SortSchema,
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

      const data = await ctx.db.query.recipes.findMany({
        limit: input.elements,
        offset: (input.page - 1) * input.elements,
        orderBy: (recipes, { desc }) => [desc(recipes[input.sortBy])],
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
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "An unexpected error occurred, please try again later.",
        });
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

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "An unexpected error occurred, please try again later.",
        });
      }

      const dataId = data.id;

      const ingredinetIds = data?.recipesToIngredients.map(
        (ingredinet) => ingredinet.ingredient.id,
      );

      if (!ingredinetIds) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An unexpected error occurred, please try again later.",
        });
      }

      const query = await ctx.db
        .select({
          id: recipes.id,
          name: recipes.name,
          shortDescription: recipes.shortDescription,
          slug: recipes.slug,
          author: recipes.author,
        })
        .from(recipes)
        .leftJoin(
          recipesToIngredients,
          eq(recipesToIngredients.recipeId, recipes.id),
        )
        .where(
          and(
            ne(recipes.id, dataId),
            inArray(recipesToIngredients.ingredientId, [...ingredinetIds]),
          ),
        )
        .groupBy(recipes.id)
        .limit(3);

      return { data, query };
    }),
});
