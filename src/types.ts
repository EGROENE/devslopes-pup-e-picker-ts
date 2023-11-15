export interface Dog {
  name: string;
  image: string;
  description: string;
  isFavorite?: boolean;
  id: number;
}

export type Tab = "all-dogs" | "fav-dogs" | "unfav-dogs" | "create-dog";
