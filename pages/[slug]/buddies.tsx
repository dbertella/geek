import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getBggData, BUDDIES_ENDPOINT } from "../../bggApis";
import { User } from "../../bggApis/userTypes";
import { Box, Flex, Heading, Layout, NavBar, Text } from "../../components";

const Collection: NextPage<{
  user: User;
  slug: string;
}> = ({ user, slug }) => {
  const buddies = user.buddies
    .map((b) => b.buddy)
    .flat()
    .filter(Boolean);
  return (
    <>
      <Head>
        <title>Awesome Buddies - {slug}</title>
        <meta name="description" content="Generated from bgg apis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading>Buddies - {slug}</Heading>
        <Heading variant="h3">
          User: {user.firstname[0].$.value} {user.lastname[0].$.value}
        </Heading>
        <Heading variant="h6">Total buddies: {user.buddies[0].$.total}</Heading>

        {buddies.map((b) => (
          <Box
            key={b.$.id}
            css={{ borderBottom: "1px solid $gray10", pb: "$2" }}
          >
            <Flex gap="2">
              <Box css={{ flex: 1 }}>{b.$.name}</Box>
              <Link
                href={{
                  pathname: "/[slug]",
                  query: { slug: b.$.name },
                }}
                passHref
              >
                <Text as="a" css={{ color: "$blue" }}>
                  Collection
                </Text>
              </Link>
              <Link
                href={{
                  pathname: "/[slug]/plays",
                  query: { slug: b.$.name },
                }}
                passHref
              >
                <Text as="a" css={{ color: "$blue" }}>
                  Plays
                </Text>
              </Link>
              <Link
                href={{
                  pathname: "/[slug]/buddies",
                  query: { slug: b.$.name },
                }}
                passHref
              >
                <Text as="a" css={{ color: "$blue" }}>
                  Buddies
                </Text>
              </Link>
            </Flex>
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
  const { user } = await getBggData<{ user: User }>(BUDDIES_ENDPOINT + slug);
  return {
    props: { user, slug },
  };
};
