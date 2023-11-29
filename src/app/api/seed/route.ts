// import { NextApiResponse } from "next";
// import { db } from "~/server/db";
// import { categories, ingredients, recipes } from "~/server/db/schema";

// async function seed(res: NextApiResponse) {
//   const categoriesData: (typeof categories.$inferInsert)[] = [
//     { name: "categories 1", id: "d7a0a4f7-2b6b-4eab-b38e-7f24c4b9fc78" },
//     { name: "categories 2", id: "b163bae5-9c62-4875-8f19-23f004a98d81" },
//     { name: "categories 3", id: "e4fc3a97-7f2b-4d72-9259-9c9232a6db0b" },
//     { name: "categories 4", id: "cf2c1de1-8e44-4bf7-9d05-6f90a2b06d1b" },
//   ];
  

//   const recipesData: (typeof recipes.$inferInsert)[] = [
//     {
//       name: "Chocolate Chip Cookies",
//       description:
//         "Classic chocolate chip cookies that are soft on the inside and crispy on the outside.",
//       shortDescription: "Irresistible chocolate chip cookies.",
//       author: "Baker Extraordinaire",
//       categoryId: "d7a0a4f7-2b6b-4eab-b38e-7f24c4b9fc78",
//     },
//     {
//       name: "Fluffy Pancakes",
//       description:
//         "Light and fluffy pancakes that melt in your mouth, perfect for a cozy breakfast.",
//       shortDescription: "Deliciously fluffy pancakes.",
//       author: "Breakfast Lover",
//       categoryId: "b163bae5-9c62-4875-8f19-23f004a98d81",
//     },
//     {
//       name: "Homemade Bread",
//       description:
//         "A simple recipe for making your own fresh and crusty homemade bread.",
//       shortDescription: "Warm and crusty homemade bread.",
//       author: "Bread Enthusiast",
//       categoryId: "e4fc3a97-7f2b-4d72-9259-9c9232a6db0b",
//     },
//     {
//       name: "Vanilla Cupcakes",
//       description:
//         "Classic vanilla cupcakes with a smooth and creamy frosting, perfect for celebrations.",
//       shortDescription: "Delightful vanilla cupcakes.",
//       author: "Cupcake Artist",
//       categoryId: "cf2c1de1-8e44-4bf7-9d05-6f90a2b06d1b",
//     },
//     {
//       name: "Garlic Butter Shrimp Pasta",
//       description:
//         "A flavorful pasta dish with succulent shrimp tossed in garlic-infused butter sauce.",
//       shortDescription: "Garlicky butter shrimp pasta.",
//       author: "Chef de Cuisine",
//       categoryId: "cf2c1de1-8e44-4bf7-9d05-6f90a2b06d1b",
//     },
//   ];

//   const ingredientsData: (typeof ingredients.$inferInsert)[] = [
//     { name: "Sugar", id: "c0a38f1e-45bb-4f5a-92d5-8ef5347e1273" },
//     { name: "Eggs", id: "83fd8e1d-3d87-4a9f-9b8a-2c8a816a48c7" },
//     { name: "Butter", id: "9a7f2c6e-81d6-45a5-b6cf-27e557f6b9e6" },
//     { name: "Milk", id: "e1a39861-0b4f-4c85-910b-6efeb2a8e1f1" },
//     { name: "Baking Powder", id: "c3a5d5a7-8368-4d8d-95ee-8cfd1e0b23e4" },
//     { name: "Salt", id: "ac96aa33-6242-42c1-9a3a-49e8f41e7355" },
//     { name: "Vanilla Extract", id: "b4d3a303-9f62-4d72-88e9-d5d42ff8c872" },
//     { name: "Chocolate Chips", id: "67b2fd4b-9465-4984-8a65-4dca05050645" },
//     { name: "Yeast", id: "ff8ef2e9-4285-4c8c-9b25-9a235d6d045e" },
//     { name: "Olive Oil", id: "a5842a0b-3b47-4ed9-b4ab-5475f62e0499" },
//   ];

//   // await db.insert(categories).values(categoriesData);
//   // await db.insert(recipes).values(recipesData);
//   // await db.insert(ingredients).values(ingredientsData);
//   return new Response("ok");
// }

// // export { seed as GET };
