"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditProduk({params}) {
  const router = useRouter();
  const [kategoriOptions, setKategoriOptions] = useState([]);



  const [produk, setProduk] = useState(null);


  const id=params.id;


  console.log(id)


  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/produk/${id}`);
      console.log(response.data); // Log the response data
      setProduk(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchKategoris = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/kategori");
      console.log(response.data); // Log the response data
      setKategoriOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKategoris();
    fetchProduct();
  }, []);

  async function savedata(event) {
    event.preventDefault();
    const nama = event.target.nama.value;
    const harga = event.target.harga.value;
    const gambar = event.target.gambar.value;
    const deskripsi = event.target.deskripsi.value;
    const kategori_id = event.target.kategori_id.value;
    const user_id = JSON.parse(localStorage.getItem('user'));
    console.log(user_id.id)

    const data = {
        nama: nama,
        harga: harga,
        gambar: gambar,
        deskripsi: deskripsi,
        kategori_id: kategori_id,
        user_id: user_id.id // Ambil hanya ID pengguna dari objek user_id
      };

    const options = {
      method: "PATCH",
      url: `http://localhost:3000/api/produk/${id}`,
      headers: { "Content-Type": "application/json" },
      data: {
        nama: nama,
        harga: harga,
        gambar: gambar,
        deskripsi: deskripsi,
        kategori_id: kategori_id,
        user_id: user_id.id
      },
    };

    try {
      const { data } = await axios.request(options);

      Swal.fire({
        title: "Success",
        text: `That thing is still around? `,
        icon: "success",
      }).then(() => {
        router.replace("/dashboard/product");
        // router.refresh()
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card w-full border bg-base-100 shadow-xl">
      <div className="card-body">
       <form className="flex flex-col gap-8" onSubmit={savedata}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama</span>
          </label>
          <input type="text"  name="nama" className="input input-bordered w-full" defaultValue={produk?.data?.nama || ''}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Harga</span>
          </label>
          <input type="number" name="harga" className="input input-bordered w-full" defaultValue={produk?.data?.harga || ''}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gambar</span>
          </label>
          <input type="text" name="gambar" className="input input-bordered w-full" defaultValue={produk?.data?.gambar || ''}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Deskripsi</span>
          </label>
          <textarea className="textarea textarea-bordered w-full" name="deskripsi" defaultValue={produk?.data?.deskripsi || ''}></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Kategori</span>
          </label>
          <select className="select select-bordered w-full" name="kategori_id" defaultValue={produk?.data?.kategori_id || ''}>
            <option value="">Pilih Kategori</option>
            {kategoriOptions.data &&
              kategoriOptions.data.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.kategori}
                </option>
              ))}
          </select>
        </div>

        <button className="btn btn-primary mt-4">Save</button>
        </form>
      </div>
    </div>
  );
}
