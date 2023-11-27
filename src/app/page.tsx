"use client";

import Card from "./_components/Card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "./_components/ui/form";
// import { Input } from "./_components/ui/input";

// import { useCountStore } from "~/store/store";

export default function Home() {
  // const counter = useCountStore((state) => state.counter);
  // const increase = useCountStore((state) => state.increase);
  // const form = useForm();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      {/* <Button variant="ghost">Button</Button> */}
      {/* <h1>Books: {counter} </h1> */}
      <div className="grid grid-cols-4 gap-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      {/* <Button onClick={increase}>Add amount</Button> */}
    </main>
  );
}
