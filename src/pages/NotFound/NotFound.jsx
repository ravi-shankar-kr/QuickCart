import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

const NotFound = () => {
  return (
    <Container className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center">
      <h1 className="text-8xl font-bold">404</h1>

      <p className="my-4 text-lg text-neutral-500">
        Page Not Found
      </p>

      <Link to="/">
        <Button>Back Home</Button>
      </Link>
    </Container>
  );
};

export default NotFound;