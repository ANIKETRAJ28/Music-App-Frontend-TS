import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Layout({ children }: { children: React.ReactElement }) {
  const navigate = useNavigate();
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-br from-cyan-950 to-black">
      {children}
    </div>
  );
}
