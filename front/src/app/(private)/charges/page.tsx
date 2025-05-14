import { ChargesList } from "./components/charges-list";
import { CreateChargeDialog } from "./components/create-charge-dialog";

export default function ChargesPage() {
    return (
        <main className="w-full h-full flex flex-col items-center px-56 py-16">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-3xl font-semibold">Cobranças</h1>
                <CreateChargeDialog />
            </div>
            <section className="mt-8 w-full">
                <ChargesList />
            </section>
        </main>
    )
}