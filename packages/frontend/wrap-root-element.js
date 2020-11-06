const React = require("react");
const { ThemeProvider } = require("theme-ui");
const { light } = require("@theme-ui/presets");
const { Provider } = require("./netlifyIdentityContext");
const { ApolloProvider } = require("@apollo/client");
const fetch = require("cross-fetch");
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://eru-todos.netlify.app/.netlify/functions/todos",
    fetch,
  }),
  cache: new InMemoryCache(),
});

const newTheme = {
  ...light,
  sizes: { container: 1024 },
};

module.exports = ({ element }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={newTheme}>
      <Provider>{element}</Provider>
    </ThemeProvider>
  </ApolloProvider>
);
