import { IPlaylist } from "@/types";
import { axiosInstance } from "./axios";

export async function defaultPlaylist(id: string): Promise<IPlaylist> {
  try {
    const response = await axiosInstance.get(`/playlist/${id}`);
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data.message;
  }
}
