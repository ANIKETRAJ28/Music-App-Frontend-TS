import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
import { ISong } from "@/types";
import {
  Play,
  SkipBack,
  SkipForward,
  // Volume2,
  // Shuffle,
  // Repeat,
} from "lucide-react";

interface MusicPlayerProps {
  currentSong: ISong;
  queue: ISong[];
  isMobile?: boolean;
}

export function MusicPlayer({
  currentSong,
  queue,
  isMobile = false,
}: MusicPlayerProps) {
  if (isMobile) {
    return (
      <div className="flex items-center space-x-4">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-12 h-12 rounded-md"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{currentSong.title}</p>
          <p className="text-white/70 text-sm truncate">{currentSong.artist}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
          >
            <Play className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Current Song Info */}
      {/* <div className="flex-1">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-full aspect-square rounded-lg mb-4 object-cover"
        />
        <h3 className="text-white text-xl font-semibold mb-1">
          {currentSong.title}
        </h3>
        <p className="text-white/70">{currentSong.artist}</p>
      </div> */}

      {/* Controls */}
      {/* <div className="space-y-6">
        <div className="space-y-2">
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-white/70">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white"
          >
            <Shuffle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 bg-white text-black hover:bg-white/90"
          >
            <Play className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white"
          >
            <Repeat className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="h-5 w-5 text-white/70" />
          <Slider
            defaultValue={[75]}
            max={100}
            step={1}
            className="w-28"
          />
        </div>
      </div> */}

      {/* Queue */}
      <div className="mt-8">
        <h4 className="text-white font-medium mb-4">Queue</h4>
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
    </div>
  );
}
