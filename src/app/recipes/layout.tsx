import React from "react";
import { Input } from "../_components/ui/input";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Input className="mb-4 max-w-[350px]" type="text" placeholder="Search" />
      {children}
    </div>
  );
}
