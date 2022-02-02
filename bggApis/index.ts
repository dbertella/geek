import XML2JS from "xml2js";
import gameDataConversions from "./gameFormatter";
import { Game } from "./types";

export const THING_ITEMS_ENDPOINT =
  "https://boardgamegeek.com/xmlapi2/thing?stats=1&id=";
export const COLLECTION_ENDPOINT =
  "https://api.geekdo.com/xmlapi2/collection?own=1&stats=1&excludesubtype=boardgameexpansion&username=";

/*******************************
New function to call setTimeout otherwise recursiveFetchAndWait() would be run again
when you pass it to the default JS setTimeout function because it has a parameter.
********************************/
export const setTimeoutAsCallback = (callback: any) => {
  setTimeout(callback, 5000);
};

export const recursiveFetchAndWait = async (url: string) => {
  let data: string = "";
  let gameList: Game[] = [];

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      // Checking for response code 200
      data = await response.text();
    } else if (response.status === 202) {
      // If the status response was 202 (API still retrieving data), call the fetch again after a set timeout
      setTimeoutAsCallback(() => recursiveFetchAndWait(url));
    }
  } catch (e) {}

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

  if (numGames > 0 && numGames <= 1200) {
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
