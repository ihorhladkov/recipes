import Link from "next/link";
import React from "react";

export default function NoResult() {
  return (
      <h2 className="col-span-2 mx-auto mt-20 block w-full text-center text-2xl uppercase">
        No results were found for your request. Return to{" "}
        <Link className="text-blue-800 underline hover:text-red-400" href="/">
          home page
        </Link>
      </h2>
  );
}
