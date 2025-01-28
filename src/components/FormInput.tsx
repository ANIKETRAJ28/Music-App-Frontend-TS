import { Input } from "@/components/ui/input";
import React from "react";

interface FormInputProps {
  formData: {
    email: string;
    otp: string;
    name: string;
    username: string;
    password: string;
  };
  type: string;
  handleInputChange: (key: string, value: string) => void;
  icon: React.ReactNode;
}

export function FormInput({
  formData,
  type,
  handleInputChange,
  icon,
}: FormInputProps) {
  return (
    <div className="relative">
      {icon}
      <Input
        id={`${type}`}
        type={type}
        placeholder={`Enter your ${type}`}
        className="pl-10 bg-white/5 border-teal-500/20 text-cyan-100/80"
        value={formData.email}
        onChange={(e) => handleInputChange(`${type}`, e.target.value)}
        required
      />
    </div>
  );
}
