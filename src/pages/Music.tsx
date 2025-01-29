import { useEffect, useState } from "react";
import { Sidebar } from "@/components/SideBar";
import { IPlaylist, ISong } from "@/types";
import { Button } from "@/components/ui/button";
import { Play, SkipBack, SkipForward, ThumbsUp, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { BottomBar } from "@/components/BottomBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { getDefaultPlaylist } from "@/store/defaultPlaylist";
import { toast } from "@/hooks/use-toast";
import { allPlaylists } from "@/store/allPlaylist";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PlaylistDropdown } from "@/components/PlaylistDropdown";

export function MusicPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedTab, setSelectedTab] = useState("home");
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [currentSong, setCurrentSong] = useState<ISong | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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
        // setCurrentSong(response.payload.songs[0]);
      } else {
        const response = await dispatch(allPlaylists());
        setPlaylists(response.payload);
        // setCurrentSong(playlists[0].songs[0]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.error(error);
      toast({ title: error, variant: "destructive" });
      return null;
    }
  };

  useEffect(() => {
    if (!user.id) {
      navigate("/");
      return;
    }
    Playlist(selectedTab);
  }, [selectedTab]);

  return (
    <div className="h-screen bg-gradient-to-br from-cyan-950 to-black">
      <div className="flex flex-row h-full">
        {/* Expandable Sidebar for larger screens */}
        <div
          className={cn(
            `hidden lg:flex flex-col lg:flex-row bg-gray-900 backdrop-blur-lg transition-all duration-300 shrink-0" ${
              sidebarExpanded ? "w-fit" : "w-[70px]"
            }`
          )}
        >
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-[-20px] lg:flex bg-black/90 rounded-full z-50"
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
          >
            {sidebarExpanded ? (
              <ChevronLeft className="h-4 w-4 text-white" />
            ) : (
              <ChevronRight className="h-4 w-4 text-white" />
            )}
          </Button> */}
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
        <BottomBar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-[160px] lg:pb-6 min-w-0">
          {/* <div className="rounded-lg bg-black/20 backdrop-blur-lg p-4 lg:p-6 max-w-[1600px] mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">
              Welcome to AniPlay
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {[...mockPlaylists, ...mockPlaylists, ...mockPlaylists].map(
                (playlist, index) => (
                  <div
                    key={`${playlist.id}-${index}`}
                    className="p-4 rounded-lg bg-emerald-900/30 hover:bg-emerald-900/40 transition-colors cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {playlist.name}
                    </h3>
                    <p className="text-sm text-white/70">
                      {playlist.songs.length} songs
                    </p>
                  </div>
                )
              )}
            </div>
          </div> */}
          {/* Current Song Info */}
          {currentSong && (
            <div>
              <div className="flex flex-col md:flex-row md:gap-5">
                <img
                  src={currentSong.thumbnail}
                  alt={currentSong.title}
                  className="md:w-[50%] md:h-[50%] w-full rounded-lg mb-4 object-cover"
                />
                <div className="w-full flex flex-col my-4 mr-4">
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-1">
                      {currentSong.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4 mt-12 mb-4">
                    <div className="w-full flex items-center justify-between space-x-2">
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white"
                        >
                          <SkipBack className="h-5 w-5  text-teal-800" />
                        </Button>
                        <Button
                          variant="default"
                          size="icon"
                          className="bg-white/90 hover:bg-white/90"
                        >
                          <Play className="h-6 w-6 text-teal-800" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white"
                        >
                          <SkipForward className="h-5 w-5 text-teal-800" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-5 w-5 text-teal-800" />
                        <Slider
                          defaultValue={[75]}
                          max={100}
                          step={1}
                          className="w-20 bg-white/20 rounded-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Controls */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Slider
                        defaultValue={[30]}
                        max={100}
                        step={1}
                        className="w-full bg-white/20 rounded-sm"
                      />
                      <div className="flex justify-between text-xs text-white/70">
                        <span>1:23</span>
                        <span>3:45</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-8">
            <h4 className="text-white font-medium mb-4">Queue</h4>
            <div className="space-y-4">
              {/* {queue.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center space-x-3"
                >
                  <ThumbsUp className="text-teal-300" />
                  <img
                    src={
                      "https://i.ytimg.com/vi/iN8LTxG4jE0/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLDsZpPdu6XPDoCTZqBZ7wvT-Ko42Q"
                    }
                    alt={song.title}
                    className="w-20 rounded-md"
                  />
                  <div>
                    <p className="text-white font-medium">{song.title}</p>
                    <p className="text-white/70 text-sm">{song.artist}</p>
                  </div>
                </div>
              ))} */}
              {playlists.map((playlist) => (
                <div>
                  <PlaylistDropdown
                    key={playlist.id}
                    {...playlist}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Music Player (Desktop) */}
        {/* <div className="hidden lg:block w-[350px] bg-black/90 backdrop-blur-lg shrink-0">
          <MusicPlayer
            currentSong={currentSong}
            queue={queue}
          />
        </div> */}

        {/* Bottom Navigation and Player (Mobile) */}
        {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10"> */}
        {/* Music Player */}
        {/* <div className="p-4 border-b border-white/10">
            <MusicPlayer
              currentSong={currentSong}
              queue={queue}
              isMobile
            />
          </div> */}
        {/* Navigation */}
        {/* <nav className="grid grid-cols-4 p-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto text-white"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto text-white"
            >
              <Search className="h-6 w-6" />
              <span className="text-xs">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto text-white"
            >
              <Library className="h-6 w-6" />
              <span className="text-xs">Library</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto text-white"
              onClick={() => setQueueVisible(!queueVisible)}
            >
              <List className="h-6 w-6" />
              <span className="text-xs">Queue</span>
            </Button>
          </nav> */}
        {/* </div> */}

        {/* Mobile Queue Drawer */}
        {/* <div
          className={cn(
            "lg:hidden fixed bottom-[144px] left-0 right-0 bg-black/90 backdrop-blur-lg transition-transform duration-300 max-h-[60vh] overflow-y-auto",
            queueVisible ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Queue</h3>
            <div className="space-y-4">
              {queue.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center space-x-3"
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-12 h-12 rounded-md"
                  />
                  <div>
                    <p className="text-white font-medium">{song.title}</p>
                    <p className="text-white/70 text-sm">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
