import React from "react";
import { ChevronDown, ChevronUp, Music2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { IPlaylist } from "@/types";

export function PlaylistDropdown(playlist: IPlaylist) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full text-white bg-cyan-950 rounded-md"
    >
      <CollapsibleTrigger className="w-full">
        <div
          className={cn("flex items-center justify-between w-full px-4 py-3")}
        >
          <div className="flex items-center gap-3">
            <Music2 className="w-5 h-5 text-teal-100 animate-pulse" />
            <span className="font-medium">{playlist.name}</span>
            <span className="text-sm text-muted-foreground text-teal-100 animate-pulse">
              {/* ({playlist.songs.length} songs) */}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground text-teal-100 animate-pulse" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground text-teal-100 animate-pulse" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-b-md">
        <div>
          {playlist.songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-3 p-3 bg-cyan-950 rounded-md hover:bg-cyan-900 transition-colors"
            >
              <img
                src={song.thumbnail}
                alt={song.title}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{song.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
