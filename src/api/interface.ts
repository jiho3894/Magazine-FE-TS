export interface IProfile {
  id: number;
  email: string;
  first_name: string;
  avatar: string;
  last_name?: string;
}

export interface getProfile {
  data: {
    data: IProfile[];
  };
}

export interface getDetail {
  data: {
    id: number;
    email: string;
    first_name: string;
    avatar: string;
    last_name?: string;
  };
}
