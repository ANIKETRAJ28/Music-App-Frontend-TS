import { cn } from "@/lib/utils";
import { Home, Library, AudioLines, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IPlaylist } from "@/types";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
  playlists: IPlaylist[];
  setPlaylists: (playlists: IPlaylist[]) => void;
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
}

export function Sidebar({
  className,
  expanded = true,
  setExpanded,
  setPlaylists,
  selectedTab,
  setSelectedTab,
}: SidebarProps) {
  const user = useSelector((state: RootState) => state.user);
  const defaultPlaylist = useSelector(
    (state: RootState) => state.defaultPlaylist
  );
  const allPlaylists = useSelector((state: RootState) => state.playlists);

  useEffect(() => {
    if (selectedTab === "home") {
      setPlaylists([defaultPlaylist]);
    } else if (selectedTab === "library") {
      setPlaylists(allPlaylists.playlists);
    }
  }, [selectedTab]);

  return (
    <div className={cn("h-full", className)}>
      <div className="flex w-full items-center flex-col space-y-4 py-4 h-full">
        <div className="h-fit w-full">
          <div className="flex flex-col gap-4 justify-around p-2">
            <div
              onClick={() => setExpanded(!expanded)}
              className={`flex items-center mb-2 px-2 cursor-pointer ${
                !expanded && "justify-center"
              }`}
            >
              {expanded && <h1 className="text-xl font-bold">Ani</h1>}
              <Music2 className="h-8 w-8" />
              {expanded && <h1 className="text-xl font-bold">Play</h1>}
            </div>
            <div className="space-y-1 gap-0 flex flex-col justify-between">
              <Button
                variant={selectedTab === "home" ? "default" : "ghost"}
                size="default"
                className={cn(
                  "w-full",
                  expanded ? "justify-start" : "justify-center"
                )}
                onClick={() => {
                  if (!expanded) {
                    setExpanded(!expanded);
                  }
                  setSelectedTab("home");
                }}
              >
                <Home />
                {expanded && "Home"}
              </Button>
              <Button
                variant={selectedTab === "library" ? "default" : "ghost"}
                size="default"
                className={cn(
                  "w-full",
                  expanded ? "justify-start" : "justify-center"
                )}
                onClick={() => {
                  if (!expanded) {
                    setExpanded(!expanded);
                  }
                  setSelectedTab("library");
                }}
              >
                <Library />
                {expanded && "Your Library"}
              </Button>
              <Button
                variant={selectedTab === "jam" ? "default" : "ghost"}
                size="default"
                className={cn(
                  "w-full",
                  expanded ? "justify-start" : "justify-center"
                )}
                onClick={() => {
                  if (!expanded) {
                    setExpanded(!expanded);
                  }
                  setSelectedTab("jam");
                }}
              >
                <AudioLines />
                {expanded && "Jam"}
              </Button>
            </div>
          </div>
          {expanded && <Separator />}
        </div>
        {
          <div
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-4 pt-2 px-2 cursor-pointer ${
              !expanded && "justify-center"
            }`}
          >
            <img
              className="h-10 w-10"
              src={`${user.avatar}`}
              alt={`${user.name}`}
            />
            {/* <CircleUser className="h-8 w-8" /> */}
            {expanded && <h1 className="text-xl font-bold">{user.name}</h1>}
          </div>
        }
      </div>
    </div>
  );
}
