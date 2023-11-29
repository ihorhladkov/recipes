import { Skeleton } from "~/app/_components/ui/skeleton";
import React from "react";
import { Card } from "./ui/card";

export function CardSkeleton() {
  return (
    <Card>
      <div className="flex h-[250px] w-full gap-x-4 rounded-sm">
        <div className="grid gap-4 pl-4 pt-4">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[200px] " />
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
    </Card>
  );
}
