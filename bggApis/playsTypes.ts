export interface Plays {
  $: $;
  play: PlayEntity[];
}
export interface $ {
  username: string;
  userid: string;
  total: string;
  page: string;
  termsofuse: string;
}
export interface PlayEntity {
  $: $1;
  item: ItemEntity[];
  comments: string[];
  players: PlayersEntity[];
}
export interface $1 {
  id: string;
  date: string;
  quantity: string;
  length: string;
  incomplete: string;
  nowinstats: string;
  location: string;
}
export interface ItemEntity {
  $: $2;
  subtypes: SubtypesEntity[];
}
export interface $2 {
  name: string;
  objecttype: string;
  objectid: string;
}
export interface SubtypesEntity {
  subtype: SubtypeEntity[];
}
export interface SubtypeEntity {
  $: $3;
}
export interface $3 {
  value: string;
}
export interface PlayersEntity {
  player: PlayerEntity[];
}
export interface PlayerEntity {
  $: $4;
}
export interface $4 {
  username: string;
  userid: string;
  name: string;
  startposition: string;
  color: string;
  score: string;
  new: string;
  rating: string;
  win: string;
}
