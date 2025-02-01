import { useEffect, useState } from "react";
import { IPlaylist, ISong } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { PlaylistDropdown } from "@/components/PlaylistDropdown";
import { SetPlaylist } from "@/hooks/SetPlaylist";
import { BottomBar } from "@/components/BottomBar";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/SideBar";

export function LibraryPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user, sidebar } = useSelector((state: RootState) => state);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [currentSong, setCurrentSong] = useState<ISong | null>(null);
  const selectedTab = location.pathname.split("/")[1];

  useEffect(() => {
    if (!user.id) {
      navigate("/");
      return;
    }
    SetPlaylist(
      selectedTab,
      user.id as string,
      dispatch,
      playlists,
      setPlaylists
    );
  }, []);

  return (
    <div className="flex h-full">
      <div
        className={cn(
          `fixed left-0 top-0 h-screen hidden lg:flex flex-col lg:flex-row bg-gray-900 backdrop-blur-lg transition-all duration-300 shrink-0" ${
            sidebar.isOpen ? "w-fit" : "w-[70px]"
          }`
        )}
      >
        <Sidebar
          className="text-white"
          name={user.name as string}
          avatar={user.avatar as string}
        />
      </div>
      <div
        className={`${
          sidebar.isOpen ? "lg:ml-[150px]" : "lg:ml-[70px]"
        } w-full`}
      >
        <main className="flex-1 overflow-y-auto p-4 min-w-0">
          {currentSong ? (
            <div className="flex flex-col gap-8">
              <iframe
                src={`https://www.youtube.com/embed/${
                  currentSong.url.split("?v=")[1]
                }?autoplay=1`}
                allow="autoplay; encrypted-media"
                className="h-[200px] md:h-[400px]"
              ></iframe>
              <h1 className="text-white text-xl font-semibold mb-1 overflow-ellipsis overflow-hidden whitespace-nowrap">
                {currentSong.title}
              </h1>
            </div>
          ) : (
            <div className="bg-gray-900 backdrop-blur-lg rounded-lg h-[200px] md:h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Video Preview</p>
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
      </div>
      <BottomBar />
    </div>
  );
}
