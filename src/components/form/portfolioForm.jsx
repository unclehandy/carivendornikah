"use client";

export const PortfolioForm = () => {
  async function handleSubmitPortfolio(formData) {
    const user = JSON.parse(localStorage.getItem("user"));
    const vendor_id = user.id;

    formData.append("vendor_id", vendor_id);

    const res = await fetch("/api/portfolio", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
  }

  return (
    <form action={handleSubmitPortfolio} >
      <section className="space-y-3">
        <div>
          <label>Judul Portfolio</label>
          <input name="judul" placeholder="Pernikahan siapa yang kamu bantu?" />
        </div>
        <section className="grid grid-cols-2 gap-4">
          <div>
            <label>Tanggal</label>
            <input type="date" name="tanggal" />
          </div>
          <div>
            <label>Lokasi</label>
            <input name="lokasi" placeholder="Lokasi kegiatan" />
          </div>
        </section>
        <div>
          <label>Deskripsi Portfolio</label>
          <textarea
            name="deskripsi"
            placeholder="Deskripsikan portfoliomu semenarik mungkin"
            rows={6}
          ></textarea>
        </div>
        <div>
          <label>Gambar Utama</label>
          <input
            name="gambar"
            type="file"
            className="file-input file-input-bordered"
          />
        </div>
        <div>
          <label>Gambar Pendukung</label>
          <input
            name="gambar_pendukung"
            type="file"
            multiple
            className="file-input file-input-bordered"
          />
        </div>
        <div className="flex gap-4"></div>
        <button className="text-gray-600 border border-gray-300 py-2 px-8 text-sm">Kirim</button>
      </section>
    </form>
  );
};
