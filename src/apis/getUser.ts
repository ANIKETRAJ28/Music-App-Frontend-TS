/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/types";
import { axiosInstance } from "./axios";

export async function getUser(): Promise<IUser> {
  try {
    const response = await axiosInstance.get("/auth");
    console.log("res...", response.data.data);
    return response.data.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
}
