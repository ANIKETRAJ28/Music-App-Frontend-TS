import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ProtectedRoutes({
  children,
}: {
  children: React.ReactElement;
}) {
  const navigate = useNavigate();
  const { id } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
  }, []);

  return <div>{children}</div>;
}
