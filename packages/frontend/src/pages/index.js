import React, { useContext } from "react";
import { Button, Container, Flex, Heading, NavLink } from "theme-ui";
import { Link, navigate } from "gatsby";
import { IdentityContext } from "../../netlifyIdentityContext";
import Navbar from "../components/Navbar";

const Index = () => {
  const context = useContext(IdentityContext);
  const user = context.user;
  const netlifyIdentity = context.identity;
  if (user) {
    navigate("/app");
  }
  return (
    <Container>
      <Navbar/>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1"> Todo App</Heading>
        <Button
          sx={{ marginTop: 2, color: "black" }}
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
