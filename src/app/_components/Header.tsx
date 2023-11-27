import { Modal } from "./Modal";

export default function Header() {
  return (
    <header className="mb-4 flex items-center justify-between">
      <h2 className="text-slate-50">Logo</h2>
      <Modal />
    </header>
  );
}
