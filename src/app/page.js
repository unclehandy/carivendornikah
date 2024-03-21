import { fetchUser } from "@/lib/fetchData";

export default async function Home() {
  const id = "0d30a91d-b879-4f24-931e-fffe147c8b7d";
  const data = await fetchUser(id);
  console.log(data);

  return (
    <main className="bg-neutral">
      <h1>Halo semua</h1>
    </main>
  );
}
