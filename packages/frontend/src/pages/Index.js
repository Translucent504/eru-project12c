import React from "react";
import { Button, Container, Flex, Heading } from "theme-ui";
import netlifyIdentity from "netlify-identity-widget";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    netlifyIdentity.init({});
  }, []);
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1"> Todo App</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default Index;
