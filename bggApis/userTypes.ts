export interface User {
  $: GeneratedType;
  firstname: Firstname[];
  lastname: Lastname[];
  avatarlink: Avatarlink[];
  yearregistered: Yearregistered[];
  lastlogin: Lastlogin[];
  stateorprovince: Stateorprovince[];
  country: Country[];
  webaddress: Webaddress[];
  xboxaccount: Xboxaccount[];
  wiiaccount: Wiiaccount[];
  psnaccount: Psnaccount[];
  battlenetaccount: Battlenetaccount[];
  steamaccount: Steamaccount[];
  traderating: Traderating[];
  marketrating: Marketrating[];
  buddies: Buddy[];
}

interface GeneratedType {
  id: string;
  name: string;
  termsofuse: string;
}

interface Value {
  value: string;
}

interface Firstname {
  $: Value;
}

interface Lastname {
  $: Value;
}

interface Avatarlink {
  $: Value;
}

interface Yearregistered {
  $: Value;
}

interface Lastlogin {
  $: Value;
}

interface Stateorprovince {
  $: Value;
}

interface Country {
  $: Value;
}

interface Webaddress {
  $: Value;
}

interface Xboxaccount {
  $: Value;
}

interface Wiiaccount {
  $: Value;
}

interface Psnaccount {
  $: Value;
}

interface Battlenetaccount {
  $: Value;
}

interface Steamaccount {
  $: Value;
}

interface Traderating {
  $: Value;
}

interface Marketrating {
  $: Value;
}

interface Buddy {
  $: GeneratedType17;
  buddy: Buddy2[];
}

interface GeneratedType17 {
  total: string;
  page: string;
}

interface Buddy2 {
  $: GeneratedType18;
}

interface GeneratedType18 {
  id: string;
  name: string;
}
