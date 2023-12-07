"use client";

import React from "react";
import { useSearchStore } from "~/store/searchStore";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({ totalPage }: { totalPage: number }) {
  const { page, prevPage, nextPage, handleSetPage } = useSearchStore(
    (state) => state,
  );

  const numbersPage = (total: number) => {
    const numberArray = [];
    for (let i = 1; i <= total; i++) {
      numberArray.push(i);
    }

    return numberArray;
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={prevPage} disabled={page === 1}>
        <ArrowLeft />
      </Button>
      {numbersPage(totalPage).map((currentPage) => (
        <Button
          key={currentPage}
          onClick={() => handleSetPage(currentPage)}
          disabled={page === currentPage}
        >
          {currentPage}
        </Button>
      ))}
      <Button onClick={nextPage} disabled={page === totalPage}>
        <ArrowRight />
      </Button>
    </div>
  );
}
