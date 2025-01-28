/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axios";

export async function registerEmail(email: string) {
  try {
    const response = await axiosInstance.post(`/auth/register/${email}`);
    return response.data.message;
  } catch (error: any) {
    throw error.response.data.message;
  }
}

export async function verifyOtp(otp: string) {
  try {
    const response = await axiosInstance.post(`/auth/verifyOtp/${otp}`);
    return response.data.message;
  } catch (error: any) {
    throw error.response.data.message;
  }
}

export async function completeProfile(user: {
  name: string;
  username: string;
  password: string;
}) {
  try {
    const response = await axiosInstance.post(`/auth/complete-profile`, {
      user: user,
    });
    return response.data.message;
  } catch (error: any) {
    throw error.response.data.message;
  }
}
