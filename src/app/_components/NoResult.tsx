
import React from "react";
import { Button } from "./ui/button";
import { useSearchStore } from "~/store/searchStore";

export default function NoResult() {
  const findNew = useSearchStore((state) => state.findNew);

  return (
    <h2 className="col-span-2 mx-auto mt-20 block w-full text-center text-2xl uppercase">
      No results were found for your request. Return to{" "}
      <Button
        className="text-blue-800 underline uppercase hover:text-red-400"
        onClick={() => findNew('')}
      >
        Clear search input
      </Button>
    </h2>
  );
}
