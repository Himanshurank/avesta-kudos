import React from "react";
import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import HomeTemplate from "@/components/templates/HomeTemplate";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Digital Kudos Wall | Celebrate Great Work</title>
        <meta
          name="description"
          content="Recognize your colleagues' achievements and build a positive culture of appreciation with Digital Kudos Wall."
        />
      </Head>
      <MainLayout>
        <HomeTemplate />
      </MainLayout>
    </>
  );
};

export default HomePage;
