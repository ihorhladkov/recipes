import { Modal } from "./Modal";

export default function Header() {
  return (
    <header className="flex items-center justify-between pb-4">
      <h2 className="text-slate-50">Logo</h2>
      <Modal />
    </header>
  );
}
