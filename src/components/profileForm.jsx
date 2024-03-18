import React from "react";

export const ProfileForm = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-4">Profile</h2>
      <form>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Vendor Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your vendor name"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            placeholder="Enter your address"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            placeholder="Enter your location"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Enter your description"
          ></textarea>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Crew Profile</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};
