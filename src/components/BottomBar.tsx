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
import { useState } from "react";

export function BottomBar() {
  const [selectedTab, setSelectedTab] = useState("home");
  return (
    <div className="lg:hidden fixed bottom-0 bg-black/90 text-white flex w-full px-2 py-4 justify-between">
      <Music2 className="h-8 w-8" />
      <Button
        variant={selectedTab === "home" ? "default" : "ghost"}
        size="default"
        onClick={() => setSelectedTab("home")}
      >
        <Home />
      </Button>
      <Button
        variant={selectedTab === "search" ? "default" : "ghost"}
        size="default"
        onClick={() => setSelectedTab("search")}
      >
        <Search />
      </Button>
      <Button
        variant={selectedTab === "library" ? "default" : "ghost"}
        size="default"
        onClick={() => setSelectedTab("library")}
      >
        <Library />
      </Button>
      <Button
        variant={selectedTab === "queue" ? "default" : "ghost"}
        size="default"
        onClick={() => setSelectedTab("queue")}
      >
        <ListOrdered className={cn("h-4 w-4")} />
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
