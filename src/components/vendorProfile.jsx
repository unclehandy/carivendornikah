import React from 'react';
import { Edit } from 'lucide-react';

export const MyProfile = () => {
  return (
    <div className="my-profile">
      <div className="profile-header flex items-center justify-between mb-8 border border-gray-300 rounded-lg p-4">
        <div className="profile-avatar flex items-center">
          <div className="avatar mr-4">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img className="object-contain" src="https://www.bridestory.com/_nuxt/img/bs_logo_dark-HJ6X7hQcPce7eceff4fdd3988b58ef900028ffc0a.webp" alt="Rafiqur Rahman" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Bride Story</h2>
            <p className='text-sm'>Kota Jakarta Selatan</p>
          </div>
        </div>
        <button className="btn rounded flex flex-row h-8 min-h-8 border border-gray-300 rounded-lg">
          <span className='inline text-xs text-gray-600'>Edit</span><Edit size={15} className='inline text-gray-600'/>
        </button>
      </div>
      <div className="personal-information mb-8 border border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold pl-2">Profil Vendor</h3>
          <button className="btn rounded flex flex-row h-8 min-h-8 border border-gray-300 rounded-lg">
          <span className='inline text-xs text-gray-600'>Edit</span><Edit size={15} className='inline text-gray-600'/>
        </button>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <div>
            <h5 className="profile-heading">Nama Vendor</h5>
            <p className="profile-subheading">Bride Story</p>
          </div>
          <div>
            <h5 className="profile-heading">Lokasi</h5>
            <p className='profile-subheading'>Kota Jakarta Selatan</p>
          </div>
          <div>
            <h5 className="profile-heading">Alamat Email</h5>
            <p className='profile-subheading'>admin@bridestory.com</p>
          </div>
          <div>
            <h5 className="profile-heading">Nomor Telepon</h5>
            <p className='profile-subheading'>081345462480</p>
          </div>
          <div className="col-span-2">
            <h5 className="profile-heading">Bio</h5>
            <p className='profile-subheading'>Bride Story merupakan EO berbasis pengembangan teknologi dari PT. Kreasi Inovasi Bangsa dan memiliki layanan asistensi platform digital yang cepat, fleksibel dan customizable untuk menjawab setiap tantangan dan kebutuhan client. Sesuai dengan tagline kami yakni "Make Event Accessible For Everyone", Littlecloud ingin setiap pasangan bisa mewujudkan pernikahan impian yang premium namun tetap affordable. Littlecloud siap membuat setiap moment Anda menjadi lebih bermakna bersama kami!</p>
          </div>
        </div>
      </div>

      <div className="address border border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4 pl-2">
          <h3 className="text-lg font-semibold">Alamat</h3>
          <button className="btn rounded flex flex-row h-8 min-h-8 border border-gray-300 rounded-lg">
          <span className='inline text-xs text-gray-600'>Edit</span><Edit size={15} className='inline text-gray-600'/>
        </button>
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <div>
            <h5 className="profile-heading">Provinsi</h5>
            <p className='profile-subheading'>DKI Jakarta</p>
          </div>
          <div>
            <h5 className="profile-heading">Kabupaten/Kota</h5>
            <p className='profile-subheading'>Kota Jakarta Selatan</p>
          </div>
          <div>
            <h5 className="profile-heading">Kode Pos</h5>
            <p className='profile-subheading'>61253</p>
          </div>
          <div>
            <h5 className="profile-heading">Alamat Lengkap</h5>
            <p className='profile-subheading'>Jln. Jeruk Purut No 11 RT 10 RW 03, Kec. Pasar Minggu Baru, Kota Jakarta Selatan</p>
          </div>
        </div>
      </div>
    </div>
  );
};