"use client";

import { PortfolioForm } from "@/components/form/portfolioForm";
// import Image from "next/image";
// import { useState } from "react";

export default function Page() {
  return (
    // ini harusnya sidebar
    <main className="bg-white">
      <section className="flex justify-between items-center">
        <div className="bg-white">
        <h2 className="text-2xl font-bold mb-2 mt-4">Buat Portfolio</h2>
          <p className="mb-4">Lengkapi formulir berikut untuk membuat portfoliomu</p>
        </div>
      </section>
      <PortfolioForm />
    </main>
  );
}
