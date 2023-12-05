import Link from "next/link";
import { Modal } from "./Modal";
import { Suspense } from "react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between pb-4">
      <h2 className="text-slate-50">Logo</h2>
      <li className="mr-2">
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/recipes"}>Recipes</Link>
      </li>
      <Suspense
        fallback={
          <Button variant="ghost" className="w-[111px] bg-white text-black">
            Loading...
          </Button>
        }
      >
        <Modal />
      </Suspense>
    </header>
  );
}
