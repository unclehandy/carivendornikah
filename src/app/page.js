import { fetchUser } from "@/lib/fetchData";
import Image from "next/image";

export default async function Home() {
  const id = "0d30a91d-b879-4f24-931e-fffe147c8b7d";
  const data = await fetchUser(id);
  console.log(data);

  return (
    <main className="bg-neutral">
      <div className="hero min-h-96 bg-base-200">
        <div className="hero-content">
          <div className=" max-w-full">
            <h1 className="text-5xl font-bold">Wujudkan Pernikahan Impianmu</h1>
            <p className="py-6">
            Dapatkan penawaran terbaik dari vendor pernikahan terpercaya!
            </p>
            <button className="btn btn-primary btn-sm">Daftar Sekarang</button>
          </div>
        </div>
      </div>
    </main>
  );
}
