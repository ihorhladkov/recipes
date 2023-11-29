import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// import { Button } from "./ui/button";
import { RouterOutputs } from "~/trpc/shared";

export default function CardDemo({
  recipe,
}: {
  recipe: RouterOutputs["recipesRouter"]["getSortedRecipes"][number];
}) {
  return (
    <Card className={cn("w-[500px]")}>
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription>{recipe.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-4">
        <div>
          <p className="mb-6 text-sm font-medium uppercase leading-none">
            Ingredients
          </p>
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
                <p className="text-sm text-muted-foreground">
                  {/* {notification.description} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter> */}
    </Card>
  );
}
