export interface ISong {
  id: string;
  url: string;
}

export interface IPlaylist {
  id: string;
  name: string;
  userId: string;
  songs: ISong[];
}

export interface IUser {
  id: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  defaultPlaylist: IPlaylist | null;
}
