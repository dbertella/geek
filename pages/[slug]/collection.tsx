import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { COLLECTION_ENDPOINT, recursiveFetchAndWait } from "../../bggApis";
import { Game } from "../../bggApis/types";
import {
  Box,
  NavBar,
  Image,
  Flex,
  Card,
  Heading,
  Layout,
  Text,
} from "../../components";
import { GameHeader } from "../../components/GameHeader";

const Collection: NextPage<{
  data: Game[];
  slug: string;
}> = ({ data, slug }) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Awesome Collection - {slug}</title>
          <meta name="description" content="Generated from bgg apis" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Heading>Collection - {slug}</Heading>
        {data.map((d, i) => (
          <Card key={d.$.id + i} css={{ p: "$1", m: "$1" }}>
            <GameHeader
              rating={d.statistics[0].ratings[0].ranks[0].rank[0].$.value}
              thumbnail={d.thumbnail[0]}
            />
            <Heading variant="h3">{d.name[0].$.value}</Heading>
            <Box>
              Avg Rating{" "}
              <Text variant="number">
                {d.statistics[0].ratings[0].average[0].$.value}
              </Text>
            </Box>
            <Box>
              Min Players{" "}
              <Text variant="number">{d.minplayers[0].$.value}</Text>
            </Box>
            <Box>
              Max Players{" "}
              <Text variant="number">{d.maxplayers[0].$.value}</Text>
            </Box>
            <Box>
              Play Time <Text variant="number">{d.maxplaytime[0].$.value}</Text>
            </Box>
            <Box>
              Weight{" "}
              <Text variant="number">
                {d.statistics[0].ratings[0].averageweight[0].$.value}
              </Text>
            </Box>
          </Card>
        ))}
      </Layout>
      <NavBar />
    </>
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
