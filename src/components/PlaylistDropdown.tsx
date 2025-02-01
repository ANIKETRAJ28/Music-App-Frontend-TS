import { useState } from "react";
import { ChevronDown, ChevronUp, Music2, Plus, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { IPlaylist, ISong } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { addSongToPlaylist } from "@/store/allPlaylist";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { PulseLoader } from "react-spinners";

export function PlaylistDropdown({
  playlist,
  playlists,
  setPlaylists,
  setCurrentSong,
}: {
  playlist: IPlaylist;
  playlists: IPlaylist[];
  setPlaylists: (playlists: IPlaylist[]) => void;
  setCurrentSong: (song: ISong) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [addPlaylistSong, setAddPlaylistSong] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Collapsible
      open={isOpen}
      className="w-full text-white bg-cyan-950 rounded-md"
    >
      <CollapsibleTrigger className="w-full">
        <div
          className={cn("flex items-center justify-between w-full px-4 py-3")}
        >
          <div className="flex items-center gap-3">
            <Music2
              onClick={() => {
                setAddPlaylistSong(null);
                setIsOpen(!isOpen);
              }}
              className="w-5 h-5 text-teal-100 animate-pulse"
            />
            <span
              onClick={() => {
                setIsOpen(!isOpen);
                setAddPlaylistSong(null);
              }}
              className="font-medium"
            >
              {playlist.name}
            </span>
            <span
              onClick={() => {
                setIsOpen(!isOpen);
                setAddPlaylistSong(null);
              }}
              className="text-sm text-muted-foreground text-teal-100 animate-pulse"
            >
              ({playlist.songs.length} songs)
            </span>
            <Tooltip>
              <TooltipTrigger>
                {addPlaylistSong && addPlaylistSong === playlist.id ? (
                  <X
                    className="w-5 h-5 text-teal-100 animate-pulse"
                    onClick={() => {
                      setAddPlaylistSong(null);
                    }}
                  />
                ) : (
                  <Plus
                    onClick={() => {
                      setAddPlaylistSong(playlist.id);
                      if (!isOpen) setIsOpen(true);
                    }}
                    className="w-5 h-5 text-teal-100 animate-pulse"
                  />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs rounded-sm p-1 bg-cyan-700 bg-opacity-30 hover:bg-cyan-900 backdrop-blur-md text-cyan-300 shadow-md">
                  {isOpen ? "Close" : "Add Song"}
                </p>
              </TooltipContent>
            </Tooltip>
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
          {addPlaylistSong && addPlaylistSong === playlist.id && (
            <div className="flex items-center gap-3 p-3">
              <Input
                placeholder="Add Song url..."
                className="m-auto text-teal-100"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button
                onClick={async () => {
                  try {
                    setLoading(true);
                    const res = await dispatch(
                      addSongToPlaylist({ id: playlist.id, url })
                    );
                    const finalPlaylist = playlists.map((p) => {
                      if (p.id === playlist.id) {
                        return {
                          ...p,
                          songs: [
                            ...p.songs,
                            {
                              id: res.payload.id,
                              description: res.payload.description,
                              thumbnail: res.payload.thumbnail,
                              title: res.payload.title,
                              url: res.payload.url,
                            },
                          ],
                        };
                      }
                      return p;
                    });
                    setPlaylists(finalPlaylist);
                  } finally {
                    setUrl("");
                    setAddPlaylistSong(null);
                    setLoading(false);
                  }
                }}
                className="bg-cyan-700 bg-opacity-30 hover:bg-cyan-900 backdrop-blur-md text-cyan-300"
              >
                {loading ? (
                  <PulseLoader
                    color="#67e8f9"
                    size={8}
                  />
                ) : (
                  "Add Song"
                )}
              </Button>
            </div>
          )}
          {playlist.songs.map((song) => (
            <div
              onClick={() => setCurrentSong(song)}
              key={song.id}
              className="flex items-center gap-3 p-3 bg-cyan-950 rounded-md hover:bg-cyan-900 transition-colors"
            >
              <img
                src={song.thumbnail}
                alt={song.title}
                className="w-15 h-12 object-cover rounded-md"
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
