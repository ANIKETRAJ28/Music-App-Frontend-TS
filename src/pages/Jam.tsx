import { BottomBar } from "@/components/BottomBar";
import { Sidebar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { ISong } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Share2, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { joinJam, leaveJam } from "@/store/jam";

export function JamPage() {
  const socket = io("http://localhost:3000", { withCredentials: true });
  const dispatch = useDispatch();
  const { user, sidebar } = useSelector((state: RootState) => state);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [joiningJamUrl, setJoiningJamUrl] = useState<string>("");
  const [queueItems, setQueueItems] = useState<(ISong & { upvotes: string })[]>(
    []
  );
  const [joiningJam, setJoiningJam] = useState<boolean>(false);
  const { joinedJam } = useSelector((state: RootState) => state.joinJam);

  useEffect(() => {
    if (joinedJam) {
      socket.emit("start jam", joinedJam);
      socket.emit("get jam", joinedJam);
    }
  }, []);

  useEffect(() => {
    socket.on("get jam", (data) => {
      setQueueItems(data.jam);
    });
  }, []);

  useEffect(() => {
    socket.on("song added", (data: ISong & { upvotes: string }) => {
      setQueueItems((prevQueueItems) => [...prevQueueItems, data]);
    });
    return () => {
      socket.off("song added");
    };
  }, []);

  function createJam(id: string) {
    socket.emit("start jam", id);
    dispatch(joinJam(id));
  }

  function addSongToQueue(id: string, url: string) {
    socket.emit("add song", id, url);
    setVideoUrl("");
  }

  return (
    <div className="flex h-full">
      <div
        className={cn(
          `fixed left-0 top-0 h-screen hidden lg:flex flex-col lg:flex-row bg-gray-900 backdrop-blur-lg transition-all duration-300 shrink-0" ${
            sidebar ? "w-fit" : "w-[70px]"
          }`
        )}
      >
        <Sidebar
          className="text-white"
          name={user.name as string}
          avatar={user.avatar as string}
        />
      </div>
      <div className={`${sidebar ? "lg:ml-[150px]" : "lg:ml-[70px]"} w-full`}>
        <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none p-6 bg-gradient-to-br from-cyan-800 to-slate-950 bg-opacity-30 backdrop-blur-md text-cyan-300 shadow-md">
            <div className="space-y-6">
              <div>
                <div className="flex gap-2">
                  {!joinedJam &&
                    (joiningJam ? (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter Jam Id..."
                          value={joiningJamUrl}
                          onChange={(e) => setJoiningJamUrl(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            createJam(joiningJamUrl);
                            setJoiningJamUrl("");
                            setJoiningJam(false);
                          }}
                        >
                          Join
                        </Button>
                        <Button onClick={() => setJoiningJam(!joiningJam)}>
                          Close
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={() => createJam(user.id as string)}>
                          Create Jam
                        </Button>
                        <Button
                          onClick={() => {
                            setJoiningJam(!joiningJam);
                          }}
                        >
                          Join Jam
                        </Button>
                      </div>
                    ))}
                  {joinedJam && (
                    <Button
                      onClick={() => {
                        socket.emit("leave jam", joinedJam);
                        dispatch(leaveJam());
                      }}
                    >
                      Leave
                    </Button>
                  )}
                  {joinedJam && joinedJam === user.id && (
                    <Button>
                      Share <Share2 className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-gray-900 backdrop-blur-lg aspect-video rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Video Preview</p>
                </div>
              </div>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  addSongToQueue(joinedJam as string, videoUrl);
                }}
              >
                <div className="flex gap-2">
                  {joinedJam && (
                    <div className="w-full flex gap-2">
                      <Input
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Enter video URL..."
                        className="flex-1"
                      />
                      <Button type="submit">
                        <Send className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </Card>
          <Card className="w-full border-none p-6 bg-gradient-to-br from-slate-950 to-cyan-800 bg-opacity-30 backdrop-blur-md text-cyan-300 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Queue</h2>
            <ScrollArea className="h-[480px] pr-4 pl-4">
              <div className="space-y-4">
                {queueItems.map((item) => (
                  <div
                    // onClick={() => setCurrentSong(song)}
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-slate-900 rounded-md hover:bg-slate-950 transition-colors"
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <p className="text-lg font-medium">{item.upvotes}</p>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-15 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
