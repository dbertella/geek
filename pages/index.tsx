import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Flex, Text, TextField } from "../components";

const login = (body: {
  username: string;
  password: string;
}): Promise<{ cookie: string; name: string }> => {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());
};

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Awesome Collection</title>
        <meta name="description" content="Generated from bgg apis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
          };
          await login({
            username: target.username.value,
            password: target.password.value,
          }).then((r) => {
            router.push(`/${r.name}`);
          });
        }}
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap="2"
          css={{
            height: "90vh",
          }}
        >
          <Text variant="number">
            This is the start of the journey. Login with your bgg username to
            start
          </Text>
          <Flex gap="2" justify="center" align="center" direction="column">
            <TextField placeholder="Your BGG username" name="username" />
            <TextField placeholder="Your BGG password" name="password" />
            <Text>The password would never be stored by this service</Text>
            <Button>Go</Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const username = cookies.get("user") ?? null;
  if (username) {
    return {
      redirect: {
        destination: `/${username}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Home;
