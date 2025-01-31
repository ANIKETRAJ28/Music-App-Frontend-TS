import { cn } from "@/lib/utils";
import { Home, Library, AudioLines, Music2, CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useState } from "react";

interface BottomBarProps {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
}

export function BottomBar({ selectedTab, setSelectedTab }: BottomBarProps) {
  // const [selectedTab, setSelectedTab] = useState("home");
  return (
    <div className="lg:hidden fixed bottom-0 z-10 bg-black text-white flex w-full px-2 py-4 justify-between">
      <Music2 className="h-8 w-8" />
      <Button
        variant={selectedTab === "home" ? "default" : "ghost"}
        size="default"
        onClick={() => setSelectedTab("home")}
      >
        <Home />
      </Button>
      <Button
        variant={selectedTab === "library" ? "default" : "ghost"}
        size="default"
        onClick={() => setSelectedTab("library")}
      >
        <Library />
      </Button>
      <Button
        variant={selectedTab === "jam" ? "default" : "ghost"}
        size="default"
        onClick={() => setSelectedTab("jam")}
      >
        <AudioLines className={cn("h-4 w-4")} />
      </Button>
      <CircleUser className="h-8 w-8" />
    </div>
  );
}
