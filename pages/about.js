import Head from "next/head";

import Container from "../components/Container";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import Box from "../components/Box";

export default () => {
  return (
    <Container>
      <Header />
      <Head>
        <title>{"About"}</title>
      </Head>
      <Box>
        <p>PWA App with Next.js for WWWID Challenge By @nirzaq</p>
      </Box>
      
      <style jsx global>{`
          .box {
            margin-top: 4rem;
          }
      `}</style>
    </Container>
  );
};
