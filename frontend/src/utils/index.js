import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=a6c948ab64f7987bbf9e5477cde3a1cb`,
    formData
  );
  return data?.data?.display_url;
};

// CLOUDINARY_Img Upload APi key
// Plantnet-Web-Applictions
//  dq9kq05ci
// https://api.cloudinary.com/v1_1/<cloud name>/image/upload

export const imageUploadCloudinary = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_IMGE_NAME);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    formData
  );
  return data?.data?.display_url;
};

// const formData = new FormData();
//       formData.append("file", profileImg); // Cloudinary expects "file"
//       formData.append(
//         "upload_preset",
//         import.meta.env.VITE_CLOUDINARY_IMGE_NAME
//       );

//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//       const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//       return axios.post(uploadURL, formData);
