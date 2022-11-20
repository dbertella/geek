import { PlayerEntity } from "./playsTypes";

const BGGLOGIN_URL = "https://boardgamegeek.com/login/api/v1";
const BGGUPLOAD_URL = "https://boardgamegeek.com/geekplay.php";

enum UploadResult {
  Success = "Success",
  UsernamePassword = "UsernamePassword",
  NetworkError = "NetworkError",
  ServerError = "ServerError",
}

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

  cookies.forEach((cookie) => {
    if (cookie.startsWith("bggusername")) {
      sessionCookie += (cookie.length > 0 ? " " : "") + cookie + ";";
    }
    var idx = cookie.indexOf("bggpassword=");
    if (idx !== -1) {
      sessionCookie +=
        (cookie.length > 0 ? " " : "") +
        "bggpassword=" +
        cookie.substring(idx + 12) +
        ";";
    }
    idx = cookie.indexOf("SessionID=");
    if (idx !== -1) {
      sessionCookie +=
        (cookie.length > 0 ? " " : "") +
        "SessionID=" +
        cookie.substring(idx + 10) +
        ";";
    }
  });
  return sessionCookie;
};

export const uploadToBgg = async ({
  sessionCookie,
  gameId,
  playdate,
  players,
  location,
}: {
  sessionCookie: string;
  gameId: string;
  playdate: string;
  players: PlayerEntity[];
  location: string;
}) => {
  try {
    // setup body
    const now = new Date();

    console.log({ now, sessionCookie, gameId, playdate, players, location });

    const gameResultBody = {
      ..._kGameResultBodyTemplate,
      objectid: gameId,
      playdate,
      date: now.toISOString(),
      location,
      players: players.map((player) => player.$),
    };

    const uploadResponse = await fetch(BGGUPLOAD_URL, {
      headers: {
        cookie: sessionCookie,
        "Content-Type": "application/json;charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(gameResultBody),
    }).then((r) => r.json);

    console.log(UploadResult.Success);
    return uploadResponse;
  } catch (e) {
    console.log(e, UploadResult.ServerError);
  }
};
