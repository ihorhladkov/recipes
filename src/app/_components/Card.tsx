import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { RouterOutputs } from "~/trpc/shared";

export default function CardDemo({
  recipe,
}: {
  recipe: RouterOutputs["recipesRouter"]["getSortedRecipes"][number];
}) {
  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <Card className="flex h-[250px] w-full flex-col">
        <CardHeader>
          <CardTitle className="h-10 w-full max-w-[320px] overflow-y-scroll">{recipe.name}</CardTitle>
          <CardDescription>{recipe.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-4">
          <div>
            <p className="mb-6 text-sm font-medium uppercase leading-none">
              Ingredients
            </p>
            <div className="h-[80px] overflow-y-scroll">
              {recipe.recipesToIngredients.map((ingedient) => (
                <div
                  key={ingedient.id}
                  className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {`${ingedient.ingredient.name} `}
                    </p>
                    <p className="text-sm text-muted-foreground"></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
