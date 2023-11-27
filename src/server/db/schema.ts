import { relations } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  recipes: many(recipes),
}));

export const recipes = pgTable("recipes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  description: text('description'),
  shortDescription:  text('short_description'),
  author: text("author"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  categoryId: uuid("categoryId").references(() => categories.id),
});

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  category: one(categories, {
    fields: [recipes.categoryId],
    references: [categories.id],
  }),
  ingredients: many(ingredients),
}));

export const ingredients = pgTable("ingredients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  recipe: many(recipes),
}));

export const recipesToIngredients = pgTable("recipes_to_ingredients", {
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id),
  ingredientId: uuid("ingredient_id")
    .notNull()
    .references(() => ingredients.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const recipesToIngredientsRelations = relations(
  recipesToIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipesToIngredients.recipeId],
      references: [recipes.id],
    }),
    ingredient: one(ingredients, {
      fields: [recipesToIngredients.ingredientId],
      references: [ingredients.id],
    }),
  }),
);
