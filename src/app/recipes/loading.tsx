import React from "react";
import { CardSkeleton } from "../_components/CardSkeleton";

export default function loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map(() => (
        <CardSkeleton />
      ))}
    </div>
  );
}
