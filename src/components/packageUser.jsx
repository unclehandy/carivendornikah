"use client";

import React from "react";

export const PackageUser = () => {
  const data = [
    {
      title: "Full Package Usher",
      desc: "by adikarapicture — Fotografi Lamaran",
      price: "11,500,000",
      img: "https://i.pinimg.com/564x/cc/c3/9b/ccc39b0148ffb95d7ba8b4f60f735464.jpg",
    },
    {
      title: "Full Package Usher",
      desc: "by adikarapicture — Fotografi Lamaran",
      price: "11,500,000",
      img: "https://i.pinimg.com/564x/cc/c3/9b/ccc39b0148ffb95d7ba8b4f60f735464.jpg",
    },
    {
      title: "Full Package Usher",
      desc: "by adikarapicture — Fotografi Lamaran",
      price: "11,500,000",
      img: "https://i.pinimg.com/564x/cc/c3/9b/ccc39b0148ffb95d7ba8b4f60f735464.jpg",
    },
    {
      title: "Full Package Usher",
      desc: "by adikarapicture — Fotografi Lamaran",
      price: "11,500,000",
      img: "https://i.pinimg.com/564x/cc/c3/9b/ccc39b0148ffb95d7ba8b4f60f735464.jpg",
    },
    {
      title: "Full Package Usher",
      desc: "by adikarapicture — Fotografi Lamaran",
      price: "11,500,000",
      img: "https://i.pinimg.com/564x/cc/c3/9b/ccc39b0148ffb95d7ba8b4f60f735464.jpg",
    },
    {
      title: "Full Package Usher",
      desc: "by adikarapicture — Fotografi Lamaran",
      price: "11,500,000",
      img: "https://i.pinimg.com/564x/cc/c3/9b/ccc39b0148ffb95d7ba8b4f60f735464.jpg",
    },
    {
      title: "Full Package Usher",
      desc: "by adikarapicture — Fotografi Lamaran",
      price: "11,500,000",
      img: "https://i.pinimg.com/564x/cc/c3/9b/ccc39b0148ffb95d7ba8b4f60f735464.jpg",
    },
    {
      title: "Full Package Usher",
      desc: "by adikarapicture — Fotografi Lamaran",
      price: "11,500,000",
      img: "https://i.pinimg.com/564x/cc/c3/9b/ccc39b0148ffb95d7ba8b4f60f735464.jpg",
    },
  ];
  return (
    <div class="grid grid-cols-4 gap-4">
      {data.map((element) => (
        <div className="card w-fit bg-base-100 shadow-xl mr-2">
          <figure>
            <img
              src={element.img}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{element.title}</h2>
            <h5>{element.desc}</h5>
            <p className="text-lg">{element.price }</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Book Now</button>
            </div>
          </div>
        </div>

      ))}
    </div>
  );
};
