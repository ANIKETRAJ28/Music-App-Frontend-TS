import { cn } from "@/lib/utils";
import { Home, Library, AudioLines, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getSidebarStatus, toggleSidebar } from "@/store/sidebar";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  className: string;
  name: string;
  avatar: string;
}

export function Sidebar({ className, name, avatar }: SidebarProps) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const sidebar = getSidebarStatus();

  const selectedTab = location.pathname.split("/")[1];

  return (
    <div className="h-full">
      <div className={cn("h-full", className)}>
        <div className="flex w-full items-center justify-between flex-col space-y-4 py-4 h-full">
          <div className="h-fit w-full">
            <div className="flex flex-col gap-4 justify-around p-2">
              <div
                onClick={() => dispatch(toggleSidebar())}
                className={`flex items-center mb-2 px-2 cursor-pointer ${
                  !sidebar && "justify-center"
                }`}
              >
                {sidebar && <h1 className="text-xl font-bold">Ani</h1>}
                <Music2 className="h-8 w-8" />
                {sidebar && <h1 className="text-xl font-bold">Play</h1>}
              </div>
              <div className="space-y-1 gap-0 flex flex-col justify-between">
                <Button
                  variant={selectedTab === "home" ? "default" : "ghost"}
                  size="default"
                  className={cn(
                    "w-full",
                    sidebar ? "justify-start" : "justify-center"
                  )}
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <Home />
                  {sidebar && "Home"}
                </Button>
                <Button
                  variant={selectedTab === "library" ? "default" : "ghost"}
                  size="default"
                  className={cn(
                    "w-full",
                    sidebar ? "justify-start" : "justify-center"
                  )}
                  onClick={() => {
                    navigate("/library");
                  }}
                >
                  <Library />
                  {sidebar && "Your Library"}
                </Button>
                <Button
                  variant={selectedTab === "jam" ? "default" : "ghost"}
                  size="default"
                  className={cn(
                    "w-full",
                    sidebar ? "justify-start" : "justify-center"
                  )}
                  onClick={() => {
                    navigate("/jam");
                  }}
                >
                  <AudioLines />
                  {sidebar && "Jam"}
                </Button>
              </div>
            </div>
          </div>
          {
            <div
              className={`flex items-center gap-4 pt-2 px-2 cursor-pointer ${
                !sidebar && "justify-center"
              }`}
            >
              <img
                className="h-10 w-10"
                src={`${avatar}`}
                alt={`${name}`}
              />
              {/* <CircleUser className="h-8 w-8" /> */}
              {sidebar && <h1 className="text-xl font-bold">{name}</h1>}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
