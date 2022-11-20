import Cookies from "cookies";
import dayjs from "dayjs";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getBggData, PLAYS_ENDPOINT } from "../../bggApis";
import { Plays, PlayerEntity } from "../../bggApis/playsTypes";
import { Button, Flex, Heading, Layout, NavBar, Text } from "../../components";

const fetcher = (body: {
  sessionCookie: string;
  gameId: string;
  playdate: string;
  players: PlayerEntity[];
  location: string;
}) => {
  fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const Collection: NextPage<{
  plays: Plays;
  slug: string;
  sessionCookie: string | null;
}> = ({ plays, slug, sessionCookie }) => {
  return (
    <>
      <Head>
        <title>Awesome Plays - {slug}</title>
        <meta name="description" content="Generated from bgg apis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading>Plays - {slug}</Heading>
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
              <Button
                onClick={() =>
                  fetcher({
                    sessionCookie,
                    gameId: d.item[0].$.objectid,
                    players: d.players?.[0]?.player ?? [],
                    location: d.$.location,
                    playdate: d.$.date,
                  })
                }
              >
                Copy this play play
              </Button>
            )}

            {d.item.map((game) => (
              <Heading key={game.$.objectid + "c"} variant="h5">
                {game.$.name}
                {Number(d.$.quantity) > 1 && <Text> x{d.$.quantity}</Text>}
              </Heading>
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
  const { plays } = await getBggData<{ plays: Plays }>(PLAYS_ENDPOINT + slug);

  const cookies = new Cookies(req, res);
  const sessionCookie = cookies.get("sessionCookie") ?? null;

  return {
    props: { plays, slug, sessionCookie },
  };
};
