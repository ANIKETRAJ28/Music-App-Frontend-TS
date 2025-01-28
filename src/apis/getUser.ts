import { axiosInstance } from "./axios";

export async function getUser() {
  try {
    const response = await axiosInstance.get("/auth");
    console.log("res...", response.data.data);
  } catch (error) {
    console.log(error);
  }
}
