import { checkEnvironment } from "@/config/apiUrl";
import { imageUrl } from "@/config/apiUrl";

export default async function Page({ params }) {
  async function getPortfolioByID(id) {
    const res = await fetch(`${checkEnvironment()}/api/portfolio/${id}`, {
      cache: "no-store",
    });
    const { portfolio } = await res.json();

    return portfolio;
  }

  async function getVendorById(id) {
    const res = await fetch(`${checkEnvironment()}/api/users/${id}`, {
      cache: "no-store",
    });
    const { data } = await res.json();

    return data;
  }

  const { id } = params;
  const portfolio = await getPortfolioByID(id);
  const gambar_pendukung = portfolio.gambar_pendukung;
  const gambarArray = JSON.parse(gambar_pendukung);
  const vendor = await getVendorById(portfolio.vendor_id);
  const {
    profile: [profileObject],
  } = vendor;
  const elements = [];
  const slider = [];

  for (let i = 0; i < gambarArray.length; i++) {
    elements.push(
      <div key={i} id={"item" + (i + 2)} className="carousel-item w-full">
        <img
          src={imageUrl + "portfolio/" + portfolio.id + "/" + gambarArray[i]}
          className="w-full"
        />
      </div>
    );
    slider.push(
      <a key={i} href={"#item" + (i + 2)} className="btn btn-xs">
        {i + 2}
      </a>
    );
  }

  return (
    <div>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mt-4">{portfolio.judul}</h2>
        <p>20 Maret 2023 - Kota Semarang</p>
        <div className="flex justify-center mt-4">
          <div className="carousel w-[500px] h-[300px]">
            <div id="item1" className="carousel-item w-full">
              <img
                src={
                  imageUrl +
                  "portfolio/" +
                  portfolio.id +
                  "/" +
                  portfolio.gambar
                }
                className="w-full"
              />
            </div>
            {elements}
          </div>
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          {slider}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Details</h3>
          <p>{portfolio.deskripsi}</p>
        </div>
        <div className="mb-4">
          <div className="profile-avatar flex items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="avatar mr-4">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    className="object-contain"
                    src="https://www.bridestory.com/_nuxt/img/bs_logo_dark-HJ6X7hQcPce7eceff4fdd3988b58ef900028ffc0a.webp"
                    alt="Rafiqur Rahman"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-md font-bold">{vendor.nama}</h2>
                <p className="text-sm">{profileObject.lokasi}</p>
              </div>
            </div>
            <button className="btn flex flex-row w-64 h-8 min-h-8 border border-gray-300 rounded-lg">
              <span className="inline text-xs text-gray-600">
                Lihat Profil Vendor
              </span>
            </button>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </div>
  );
}
