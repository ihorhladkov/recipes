import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

export default function RelatedCard({
  recipe,
}: {
  recipe: {
    name: string;
    shortDescription: string;
    slug: string;
    author: string;
  };
}) {
  return (
    <Link className="w-full" href={`/recipes/${recipe.slug}`}>
      <Card className="flex h-[250px] w-full flex-col">
        <CardHeader>
          <div>
            <CardTitle className="h-10 w-full max-w-[320px] overflow-y-scroll">
              {recipe.name}
            </CardTitle>
            <CardDescription>{recipe.shortDescription}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-4">
          <div>
            <p className="mb-6 text-sm font-medium uppercase leading-none">
              Author name
            </p>
            <p>{recipe.author}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
