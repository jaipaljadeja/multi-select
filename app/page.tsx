import Link from "next/link";
import { SelectDemo } from "../components/select-demo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 md:p-24 p-6 bg-gray-100 font-mono font-bold text-primary">
      <div className="lg:w-[28rem] w-80">
        <h1 className="text-xl">MultiSelect</h1>
        <div className="text-xs text-gray-400">
          <p>
            Implemented by{" "}
            <Link href={"https://jaipaljadeja.com"} target="_blank" className="underline">
              Jaipal Jadeja
            </Link>
          </p>
          <p>Using Next.js 14 (App Router) and TailwindCSS</p>
          <p>
            For <i>Zepto Assignment</i> (Frontend SDE 1)
          </p>
        </div>
      </div>
      <SelectDemo />
      <p className="mt-auto text-xs text-gray-400">
        <Link href={"mailto:jadejajaipal5@gmail.com"}>jadejajaipal5@gmail.com </Link>|{" "}
        <Link
          href={"https://github.com/jaipaljadeja/multi-select"}
          target="_blank"
          className="underline"
        >
          Source Code
        </Link>
      </p>
    </main>
  );
}
