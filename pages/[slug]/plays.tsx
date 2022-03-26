import dayjs from "dayjs";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getBggData, PLAYS_ENDPOINT } from "../../bggApis";
import { Plays } from "../../bggApis/playsTypes";
import { Box, Flex, Heading, Layout, NavBar, Text } from "../../components";

const Collection: NextPage<{
  plays: Plays;
  slug: string;
}> = ({ plays, slug }) => {
  return (
    <>
      <Head>
        <title>Awesome Plays - {slug}</title>
        <meta name="description" content="Generated from bgg apis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading>{slug} Plays</Heading>
        <Heading variant="h3">Total: {plays.$.total}</Heading>
        {plays.play.map((d) => (
          <Box key={d.$.id + "d"}>
            <Flex justify="end">
              <Text size="2" color="gray10">
                {dayjs(d.$.date).format("ddd DD MMM YY")}
              </Text>
            </Flex>

            {d.item.map((game) => (
              <Heading key={game.$.objectid + "c"} variant="h5">
                {game.$.name}
                {Number(d.$.quantity) > 1 && <Text> x{d.$.quantity}</Text>}
              </Heading>
            ))}
            {d?.players?.map(({ player }) =>
              player.map((p, i) => (
                <Box key={p.$.userid + i || p.$.name + i}>
                  <Flex gap="2" align="center">
                    <Text>
                      <Text variant="number"># {++i}</Text> - {p.$.name}
                    </Text>
                    {p.$.username && (
                      <Text>
                        (
                        <Link
                          href={{
                            pathname: "/[slug]",
                            query: { slug: p.$.username },
                          }}
                          passHref
                        >
                          <Text as="a" css={{ color: "$blue" }}>
                            {p.$.username}
                          </Text>
                        </Link>
                        )
                      </Text>
                    )}
                    {!!Number(p.$.rating) && <Text>Rating: {p.$.rating}</Text>}
                    {!!Number(p.$.score) && <Text>Score: {p.$.score}</Text>}
                    {!!Number(p.$.win) && <Text variant="number">Win</Text>}
                  </Flex>
                </Box>
              ))
            )}
            <hr />
          </Box>
        ))}
      </Layout>
      <NavBar />
    </>
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
