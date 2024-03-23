import { checkEnvironment } from "@/config/apiUrl";
import { imageUrl } from "@/config/apiUrl";
import { formatDate } from "@/lib/dateFunction";

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
    const vendor = await res.json();

    return vendor;
  }

  const { id } = params;
  const portfolio = await getPortfolioByID(id);
  const gambarArray = JSON.parse(portfolio.gambar_pendukung);
  const { data } = await getVendorById(portfolio.vendor_id);
  const {
    profile: [profileObject],
  } = data;
  console.log(profileObject);

  console.log(profileObject);

  const imageElement = [];
  const sliderElement = [];
  for (let i = 0; i < gambarArray.length; i++) {
    imageElement.push(
      <div key={i + 2} id={"item" + (i + 2)} className="carousel-item w-full">
        <img
          src={imageUrl + "portfolio/" + id + "/" + gambarArray[i]}
          className="w-full"
        />
      </div>
    );
    sliderElement.push(
      <a key={i + 2} href={"#item" + (i + 2)} className="btn btn-xs">
        {i + 2}
      </a>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mt-4">{portfolio.judul}</h2>
      <p className="text-sm mb-4 ">{formatDate(portfolio.tanggal)}</p>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="flex justify-center">
          <div className="carousel w-[28rem] h-[16rem]">
            <div id="item1" className="carousel-item w-full">
              <img
                src={imageUrl + "portfolio/" + id + "/" + portfolio.gambar}
                className="w-full"
              />
            </div>
            {imageElement}
          </div>
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          {sliderElement}
        </div>
        <h2 className="text-xl font-bold mb-4">Deskripsi</h2>
        <p>{portfolio.deskripsi}</p>
        <div className="mt-4 flex flex-row items-center gap-10">
          <div className="profile-avatar flex items-center">
            <div className="avatar mr-4">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  className="object-contain"
                  src="https://www.bridestory.com/_nuxt/img/bs_logo_dark-HJ6X7hQcPce7eceff4fdd3988b58ef900028ffc0a.webp"
                  alt="Rafiqur Rahman"
                />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold">{data.nama}</h2>
              <p className="text-xs">{profileObject.lokasi}</p>
            </div>
          </div>
          <div className="border border-gray-200 hover:border-pink-300 hover:cursor-pointer rounded-md text-sm text-gray-600 w-44 h-8 text-center flex items-center justify-center">
            <p>Lihat Profil Vendor</p>
          </div>
        </div>
      </div>
    </>
  );
}
