import { Portfolio } from "@/components/portfolio";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">
      <div className="flex flex-row items-center gap-4">
        <h2 className="text-2xl font-bold mb-4 mt-4">Portfolio</h2>
        <Link href="portfolio/new">
          <button className="btn flex flex-row h-8 min-h-8 border border-gray-300 rounded-lg">
            <span className="inline text-xs text-gray-600">
              Tambah Portfolio
            </span>
            <Plus size={15} className="inline text-gray-600" />
          </button>
        </Link>
      </div>
      <Portfolio />
    </main>
  );
}
