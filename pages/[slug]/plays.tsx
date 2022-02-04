import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getBggData, PLAYS_ENDPOINT } from "../../bggApis";
import { Plays } from "../../bggApis/playsTypes";
import { Box, NavBar, Text } from "../../components";
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
        <Box key={d.$.id}>
          <Text>{d.$.date}</Text>
          <Text>{d.$.quantity}</Text>
          {d.item.map((game) => (
            <Text key={game.$.objectid}>{game.$.name}</Text>
          ))}
          {d?.players?.map(({ player }) =>
            player.map((p) => (
              <Box key={p.$.userid}>
                {p.$.name}
                {p.$.username && ` (${p.$.username})`}
                <Text>Win: {p.$.win}</Text>
                <Text>Rating: {p.$.rating}</Text>
                <Text>Score: {p.$.score}</Text>
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
