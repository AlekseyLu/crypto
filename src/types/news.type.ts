export interface INews {
  id: string;
  searchKeyWords: string[];
  feedDate: number;
  source: string;
  title: string;
  sourceLink: string;
  isFeatured: boolean;
  imgUrl: string;
  reactionsCount: unknown;
  reactions: [];
  shareURL: string;
  relatedCoins: string[];
  content: boolean;
  link: string;
  bigImg: boolean;
}
