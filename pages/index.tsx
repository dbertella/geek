import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

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
        <input
          placeholder="Your BGG username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Go</button>
      </form>
    </div>
  );
};

export default Home;
