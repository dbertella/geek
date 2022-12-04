import { CopyIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import Cookies from "cookies";
import dayjs from "dayjs";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { getPlays, PLAYS_ENDPOINT } from "../../bggApis";
import { Plays, PlayerEntity } from "../../bggApis/playsTypes";
import { Game } from "../../bggApis/types";
import {
  Button,
  Flex,
  Heading,
  Layout,
  NavBar,
  Text,
  TextField,
} from "../../components";
import { Popup } from "../../components/Dialog";
import { GameHeader } from "../../components/GameHeader";

const fetcher = (body: {
  sessionCookie: string;
  gameId: string;
  playdate: string;
  players: PlayerEntity[];
  location: string;
  playid?: string;
}) => {
  return fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const onDelete = (body: { sessionCookie: string; playid: string }) => {
  return fetch("/api/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const Collection: NextPage<{
  plays: Plays;
  gameData: Record<string, Game>;
  slug: string;
  sessionCookie: string;
  loggedInUser: string;
}> = ({ plays, gameData, slug, sessionCookie, loggedInUser }) => {
  const title = `Plays - ${slug}`;
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  React.useEffect(() => {
    setIsRefreshing(false);
  }, [plays]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated from bgg apis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading>{title}</Heading>
        <Heading variant="h6">Total Plays: {plays.$.total}</Heading>
        {plays.play?.map((d) => (
          <Flex
            key={d.$.id + "d"}
            gap="2"
            direction="column"
            css={{ borderBottom: "1px solid $gray10", pb: "$2" }}
          >
            <Flex justify="between">
              <Text size="2" color="gray10">
                {d.$.location}
              </Text>
              <Text size="2" color="gray10">
                {dayjs(d.$.date).format("ddd DD MMM YY")}
              </Text>
            </Flex>

            {sessionCookie && (
              <Flex>
                <Popup
                  title="Clone this play"
                  trigger={
                    <Button>
                      <CopyIcon aria-label="Clone this play" />
                      <Text css={{ ml: 2 }}>Clone</Text>
                    </Button>
                  }
                >
                  <Button
                    disabled={isRefreshing}
                    onClick={() => {
                      fetcher({
                        sessionCookie,
                        gameId: d.item[0].$.objectid,
                        players: d.players?.[0]?.player ?? [],
                        location: d.$.location,
                        playdate: d.$.date,
                      }).then(() => refreshData());
                    }}
                  >
                    <CopyIcon aria-label="Clone this play" />
                    <Text css={{ ml: 2 }}>Ok</Text>
                  </Button>
                </Popup>
                {slug.toUpperCase() === loggedInUser.toUpperCase() && (
                  <>
                    <Button
                      onClick={() =>
                        fetcher({
                          sessionCookie,
                          playid: d.$.id,
                          gameId: d.item[0].$.objectid,
                          players: d.players?.[0]?.player ?? [],
                          location: d.$.location,
                          playdate: d.$.date,
                        })
                      }
                    >
                      <Pencil2Icon aria-label="Update this play" />
                      <Text css={{ ml: 2 }}>Update</Text>
                    </Button>
                    <Button
                      disabled={isRefreshing}
                      onClick={() => {
                        onDelete({
                          sessionCookie,
                          playid: d.$.id,
                        }).then(() => refreshData());
                      }}
                    >
                      <Cross2Icon aria-label="Delete this play" />
                      <Text css={{ ml: 2 }}>Delete</Text>
                    </Button>
                  </>
                )}
              </Flex>
            )}

            {d.item.map((game) => (
              <Fragment key={game.$.objectid + "c"}>
                <GameHeader
                  rating={
                    gameData[game.$.objectid].statistics[0].ratings[0].ranks[0]
                      .rank[0].$.value
                  }
                  thumbnail={gameData[game.$.objectid].thumbnail[0]}
                />
                <Heading variant="h5">
                  {game.$.name}
                  {Number(d.$.quantity) > 1 && <Text> x{d.$.quantity}</Text>}
                </Heading>
              </Fragment>
            ))}
            <Flex direction="column" gap="2">
              {d?.players?.map(({ player }) =>
                player.map((p, i) => (
                  <Flex
                    key={p.$.userid + i || p.$.name + i}
                    gap="2"
                    align="center"
                  >
                    <Text>
                      <Text variant="number"># {++i}</Text> - {p.$.name}
                    </Text>
                    {p.$.username && (
                      <Text>
                        (
                        <Link
                          href={{
                            pathname: "/[slug]/collection",
                            query: { slug: p.$.username },
                          }}
                          passHref
                        >
                          <Text css={{ color: "$blue" }}>{p.$.username}</Text>
                        </Link>
                        )
                      </Text>
                    )}
                    {!!Number(p.$.rating) && <Text>Rating: {p.$.rating}</Text>}
                    {!!Number(p.$.score) && <Text>Score: {p.$.score}</Text>}
                    {!!Number(p.$.win) && <Text variant="number">Win</Text>}
                  </Flex>
                ))
              )}
            </Flex>
          </Flex>
        ))}
      </Layout>
      <NavBar />
    </>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const slug = query.slug;
  const { plays, gameData } = await getPlays<{
    plays: Plays;
    gameData: Record<string, Game>;
  }>(PLAYS_ENDPOINT + slug);

  const cookies = new Cookies(req, res);
  const loggedInUser = cookies.get("bggusername") ?? "";
  let sessionCookie = `bggusername=${loggedInUser};`;
  sessionCookie += ` bggpassword=${cookies.get("bggpassword") ?? ""};`;
  sessionCookie += ` SessionID=${cookies.get("SessionID") ?? ""};`;

  return {
    props: { plays, slug, sessionCookie, loggedInUser, gameData },
  };
};
