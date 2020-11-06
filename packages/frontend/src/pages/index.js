import React, { useState } from "react";
import { Button, Container, Flex, Heading, NavLink } from "theme-ui";
import netlifyIdentity from "netlify-identity-widget";
import { useEffect } from "react";
import { Link } from "gatsby";

const Index = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user);
  });

  netlifyIdentity.on("logout", () => {
    netlifyIdentity.close();
    setUser(null);
  });
  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
        {user && <NavLink p={2}>
          {user.user_metadata.full_name}
        </NavLink>}
      </Flex>
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
