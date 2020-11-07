const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;

const typeDefs = gql`
  type Query {
    todosByEmail(email: String!): [Todo!]
  }
  type Todo {
    content: String!
    completed: Boolean!
  }
  input TodoInput {
    content: String!
    completed: Boolean!
  }
  type User {
    email: String!
    todos: [Todo!]
  }

  type Mutation {
    updateTodos(email: String!, todos: [TodoInput]): User
  }
`;

const users = [
  {
    email: "padoo@padoo.com",
    full_name: "Shayaan Farooqi",
    todos: [
      {
        content: "Todo task 1",
        completed: false,
      },
      {
        content: "Todo task 2",
        completed: false,
      },
    ],
  },
];

const resolvers = {
  Query: {
    todosByEmail: async (_, args) => {
      const client = new faunadb.Client({
        secret: process.env.FAUNA_SECRET,
      });
      try {
        // User found
        const result = await client.query(
          q.Get(q.Match(q.Index("todos_by_email"), args.email))
        );
        console.log(args, result);
        return result.data.todos;
      } catch (error) {
        console.log(error);
        // user not found
        await client.query(
          q.Create(q.Collection("users"), {
            data: { email: args.email, todos: [] },
          })
        );
        return [];
      }
    },
  },
  Mutation: {
    updateTodos: async (_, args) => {
      const client = new faunadb.Client({
        secret: process.env.FAUNA_SECRET,
      });
      await client.query(
        q.Update(
          q.Select(
            "ref",
            q.Get(q.Match(q.Index("todos_by_email"), args.email))
          ),
          { data: { todos: args.todos } }
        )
      );
      const a = await client.query(
        q.Get(q.Match(q.Index("todos_by_email"), args.email))
      );
      return a.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
