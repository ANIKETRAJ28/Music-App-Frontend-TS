import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Music4,
  Mail,
  User,
  KeyRound,
  AtSign,
  Eye,
  EyeOff,
} from "lucide-react";
import { EmailValidator, OtpValidator, ProfileValidator } from "@/utils/signup";
import { useToast } from "@/hooks/use-toast";
import { completeProfile, registerEmail, verifyOtp } from "@/apis/signUp";

const STEPS = {
  EMAIL: 0,
  OTP: 1,
  PROFILE: 2,
};

export function SignUp() {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    name: "",
    username: "",
    password: "",
  });
  const { toast } = useToast();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      EmailValidator.parse(formData.email);
      const response = await registerEmail(formData.email);
      toast({ title: response });
      setStep(STEPS.OTP);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFormData({ email: "", name: "", otp: "", password: "", username: "" });
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      OtpValidator.parse(formData.otp);
      const response = await verifyOtp(formData.otp);
      toast({ title: response });
      setStep(STEPS.PROFILE);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFormData({ ...formData, otp: "" });
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      try {
        ProfileValidator.parse({
          name: formData.name,
          username: formData.username,
          password: formData.password,
        });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error.errors.forEach((err: any) => {
          if (err.path) {
            setErrors((prev) => ({ ...prev, [err.path[0]]: err.message }));
          }
        });
        console.log("before here...");
        return;
      }
      const result = await completeProfile({
        name: formData.name,
        username: formData.username,
        password: formData.password,
      });
      toast({ title: result });
      setStep(STEPS.PROFILE);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrors({ name: "", password: "", username: "" });
      setFormData({ email: "", name: "", otp: "", password: "", username: "" });
      setStep(STEPS.EMAIL);
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canNavigateToStep = (targetStep: number) => {
    if (targetStep === STEPS.EMAIL) return true;
    if (targetStep === STEPS.OTP) return formData.email !== "";
    if (targetStep === STEPS.PROFILE)
      return formData.email !== "" && formData.otp.length === 6;
    return false;
  };

  const handleStepClick = (targetStep: number) => {
    if (canNavigateToStep(targetStep) && targetStep <= step) {
      setStep(targetStep);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting multiple digits
      const digits = value.slice(0, 6).split("");
      const newOtp = formData.otp.split("");

      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });

      handleInputChange("otp", newOtp.join(""));

      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex(
        (digit, i) => !digit && i >= index
      );
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
        otpRefs.current[nextEmptyIndex]?.focus();
      } else {
        otpRefs.current[5]?.focus();
      }
    } else {
      // Single digit input
      const newOtp = formData.otp.split("");
      newOtp[index] = value;
      handleInputChange("otp", newOtp.join(""));

      // Auto-focus next input
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOTPKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-950 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Music background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="w-full max-w-md">
        <div className="flex flex-col text-center mb-8">
          <div className="flex justify-center gap-4">
            <Music4 className="h-12 w-12 text-teal-100 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-100 to-teal-500 text-transparent bg-clip-text mb-2">
              Join Now
            </h1>
          </div>
          <p className="text-cyan-100/80 opacity-80">
            Your journey into music starts here
          </p>
        </div>

        <Card className="p-6 bg-white/10 backdrop-blur-lg border-teal-500/20">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              {[STEPS.EMAIL, STEPS.OTP, STEPS.PROFILE].map((s, i) => (
                <div
                  key={s}
                  className="flex items-center"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= s ? "bg-teal-800" : "bg-teal-100/20"
                    } text-white cursor-pointer transition-colors ${
                      canNavigateToStep(s) && step >= s
                        ? "hover:bg-teal-600"
                        : ""
                    }`}
                    onClick={() => handleStepClick(s)}
                    role="button"
                    tabIndex={0}
                  >
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div
                      className={`w-12 h-0.5 ${
                        step > s ? "bg-teal-500" : "bg-teal-100/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === STEPS.EMAIL && (
            <form
              onSubmit={handleEmailSubmit}
              className="space-y-4"
            >
              <div className="space-y-2 relative">
                <Label
                  htmlFor="email"
                  className="text-cyan-100/80"
                >
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-[10px] h-5 w-5 text-cyan-100/80" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-white/5 border-teal-500/20 text-cyan-100/80"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-teal-800 hover:bg-teal-600"
              >
                Send OTP
              </Button>
            </form>
          )}

          {step === STEPS.OTP && (
            <form
              onSubmit={handleOTPSubmit}
              className="space-y-4"
            >
              <div className="space-y-2 relative">
                <Label className="text-cyan-100/80">
                  Enter verification code
                </Label>
                <div className="flex gap-2 justify-center">
                  {[...Array(6)].map((_, index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={6}
                      className="w-12 h-12 text-center bg-white/5 border-teal-500/20 text-cyan-100/80"
                      value={formData.otp[index] || ""}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      ref={(el) => (otpRefs.current[index] = el)}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-teal-800 hover:bg-teal-600"
                disabled={formData.otp.length !== 6}
              >
                Verify
              </Button>
            </form>
          )}

          {step === STEPS.PROFILE && (
            <form
              onSubmit={handleProfileSubmit}
              className="space-y-4"
            >
              <div className="space-y-5 relative">
                <Label
                  htmlFor="name"
                  className="text-cyan-100/80"
                >
                  Full Name
                </Label>
                {errors.name && (
                  <p className="absolute text-teal-400 text-xs top-1">
                    *{errors.name}
                  </p>
                )}

                <div className="relative">
                  <User className="absolute left-3 top-[10px] h-5 w-5 text-cyan-100/80" />
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="pl-10 bg-white/5 border-teal-500/20 text-cyan-100/80"
                    value={formData.name}
                    onChange={(e) => {
                      setErrors({ ...errors, name: "" });
                      handleInputChange("name", e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-5 relative">
                <Label
                  htmlFor="username"
                  className="text-cyan-100/80"
                >
                  Username
                </Label>
                {errors.username && (
                  <p className="absolute text-teal-400 text-xs top-1">
                    *{errors.username}
                  </p>
                )}
                <div className="relative">
                  <AtSign className="absolute left-3 top-[10px] h-5 w-5 text-cyan-100/80" />
                  <Input
                    id="username"
                    placeholder="Choose a username"
                    className="pl-10 bg-white/5 border-teal-500/20 text-cyan-100/80"
                    value={formData.username}
                    onChange={(e) => {
                      setErrors({ ...errors, username: "" });
                      handleInputChange("username", e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-5 relative">
                <Label
                  htmlFor="password"
                  className="text-cyan-100/80"
                >
                  Password
                </Label>
                {errors.password && (
                  <p className="absolute text-teal-400 text-xs top-1">
                    *{errors.password}
                  </p>
                )}
                <div className="relative">
                  <KeyRound className="absolute left-3 top-[10px] h-5 w-5 text-cyan-100/80" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10 bg-white/5 border-teal-500/20 text-cyan-100/80"
                    value={formData.password}
                    onChange={(e) => {
                      setErrors({ ...errors, password: "" });
                      handleInputChange("password", e.target.value);
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[8px] text-cyan-100/80 hover:text-cyan-100 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-800 hover:bg-teal-600"
                onClick={(e) => handleProfileSubmit(e)}
              >
                Complete Profile
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
