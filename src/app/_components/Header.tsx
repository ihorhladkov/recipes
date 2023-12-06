import Link from "next/link";
import { Modal } from "./Modal";
import { Suspense } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-slate-50">Logo</h2>
        <Button variant="ghost">
          <Link href={"/"}>Home</Link>
        </Button>
        <Button variant="ghost">
          <Link href={"/recipes"}>Recipes</Link>
        </Button>
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
