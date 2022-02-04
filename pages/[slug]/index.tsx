import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { COLLECTION_ENDPOINT, recursiveFetchAndWait } from "../../bggApis";
import { Game } from "../../bggApis/types";
import { Box, NavBar } from "../../components";
import { BackButton } from "../../components/BackButton";

const Collection: NextPage<{
  data: Game[];
  slug: string;
}> = ({ data, slug }) => {
  return (
    <Box>
      <BackButton />
      <Head>
        <title>Awesome Collection - {slug}</title>
        <meta name="description" content="Generated from bgg apis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data.map((d) => (
        <Box key={d.$.id}>
          {d.statistics[0].ratings[0].ranks[0].rank[0].$.value}
          <img src={d.thumbnail[0]} alt="" />

          <p>Title {d.name[0].$.value}</p>
          <p>Avg Rating {d.statistics[0].ratings[0].average[0].$.value}</p>
          <p>Play Time {d.maxplaytime[0].$.value}</p>
          <p>Min Players {d.minplayers[0].$.value}</p>
          <p>Max Players {d.maxplayers[0].$.value}</p>
          <p>Play Time {d.maxplaytime[0].$.value}</p>
          <p>Weight {d.statistics[0].ratings[0].averageweight[0].$.value}</p>
        </Box>
      ))}
      <NavBar />
    </Box>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;
  const data = await recursiveFetchAndWait(COLLECTION_ENDPOINT + slug);
  return {
    props: { data, slug },
  };
};
