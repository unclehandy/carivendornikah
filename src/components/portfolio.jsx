// components/ImageGrid.js
import Image from "next/image";
import { MoreHorizontal, PackageX } from "lucide-react";

export const ImageGrid = () => {
  const imageData = [
    { src: "/placeholder-1.webp" },
    { src: "/placeholder-2.webp" },
    // Add more image data here
  ];

  const profiles = [
    { name: "Maria", image: "/placeholder-avatar-1.jpeg" },
    { name: "John", image: "/placeholder-avatar-2.jpeg" },
  ];

  return (
    <div>
      <div className="flex flex-col p-4">
        <div className="bg-ivory rounded-lg p-8 pb-6 flex flex-row gap-24 shadow-lg">
          <div className="flex flex-col h-40 justify-between">
            <div>
            <h3 className={`text-title font-bold mb-2`}>
              The Wedding of Handy and Rosa
            </h3>
            <p className={`text-sm text-subtitle mb-4`}>
              17 November 2023 - Kota Semarang
            </p>
            <p className={`text-sm text-paragraph mb-4`}>
              Pernikahan Handy dan Rosa berkonsep minimalis dengan corak
              perpaduan budaya Jawa Timur dan Jawa Tengah yang kental.
            </p>
            </div>
            <button className="bg-accent text-sm text-black py-2 px-4 rounded-lg hover:bg-accent w-52">
              Lihat Selengkapnya
            </button>
          </div>
          <div className="relative h-40 w-64">
            <Image
              src="/placeholder-1.webp"
              alt="Placeholder Image"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
