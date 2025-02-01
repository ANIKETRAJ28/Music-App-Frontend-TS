import { Layout } from "@/Layout/Layout";
import { LandingPage } from "@/pages/Langing";
import { MusicPage } from "@/pages/Music";
import { SignUp } from "@/pages/Signup";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { JamPage } from "@/pages/Jam";
import { LibraryPage } from "@/pages/Library";

export function Routers() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/home"
        element={
          <ProtectedRoutes>
            <Layout>
              <MusicPage />
            </Layout>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/library"
        element={
          <ProtectedRoutes>
            <Layout>
              <LibraryPage />
            </Layout>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/jam"
        element={
          <ProtectedRoutes>
            <Layout>
              <JamPage />
            </Layout>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
    </Routes>
  );
}
