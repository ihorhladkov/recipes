import Link from "next/link";
import { Modal } from "./Modal";
import { Suspense } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export default function Header() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row items-center justify-between pb-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <h2 className="text-slate-50">Logo</h2>
        <Link className={cn(buttonVariants({ variant: "ghost" }))} href={"/"}>
          Home
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "ghost" }))}
          href={"/recipes"}
        >
          Recipes
        </Link>
      </div>
      <Suspense
        fallback={
          <Button variant="ghost" className="w-[111px] bg-white text-black">
            <Loader2 className="animate-spin" />
          </Button>
        }
      >
        <Modal />
      </Suspense>
    </header>
  );
}
