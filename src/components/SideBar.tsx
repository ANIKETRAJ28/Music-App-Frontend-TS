import { cn } from "@/lib/utils";
import {
  Home,
  Library,
  Search,
  // Plus,
  ListOrdered,
  AudioLines,
  Music2,
  CircleUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import { IPlaylist } from "@/types";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: IPlaylist[];
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
}

export function Sidebar({
  className,
  // playlists,
  expanded = true,
  setExpanded,
}: SidebarProps) {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <div className={cn("h-full", className)}>
      <div className="flex w-full sm:items-center md:flex-col space-y-4 py-4 h-full justify-between">
        <div>
          <div className="flex sm:flex-col gap-2 sm:gap-4 justify-around items-center p-2">
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
            <div className="space-y-1 gap-2 sm:gap-0 flex sm:flex-col justify-between">
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
                variant={selectedTab === "search" ? "default" : "ghost"}
                size="default"
                className={cn(
                  "w-full",
                  expanded ? "justify-start" : "justify-center"
                )}
                onClick={() => {
                  if (!expanded) {
                    setExpanded(!expanded);
                  }
                  setSelectedTab("search");
                }}
              >
                <Search />
                {expanded && "Search"}
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
                <Library className={cn("h-4 w-4", expanded && "mr-2")} />
                {expanded && "Your Library"}
              </Button>
              <Button
                variant={selectedTab === "queue" ? "default" : "ghost"}
                size="default"
                className={cn(
                  "w-full",
                  expanded ? "justify-start" : "justify-center"
                )}
                onClick={() => {
                  if (!expanded) {
                    setExpanded(!expanded);
                  }
                  setSelectedTab("queue");
                }}
              >
                <ListOrdered className={cn("h-4 w-4", expanded && "mr-2")} />
                {expanded && "Queue"}
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
                <AudioLines className={cn("h-4 w-4", expanded && "mr-2")} />
                {expanded && "Jam"}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between">
          {/* <ScrollArea className="h-[520px] px-2">
            {expanded && (
              <div>
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <h2 className="px-2 text-lg font-semibold tracking-tight">
                      Playlists
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1 p-2">
                    {playlists?.map((playlist) => (
                      <Button
                        key={playlist.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start font-normal"
                      >
                        {playlist.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <h2 className="px-2 text-lg font-semibold tracking-tight">
                      Playlists
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1 p-2">
                    {playlists?.map((playlist) => (
                      <Button
                        key={playlist.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start font-normal"
                      >
                        {playlist.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea> */}
          <div className="flex flex-col gap-1">
            {/* <Separator /> */}
            {
              <div
                onClick={() => setExpanded(!expanded)}
                className={`flex items-center sm:pt-2 px-2 cursor-pointer ${
                  !expanded && "justify-center"
                }`}
              >
                <CircleUser className="h-8 w-8" />
                {expanded && <h1 className="text-xl font-bold">Aniket Raj</h1>}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
