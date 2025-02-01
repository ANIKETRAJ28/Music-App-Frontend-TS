import { allPlaylists } from "@/store/allPlaylist";
import { getDefaultPlaylist } from "@/store/defaultPlaylist";
import { AppDispatch } from "@/store/store";
import { IPlaylist } from "@/types";
import { toast } from "./use-toast";

export async function SetPlaylist(
  tab: string,
  id: string,
  dispatch: AppDispatch,
  playlists: IPlaylist[],
  setPlaylists: (playlists: IPlaylist[]) => void
) {
  try {
    if (tab === "home") {
      const response = await dispatch(getDefaultPlaylist(id));
      if (playlists.length === 0) {
        setPlaylists([response.payload]);
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
}
