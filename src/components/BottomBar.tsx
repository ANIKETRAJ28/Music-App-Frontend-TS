import { cn } from "@/lib/utils";
import { Home, Library, AudioLines, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function BottomBar() {
  const selectedTab = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const { name, avatar } = useSelector((state: RootState) => state.user);

  return (
    <div className="lg:hidden fixed bottom-0 z-10 bg-gray-900 backdrop-blur-lg transition-all duration-300 text-white flex w-full px-2 py-4 justify-between">
      <Music2 className="h-8 w-8" />
      <Button
        variant={selectedTab === "home" ? "default" : "ghost"}
        size="default"
        onClick={() => navigate("/home")}
      >
        <Home />
      </Button>
      <Button
        variant={selectedTab === "library" ? "default" : "ghost"}
        size="default"
        onClick={() => navigate("/library")}
      >
        <Library />
      </Button>
      <Button
        variant={selectedTab === "jam" ? "default" : "ghost"}
        size="default"
        onClick={() => navigate("/jam")}
      >
        <AudioLines className={cn("h-4 w-4")} />
      </Button>
      {/* <CircleUser className="h-8 w-8" /> */}
      <img
        className="h-10 w-10"
        src={`${avatar}`}
        alt={`${name}`}
      />
    </div>
  );
}
