import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getBggData, PLAYS_ENDPOINT } from "../../bggApis";
import { Plays } from "../../bggApis/playsTypes";
import { Box, Flex, NavBar, Text } from "../../components";
import { BackButton } from "../../components/BackButton";

const Collection: NextPage<{
  plays: Plays;
  slug: string;
}> = ({ plays, slug }) => {
  return (
    <Box>
      <BackButton />
      <Head>
        <title>Awesome Collection - {slug}</title>
        <meta name="description" content="Generated from bgg apis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>Total: {plays.$.total}</Box>
      {plays.play.map((d) => (
        <Box key={d.$.id + "d"}>
          <Text>{d.$.date}</Text>
          <Text>{d.$.quantity}</Text>
          {d.item.map((game) => (
            <Text key={game.$.objectid + "c"}>{game.$.name}</Text>
          ))}
          {d?.players?.map(({ player }) =>
            player.map((p, i) => (
              <Box key={p.$.userid + i || p.$.name + i}>
                <Flex gap="2" align="center">
                  <Text>
                    # {i + 1} - {p.$.name}
                  </Text>
                  {p.$.username && (
                    <Text>
                      (
                      <Link
                        href={{
                          pathname: "/[slug]",
                          query: { slug: p.$.username },
                        }}
                      >
                        <a>{p.$.username}</a>
                      </Link>
                      )
                    </Text>
                  )}
                  {!!Number(p.$.rating) && <Text>Rating: {p.$.rating}</Text>}
                  {!!Number(p.$.score) && <Text>Score: {p.$.score}</Text>}
                  {!!Number(p.$.win) && <Text>Win</Text>}
                </Flex>
              </Box>
            ))
          )}
          <hr />
        </Box>
      ))}
      <NavBar />
    </Box>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;
  const { plays } = await getBggData<{ plays: Plays }>(PLAYS_ENDPOINT + slug);
  return {
    props: { plays, slug },
  };
};
