import React from "react";
import { CardSkeleton } from "../../_components/CardSkeleton";

export default function loading() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
