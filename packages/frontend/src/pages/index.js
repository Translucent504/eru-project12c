import React, { useContext } from "react";
import { Button, Container, Flex, Heading, Link } from "theme-ui";
import { IdentityContext } from "../../netlifyIdentityContext";
import Navbar from "../components/Navbar";


const Index = () => {
  const context = useContext(IdentityContext);
  const user = context.user;
  const netlifyIdentity = context.identity;
  return (
    <Container>
      <Navbar />
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1"> Todo App, Login to get Started.</Heading>
        {!user && <Button
          sx={{ marginTop: 2, color: "black" }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Login
        </Button>}
        {user && <Link sx={{fontSize:'4rem'}} to="/app">Go To Todos Dashboard</Link>}
      </Flex>
    </Container>
  );
};

export default Index;
