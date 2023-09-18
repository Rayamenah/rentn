import Landing from "@/components/Landing/Landing";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>rentn</title>
        <meta
          name="description"
          content="find homes to rent around you"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Landing />
    </>
  );
}
