const React = require("react");
const { ThemeProvider } = require("theme-ui");
const { light } = require("@theme-ui/presets");
const { Provider } = require("./netlifyIdentityContext");

const newTheme = {
  ...light,
  sizes: { container: 1024 },
};

module.exports = ({ element }) => (
  <ThemeProvider theme={newTheme}>
    <Provider>{element}</Provider>
  </ThemeProvider>
);
