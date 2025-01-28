import { LandingPage } from "@/pages/Langing";
import { MusicPage } from "@/pages/Music";
import { SignUp } from "@/pages/Signup";
import { Routes, Route } from "react-router-dom";

export function Routers() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/music"
        element={<MusicPage />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
    </Routes>
  );
}
