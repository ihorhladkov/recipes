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
          <CardTitle className="max-w-[320px] break-all">
            {recipe.name}
          </CardTitle>
          <CardDescription className="break-all">
            {recipe.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-4">
          <div>
            <p className="mb-6 text-sm font-medium uppercase leading-none">
              Ingredients
            </p>
            <div className="h-[60px] overflow-hidden overflow-y-scroll sm:h-[80px]">
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
