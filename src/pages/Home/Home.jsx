import React from "react";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

const Home = () => {
  return (
    <Container className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-5xl font-bold">Welcome to QuickCart</h1>

      <p className="mb-8 max-w-2xl text-neutral-600">
        Modern React eCommerce Application built with Redux Toolkit, Tailwind
        CSS and Feature Based Architecture.
      </p>

      <Button>Explore Products</Button>
    </Container>
  );
};

export default Home;