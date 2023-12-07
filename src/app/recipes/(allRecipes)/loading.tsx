'use client'

import React from "react";
import { CardSkeleton } from "../../_components/CardSkeleton";
import { useSearchStore } from "~/store/searchStore";

export default function loading() {
  const { elements } = useSearchStore((state) => state);
  const skeletonCount =
    elements === 2
      ? [1, 2]
      : elements === 4
        ? [1, 2, 3, 4]
        : [1, 2, 3, 4, 5, 6];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {skeletonCount.map((index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
