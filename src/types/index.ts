export interface ISong {
  id: string;
  url: string;
  title?: string;
  artist?: string;
  album?: string;
  cover?: string;
}

export interface IPlaylist {
  id: string;
  name: string;
  userId: string;
  songs: ISong[];
}

export interface IUser {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  avatar: string;
  defaultPlaylist: IPlaylist | null;
}
