"use client";

import Image from "next/image";
import { ArrowRight, Edit, Trash2 } from "lucide-react";
import { useAtom } from "jotai";
import { portfolioAtom } from "@/components/Atom/portfolioAtom";
import { formatDate } from "@/lib/dateFunction";
import { imageUrl } from "@/config/apiUrl";

export const PortfolioCard = () => {
  const [portfolioData, setPortfolioData] = useAtom(portfolioAtom);
  console.log(portfolioData);

  return (
    <>
      {portfolioData.map(({ id, judul, lokasi, tanggal, deskripsi, gambar }) => {
        let image = `${imageUrl}portfolio/${id}/${gambar}`;
        return (
          <div key={id} className="portfolio-card bg-ivory">
            <div className="flex flex-col h-40 w-[720px] justify-between">
              <div className="max-w-[48rem]">
                <div className="flex flex-col gap-4">
                  <div className="join">
                    <button className="btn rounded-md btn-xs join-item border border-gray-300 text-gray-600">
                      <Edit size={14} />
                      Edit
                    </button>
                    <button className="btn rounded-md btn-xs join-item border border-gray-300">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                  <h3 className={`text-title font-bold`}>{judul}</h3>
                </div>
                <p className={`text-sm text-subtitle mb-4`}>
                  {formatDate(tanggal)} - {lokasi}
                </p>
                <p className={`text-sm text-paragraph mb-4 line-clamp-2`}>
                  {deskripsi}
                </p>
              </div>
              <div className="flex flex-row gap-8 max-h-8 pb-4 items-center">
                <div className="flex flex-row items-center gap-4">
                  <img
                    className="rounded-full mx-auto mt-4 object-contain shadow-md"
                    src="https://www.bridestory.com/_nuxt/img/bs_logo_dark-HJ6X7hQcPce7eceff4fdd3988b58ef900028ffc0a.webp"
                    alt="Profile"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-700">Bride Story</p>
                    <p className="text-[10px] text-gray-500">@bridestory</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center p-2 rounded-sm">
                  <span className="text-sm">Selengkapnya</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
            <div className="relative h-52 w-72">
              <Image
                src={image}
                alt="Placeholder Image"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
