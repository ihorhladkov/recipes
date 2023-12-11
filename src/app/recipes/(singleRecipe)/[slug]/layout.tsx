import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className="my-12 animate-pulse text-center text-4xl uppercase text-purple-100">
        Recipe Information
      </h1>
      {children}
    </div>
  );
}
