import axios from "axios";

export const registerFaceAPI = async (aadhar, faces) => {
  const res = await axios.post("http://localhost:8000/api/register-face", {
    aadhar,
    faces,
  });

  return res.data;
};