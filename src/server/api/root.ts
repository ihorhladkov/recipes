import { createTRPCRouter } from "~/server/api/trpc";
// import { publicProcedure } from "./trpc";
import { categoriesRouter } from "../api/routers/categories/categories";
import { recipesRouter } from "../api/routers/recipes/resipes";
import { ingredientsRouter } from "../api/routers/ingredients/ingrediets";
import { inferRouterOutputs } from "@trpc/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  categoriesRouter,
  recipesRouter,
  ingredientsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
