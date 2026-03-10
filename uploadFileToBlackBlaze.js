import axios from "axios";
import { BASE_URL } from "./apiCalls";
import * as FileSystem from 'expo-file-system/legacy';




export const getUploadVideoUrl = async ( userId , name , type ) => {
   try {
    const res = await axios.post(`${BASE_URL}/users/getUploadVideoUrl`, {
      userId,
      name,
      type,
    });
    return res.data
  } catch (err) {
    console.error("Failed to get upload URL:", err.message, err.response?.data);
    throw err;
  }
};



export const getUploadImageUrl = async ( userId , name , type ) => {
  try {
   const res = await axios.post(`${BASE_URL}/users/getUploadImageUrl`, {
     userId,
     name,
     type,
   });
   return res.data
 } catch (err) {
   console.error("Failed to get upload URL:", err.message, err.response?.data);
   throw err;
 }
};

export const uploadImageToBlackBlaze = async (
                                 data,
                                 imageuri) => {
      const result = await FileSystem.uploadAsync(
        data.uploadUrl,
        imageuri,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
          headers: {
            Authorization: data.authorizationToken,
            "X-Bz-File-Name": encodeURIComponent(data.fileName),
            "Content-Type": "image/jpeg",
            "X-Bz-Content-Sha1": "do_not_verify",
          },
        }
      );
    
      if (result.status !== 200) {
        throw new Error("Video upload failed");
      }
    
      return JSON.parse(result.body);
    };


 export const uploadVideoToBackblaze = async (
  data,
  videoUri
) => {
  const result = await FileSystem.uploadAsync(
    data.uploadUrl,
    videoUri,
    {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        Authorization: data.authorizationToken,
        "X-Bz-File-Name": encodeURIComponent(data.fileName),
        "Content-Type": "video/mp4",
        "X-Bz-Content-Sha1": "do_not_verify",
      },
    }
  );

  if (result.status !== 200) {
    throw new Error("Video upload failed");
  }

  return JSON.parse(result.body);
};
 

 export const saveSignedUrlImageToDataBase = async (body) => {
    await axios.post(`${BASE_URL}/users/saveProfileImage`, body);
  };
  