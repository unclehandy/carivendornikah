import { Portfolio } from "@/components/portfolio";
import { Plus } from "lucide-react";
import Link from "next/link";
import { checkEnvironment } from "@/config/apiUrl";

async function getPortfolio() {
  const res = await fetch(`${checkEnvironment()}/api/portfolio`, {
    cache: "no-cache",
  });
  const { vendorPortfolio } = await res.json();
  return vendorPortfolio;
}

export default async function Home() {
  const portfolios = await getPortfolio();

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
      <Portfolio listPortfolio={portfolios}/>
    </main>
  );
}
