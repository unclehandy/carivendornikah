"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi

export default function Produk() {
  const router = useRouter(); // Inisialisasi useRouter

  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduk, setEditingProduk] = useState(null);
  const [kategoriOptions, setKategoriOptions] = useState([]);

  // State untuk data produk baru
  const [newProduk, setNewProduk] = useState({
    nama: "",
    harga: 0,
    kategori_id: "",
    user_id: "",
    gambar: "",
    deskripsi: "",
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
    fetchData();
    fetchKategoris();
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

  const handleAddOrUpdate = async (event) => {
    try {
      if (editingProduk) {
        const response = await axios.patch(
          `http://localhost:3000/api/produk/${editingProduk.id}`,
          { produk: newProduk }
        );
        if (response.status === 200) {
          fetchData();
          setModalOpen(false);
          setEditingProduk(null);
          setNewProduk("");
        }
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/produk",
          newProduk // Menggunakan newProduk langsung sebagai payload
        );
        if (response.status === 201) {
          fetchData();
          setModalOpen(false);
          setNewProduk("");
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const openModalForEdit = (data) => {
    setEditingProduk(data);
    setNewProduk(data); // Set nilai newProduk sesuai dengan data yang akan diedit
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduk(null);
    setNewProduk({
      nama: "",
      harga: 0,
      kategori_id: "",
      user_id: "",
      gambar: "",
      deskripsi: "",
    }); // Reset newProduk ke nilai awal
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
                          <button
                            className="btn btn-sm btn-accent"
                            onClick={() => openModalForEdit(item)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="modal-close" onClick={closeModal}></div>
            <div className="modal-body">
              <h2>{editingProduk ? "Edit Produk" : "Tambah Produk"}</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nama</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={newProduk.nama}
                  onChange={(e) =>
                    setNewProduk({ ...newProduk, nama: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Harga</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={newProduk.harga}
                  onChange={(e) =>
                    setNewProduk({ ...newProduk, harga: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gambar</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={newProduk.gambar}
                  onChange={(e) =>
                    setNewProduk({ ...newProduk, gambar: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Deskripsi</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={newProduk.deskripsi}
                  onChange={(e) =>
                    setNewProduk({ ...newProduk, deskripsi: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Kategori</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={newProduk.kategori_id}
                  onChange={(e) =>
                    setNewProduk({
                      ...newProduk,
                      kategori_id: e.target.value,
                    })
                  }
                >
                  <option value="">Pilih Kategori</option>
                  {kategoriOptions.data &&
                    kategoriOptions.data.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.kategori}
                      </option>
                    ))}
                </select>
              </div>

              <button
                className="btn btn-primary mt-4"
                onClick={handleAddOrUpdate}
              >
                {editingProduk ? "Simpan Perubahan" : "Tambah"}
              </button>
              <button className="btn ms-3" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}