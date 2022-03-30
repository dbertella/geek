import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Flex, Text, TextField } from "../components";

const Home: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  return (
    <div>
      <Head>
        <title>Awesome Collection</title>
        <meta name="description" content="Generated from bgg apis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/${name}`);
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
            This is the start of the journey type a bgg username and start the
            lookup
          </Text>
          <Flex gap="2" justify="center" align="center">
            <TextField
              placeholder="Your BGG username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button>Go</Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export default Home;
