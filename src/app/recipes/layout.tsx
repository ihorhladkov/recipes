"use client";

import React from "react";
import { Input } from "../_components/ui/input";
import { useSearchStore } from "~/store/serchStore";
import debounce from 'debounce';

export default function layout({ children }: { children: React.ReactNode }) {
  const findNew = useSearchStore((state) => state.findNew);

  const handeQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    findNew(event.target.value)
  }
  return (
    <div>
      <Input
        className="mb-4 max-w-[350px]"
        type="text"
        placeholder="Search"
        onChange={debounce(handeQueryChange, 500)}
      />
      {children}
    </div>
  );
}
