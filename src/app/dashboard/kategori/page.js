"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Kategori() {
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingKategori, setEditingKategori] = useState(null); // state untuk menyimpan data kategori yang akan diedit
  const [newKategori, setNewKategori] = useState("");

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        url: "http://localhost:3000/api/kategori"
      };
      const { data } = await axios.request(options);
      setKategori(data);
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
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/kategori/${id}`);
          if (response.status === 200) {
            fetchData();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingKategori) {
        // Jika ada data yang sedang diedit
        const response = await axios.patch(`http://localhost:3000/api/kategori/${editingKategori.id}`, { kategori: newKategori });
        if (response.status === 200) {
          fetchData();
          setModalOpen(false);
          setEditingKategori(null);
          setNewKategori("");
        }
      } else {
        // Jika tidak ada data yang sedang diedit (tambah kategori baru)
        const response = await axios.post("http://localhost:3000/api/kategori", { kategori: newKategori });
        if (response.status === 201) {
          fetchData();
          setModalOpen(false);
          setNewKategori("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModalForEdit = (data) => {
    setEditingKategori(data);
    setNewKategori(data.kategori); // Set nilai input kategori sesuai dengan data yang akan diedit
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingKategori(null);
    setNewKategori("");
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-4 text-blue-950 font-normal">
        Kategori Produk
      </h1>
      <div className="card border bg-base-100 shadow-xl">
        <div className="card-body">
          <button className="btn btn-primary mb-4 w-fit" onClick={() => setModalOpen(true)}>Tambah Kategori</button>

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
                  {/* Tampilkan data kategori jika kategori bukan null */}
                  {kategori.data &&
                    kategori.data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.kategori}</td>
                        <td>
                          <button className="btn btn-sm btn-primary me-4" onClick={() => handleDelete(item.id)}>Hapus</button>
                          <button className="btn btn-sm btn-accent" onClick={() => openModalForEdit(item)}>Edit</button>
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

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="modal-close" onClick={closeModal}></div>
            <div className="modal-body">
              <h2>{editingKategori ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Kategori</span>
                </label>
                
                <input type="text" className="input input-bordered w-full" value={newKategori} onChange={(e) => setNewKategori(e.target.value)} />
              </div>
              <button className="btn btn-primary mt-4" onClick={handleAddOrUpdate}>{editingKategori ? 'Simpan Perubahan' : 'Tambah'}</button>
              <button className="btn ms-3" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
