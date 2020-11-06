const React = require("react");
const netlifyIdentity = require("netlify-identity-widget");


const IdentityContext = React.createContext({});

exports.IdentityContext = IdentityContext;

const Provider = (props) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
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
    <IdentityContext.Provider value={{ identity: netlifyIdentity, user }}>
      {props.children}
    </IdentityContext.Provider>
  );
};

exports.Provider = Provider

