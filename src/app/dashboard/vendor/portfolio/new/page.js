"use client";

import { PortfolioForm } from "@/components/form/portfolioForm";
// import Image from "next/image";
// import { useState } from "react";

export default function Page() {
  return (
    // ini harusnya sidebar
    <main className="space-y-8 ">
      <section className="flex justify-between items-center">
        <div>
          <h1>Buat Portfolio</h1>
          <p>Lengkapi formulir berikut untuk membuat portfoliomu</p>
        </div>
      </section>
      <PortfolioForm />
    </main>
  );
}
