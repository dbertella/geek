import XML2JS from "xml2js";
import gameDataConversions from "./gameFormatter";
import { Plays } from "./playsTypes";
import { Game } from "./types";

export const THING_ITEMS_ENDPOINT =
  "https://boardgamegeek.com/xmlapi2/thing?stats=1&id=";
export const COLLECTION_ENDPOINT =
  "https://api.geekdo.com/xmlapi2/collection?own=1&stats=1&excludesubtype=boardgameexpansion&username=";
export const PLAYS_ENDPOINT = "https://api.geekdo.com/xmlapi2/plays?username=";
export const BUDDIES_ENDPOINT =
  "https://api.geekdo.com/xmlapi2/user?buddies=1&name=";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getDataRecursively(url: string): Promise<string> {
  const response = await fetch(url);

  const hasToCallAgain = response.status === 202;

  if (!hasToCallAgain) {
    return response.text();
  }

  await delay(5000);
  const callAgainResult = await getDataRecursively(url);

  return callAgainResult;
}

export const getBggData = async <T extends any>(url: string) => {
  const data: string = await getDataRecursively(url);
  let parsedData;
  XML2JS.parseString(data, (err, result) => {
    parsedData = result;
  });
  return parsedData as T;
};

const gameThingData = async (gameIds: string[], arrayOfArrays: string[][]) => {
  let gameList: Game[] = [];

  if (arrayOfArrays.length === 0) {
    const collectionResponse = await fetch(
      THING_ITEMS_ENDPOINT + gameIds.join()
    );
    const xml = await collectionResponse.text();

    XML2JS.parseString(xml, (err, result) => {
      gameDataConversions(result.items.item);
      gameList = gameList.concat(result.items.item);
    });
  } else {
    // For collections >1200 games Need to handle this case
    arrayOfArrays.forEach((array) => {
      fetch(THING_ITEMS_ENDPOINT + array.join())
        .then((response) => response.text())
        .then((xml) => {
          XML2JS.parseString(xml, (err, result) => {
            gameDataConversions(result.items.item);
            gameList = gameList.concat(result.items.item);
          });
        });
    });
  }

  return gameList;
};

export const getPlays = async <T extends any>(url: string) => {
  const data: string = await getDataRecursively(url);
  let parsedData = { plays: {} } as { plays: Plays };
  let arrayOfArrays: string[][] = [];

  XML2JS.parseString(data, (err, result) => {
    parsedData = result;
  });

  const gameIdSet = new Set<string>();
  parsedData?.plays?.play?.forEach((play) => {
    gameIdSet.add(play.item[0].$.objectid);
  });

  // @ts-expect-error can't spread a set
  const gameIds = [...gameIdSet];

  if (gameIds.length > 1200) {
    while (gameIds.length) {
      arrayOfArrays.push(gameIds.splice(0, 1200)); // Splitting gameIds into arrays of max length 1200
    }
  }
  const gameList = await gameThingData(gameIds, arrayOfArrays);

  return {
    ...parsedData,
    gameData: Object.fromEntries(gameList.map((game) => [game.$.id, game])),
  } as T;
};

export const recursiveFetchAndWait = async (url: string) => {
  let data: string = await getDataRecursively(url);

  let numGames = 0;
  let gameIds: string[] = [];
  let arrayOfArrays: string[][] = [];

  XML2JS.parseString(data, (err, result) => {
    // xml2js: converts XML to JSON
    if (result?.items?.$?.totalitems !== "0") {
      // Only processing further if there are returned results
      numGames = Number(result?.items?.$?.totalitems);

      result?.items?.item?.forEach((game: { $: { objectid: string } }) => {
        gameIds.push(game.$.objectid);
      });
    }

    if (numGames > 1200) {
      // Thing Items endpoint can't handle more then 1200 requests at once, so need to split it up into multiple arrays
      while (gameIds.length) {
        arrayOfArrays.push(gameIds.splice(0, 1200)); // Splitting gameIds into arrays of max length 1200
      }
    }
  });

  return gameThingData(gameIds, arrayOfArrays);
};
