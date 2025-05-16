import { ChargesList } from "./components/charges-list";
import { CreateChargeDialog } from "./components/create-charge-dialog";

export default function ChargesPage() {
  return (
    <main className="w-full min-h-screen px-4 py-8 sm:px-8 md:px-12 lg:px-24 xl:px-32 2xl:px-56">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Cobranças</h1>
          <CreateChargeDialog />
        </div>

        <section className="w-full">
          <ChargesList />
        </section>
      </div>
    </main>
  );
}
