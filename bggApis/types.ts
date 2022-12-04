export interface Game {
  $: $;
  thumbnail: string[];
  image: string[];
  name: NameEntity[];
  description: string[];
  yearpublished: ValueEntity[];
  minplayers: MinplayersEntityOrMaxplayersEntityOrMaxplaytimeEntity[];
  maxplayers: MinplayersEntityOrMaxplayersEntityOrMaxplaytimeEntity[];
  poll: PollEntity[];
  playingtime: ValueEntity[];
  minplaytime: ValueEntity[];
  maxplaytime: MinplayersEntityOrMaxplayersEntityOrMaxplaytimeEntity[];
  minage: ValueEntity[];
  link: LinkEntity[];
  statistics: StatisticsEntity[];
}
export interface $ {
  type: string;
  id: string;
}
export interface NameEntity {
  $: $1;
}
export interface $1 {
  type: string;
  sortindex: string;
  value: string;
}
export interface ValueEntity {
  $: $2;
}
export interface $2 {
  value: string;
}
export interface MinplayersEntityOrMaxplayersEntityOrMaxplaytimeEntity {
  $: $3;
}
export interface $3 {
  value: number;
}
export interface PollEntity {
  $: $4;
  results: ResultsEntity[];
}
export interface $4 {
  name: string;
  title: string;
  totalvotes: string;
}
export interface ResultsEntity {
  $: $5;
  result: ResultEntity[];
}
export interface $5 {
  numplayers: string;
}
export interface ResultEntity {
  $: $6;
}
export interface $6 {
  value: string;
  numvotes: string;
  level: string;
}
export interface LinkEntity {
  $: $7;
}
export interface $7 {
  type: string;
  id: string;
  value: string;
}
export interface StatisticsEntity {
  $: $8;
  ratings: RatingsEntity[];
}
export interface $8 {
  page: string;
}
export interface RatingsEntity {
  usersrated: ValueEntity[];
  average: ValueEntity[];
  bayesaverage: ValueEntity[];
  ranks: RanksEntity[];
  stddev: ValueEntity[];
  median: ValueEntity[];
  owned: ValueEntity[];
  trading: ValueEntity[];
  wanting: ValueEntity[];
  wishing: ValueEntity[];
  numcomments: ValueEntity[];
  numweights: ValueEntity[];
  averageweight: ValueEntity[];
}
export interface RanksEntity {
  rank: RankEntity[];
}
export interface RankEntity {
  $: $9;
}
export interface $9 {
  type: string;
  id: string;
  name: string;
  friendlyname: string;
  value: string;
  bayesaverage: string;
}
