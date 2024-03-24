import Card from "@/components/fe/card";
import Footer from "@/components/fe/footer";
import Hero from "@/components/fe/hero";
import Nav from "@/components/fe/nav";
import { fetchUser } from "@/lib/fetchData";
import Image from "next/image";

export default async function Home() {


  return (
    <main className="">
      <Nav />
      <div className="hero min-h-96 relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage:
              'url("https://bali.com/wp-content/uploads/2022/12/happy-bali-wedding-1.jpg")',
          }}
        ></div>

        {/* Pink overlay with opacity */}
        <div className="absolute inset-0 bg-slate-900 opacity-50"></div>

        {/* Content */}
        <div className="hero-content relative z-10">
          <div className="max-w-full text-white">
            <h1 className="text-5xl font-bold border border-base-100 p-4 px-8 rounded-xl text-base-100">Wujudkan Pernikahan Impianmu</h1>
            <p className="py-6">
              Dapatkan penawaran terbaik dari vendor pernikahan terpercaya!
            </p>
            <button className="btn btn-primary btn-sm">Daftar Sekarang</button>
          </div>
        </div>
      </div>


      <Card />
      <Hero/>
      <Footer />
    </main>
  );
}
