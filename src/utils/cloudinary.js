import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("upload success on cloudinary", response.url);
    return response;
  } catch (error) {
    if (!localFilePath) return null;

    fs.unlinkSync(localFilePath); // remove locally save tenporary file as upload
    //operation got failed (from server)
    return null;
  }
};

// this code is from cloudinary website
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { uploadOnCloudinary };
