import { PlayerEntity } from "./playsTypes";

const BGGLOGIN_URL = "https://boardgamegeek.com/login/api/v1";
export const BGGUPLOAD_URL = "https://boardgamegeek.com/geekplay.php";

type Player =
  | {
      name: string;
      username: string;
      userid: number;
      avatarfile: string;
      avatar: boolean;
      selected: boolean;
      new: boolean;
    }
  | {
      name: string;
      username: string;
      disambiguator: number;
      selected: boolean;
      new: boolean;
      win: boolean;
    };

type Game = {
  quantity: number;
  date: string;
  twitter: boolean;
  location: string;
  locationfilter: string;
  userfilter: string;
  objecttype: string;
  objectid: string;
  playdate: string;
  length: number;
  ajax: number;
  action: string;
  players: Player[];
};

const _kGameResultBodyTemplate = {
  ajax: 1,
  objecttype: "thing",
  action: "save",
  quantity: 1,
  length: 0,
};

export const loginToBgg = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  // login into BGG
  const loginResponse = await fetch(BGGLOGIN_URL, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      credentials: {
        username,
        password,
      },
    }),
  });

  // setup session cookie
  // "bggusername=USERNAME; bggpassword=PASSWORDHASH; SessionID=SESSIONID;"

  let sessionCookie = "";
  console.log({
    cookies: loginResponse.headers.get("set-cookie")?.split(";"),
  });

  const cookies = loginResponse.headers.get("set-cookie")?.split(";") ?? [];

  const returnCookies = {} as {
    bggusername: string;
    bggpassword: string;
    SessionID: string;
  };
  cookies.forEach((cookie) => {
    if (cookie.startsWith("bggusername")) {
      returnCookies.bggusername = cookie.substring(12);
    }
    var idx = cookie.indexOf("bggpassword=");
    if (idx !== -1 && !cookie.includes("deleted")) {
      returnCookies.bggpassword = cookie.substring(idx + 12);
    }
    idx = cookie.indexOf("SessionID=");
    if (idx !== -1) {
      returnCookies.SessionID = cookie.substring(idx + 10);
    }
  });
  return returnCookies;
};

export const uploadToBgg = async ({
  sessionCookie,
  gameId,
  playdate,
  players,
  location,
  playid,
}: {
  sessionCookie: string;
  gameId: string;
  playdate: string;
  players: PlayerEntity[];
  location: string;
  playid?: string;
}) => {
  const now = new Date();

  const gameResultBody = {
    ..._kGameResultBodyTemplate,
    objectid: gameId,
    playdate,
    date: now.toISOString(),
    location,
    players: players.map((player) => player.$),
    playid,
  };

  const response = await fetch(BGGUPLOAD_URL, {
    headers: {
      cookie: sessionCookie,
      "Content-Type": "application/json;charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify(gameResultBody),
  });

  const uploadResponse = await response.json();

  console.log({ uploadResponse, gameResultBody });

  return uploadResponse;
};

export const deletePlay = async ({
  sessionCookie,
  playid,
}: {
  sessionCookie: string;
  playid: string;
}) => {
  try {
    const response = await fetch(BGGUPLOAD_URL, {
      headers: {
        cookie: sessionCookie,
        "Content-Type": "application/json;charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
        playid,
        action: "delete",
        finalize: 1,
        B1: "Yes",
      }),
    });

    console.log({ response });
    return {};
  } catch (error) {
    return { error };
  }
};
