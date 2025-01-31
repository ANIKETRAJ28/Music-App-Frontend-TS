import { useEffect, useState } from "react";
import { Sidebar } from "@/components/SideBar";
import { IPlaylist, ISong } from "@/types";
// import {
//   Play,
//   SkipBack,
//   SkipForward,
//   ThumbsUp,
//   Volume2,
//   Plus,
//   PlayIcon,
// } from "lucide-react";
import { cn } from "@/lib/utils";
// import { Slider } from "@/components/ui/slider";
import { BottomBar } from "@/components/BottomBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { getDefaultPlaylist } from "@/store/defaultPlaylist";
import { toast } from "@/hooks/use-toast";
import { allPlaylists } from "@/store/allPlaylist";
// import { MusicPlayer } from "@/components/MusicPlayer";
import { PlaylistDropdown } from "@/components/PlaylistDropdown";
import { Button } from "@/components/ui/button";
import { Copy, Send, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
import { io } from "socket.io-client";

export function MusicPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedTab, setSelectedTab] = useState("home");
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [currentSong, setCurrentSong] = useState<ISong | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const socket = io("http://localhost:3000", { withCredentials: true });
  const { id } = useSelector((state: RootState) => state.user);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const [queueItems, setQueueItems] = useState<(ISong & { upvotes: string })[]>(
    []
  );

  function addSongToQueue(url: string) {
    // alert(url);
    socket.emit("add song", id, url);
  }

  const Playlist = async (tab: string) => {
    try {
      if (tab === "home") {
        const response = await dispatch(
          getDefaultPlaylist(user.defaultPlaylist?.id as string)
        );
        if (playlists.length === 0) {
          setPlaylists([response.payload]);
          setCurrentSong(response.payload.songs[0]);
        } else {
          setPlaylists([response.payload]);
        }
      } else {
        const response = await dispatch(allPlaylists());
        setPlaylists(response.payload);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
      return null;
    }
  };

  function createJam() {
    socket.emit("start jam", id);
  }

  useEffect(() => {
    socket.on("get jam", (data) => {
      console.log("data...", data.jam);
      setQueueItems([...queueItems, data.jam[0]]);
    });

    socket.on("song added", (data) => {
      setQueueItems([...queueItems, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (!user.id) {
      navigate("/");
      return;
    }
    Playlist(selectedTab);
  }, [selectedTab]);

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-br from-cyan-950 to-black">
      <div className="flex h-full">
        <div
          className={cn(
            `hidden lg:flex flex-col lg:flex-row bg-gray-900 backdrop-blur-lg transition-all duration-300 shrink-0" ${
              sidebarExpanded ? "w-fit" : "w-[70px]"
            }`
          )}
        >
          <Sidebar
            expanded={sidebarExpanded}
            setExpanded={setSidebarExpanded}
            playlists={playlists}
            setPlaylists={setPlaylists}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            className="text-white"
          />
        </div>
        <BottomBar
          selectedTab={selectedTab}
          setSelectedTab={(tab: string) => setSelectedTab(tab)}
        />
        {selectedTab === "jam" ? (
          <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none p-6 bg-gradient-to-br from-cyan-800 to-slate-950 bg-opacity-30 backdrop-blur-md text-cyan-300 shadow-md">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Input</h2>
                  <div className="flex gap-2">
                    <Button onClick={() => createJam()}>Create Jam</Button>
                    <Button>Join Jam</Button>
                    {/* <Input
                      // value={inputText}
                      // onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text..."
                      className="flex-1"
                    />
                    <Button
                      // onClick={() => handleCopy(inputText)}
                      variant="secondary"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button> */}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Video Box</h2>
                  <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Video Preview</p>
                  </div>
                </div>

                <form
                  // onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="flex gap-2">
                    <Input
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Enter video URL..."
                      className="flex-1"
                    />
                    <Button
                      className="bg-white text-black"
                      type="submit"
                      onClick={() => addSongToQueue(videoUrl)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
            <Card className="w-full border-none p-6 bg-gradient-to-br from-slate-950 to-cyan-800 bg-opacity-30 backdrop-blur-md text-cyan-300 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Queue</h2>
              <ScrollArea className="max-h-[480px] pr-4 pl-4">
                <div className="space-y-4">
                  {queueItems.map((item) => (
                    <Card
                      key={item.id}
                      className="p-4"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{item.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {item.upvotes}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() => handleLike(item.id)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        ) : (
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-[160px] lg:pb-6 min-w-0">
            {currentSong && (
              <div className="flex flex-col gap-8">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    currentSong.url.split("?v=")[1]
                  }?autoplay=1`}
                  allow="autoplay; encrypted-media"
                  className="h-[200px] md:h-[400px] w-full"
                ></iframe>
                <h1 className="text-white text-xl font-semibold mb-1 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {currentSong.title}
                </h1>
              </div>
            )}
            <div className="mt-8">
              <h4 className="text-white font-medium mb-4">Queue</h4>
              <div className="space-y-4">
                {playlists.map((playlist) => (
                  <div>
                    <PlaylistDropdown
                      key={playlist.id}
                      playlist={playlist}
                      playlists={playlists}
                      setPlaylists={setPlaylists}
                      setCurrentSong={setCurrentSong}
                    />
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
