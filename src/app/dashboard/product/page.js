"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Produk() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);




  const [newProduk, setNewProduk] = useState({
    "nama": "Potograper Weding",
    "harga": 1000000,
     "kategori_id": "eLW5iUh1s443adagmnOZq",
    "user_id": "57734da9-16d1-4a86-a1a6-710358e77659",
    "gambar": "https://images.squarespace-cdn.com/content/v1/5a1dda174c326df2710b8e91/1546389022382-R018EAQGVHKD77NNTCOU/bay-area-wedding-photography.jpg",
    "deskripsi": "Mari abadikan momen berharga pernikahan Anda dengan sempurna bersama kami! Sebagai fotografer pernikahan berpengalaman, kami menghadirkan layanan fotografi yang berfokus pada kualitas, kreativitas, dan kehangatan emosi.Dengan pengalaman bertahun-tahun di industri ini, kami memahami betapa pentingnya setiap momen dalam pernikahan Anda. Dari senyuman kecil hingga momen emosional yang tak terlupakan, kami berkomitmen untuk menangkap setiap detail dengan indah dan autentik."
  });

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        url: "http://localhost:3000/api/produk",
      };
      const { data } = await axios.request(options);
      setProduk(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchData();
  
    
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/api/produk/${id}`
          );
          if (response.status === 200) {
            fetchData();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-4 text-blue-950 font-normal">Produk Produk</h1>
      <div className="card border bg-base-100 shadow-xl">
        <div className="card-body">
          <button
            className="btn btn-primary mb-4 w-fit"
            onClick={() => setModalOpen(true)}
          >
            Tambah Produk
          </button>

          {!loading ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Tampilkan data Produk jika Produk bukan null */}
                  {produk.data &&
                    produk.data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-4"
                            onClick={() => handleDelete(item.id)}
                          >
                            Hapus
                          </button>
                          <Link

                          href={`product/${item.id}`}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Tampilkan pesan loading selama data masih dimuat
            <p>Loading...</p>
          )}
        </div>
      </div>

      
    </div>
  );
}
