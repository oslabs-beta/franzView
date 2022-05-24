import express from "express";
import path from "path";
// import { ApolloServer } from "apollo-server-express";
// import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
// import http from "http";

// Default port as 3000 or PORT defined by a user in an env file.
const PORT: number | string = process.env.PORT || 3000;

// Initialize express server
const app: express.Express = express();

// Parse JSON and form data and pass it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all compiled files when using production build
app.use("/", express.static(path.resolve(__dirname, "../../public")));

app.listen(PORT, (): void => console.log(`Listening on port ${PORT} 🎉!`));

// async function startApolloServer(typeDefs: any, resolvers: any) {
//   const app = extpress();
//   const httpServer = http.createServer(app);
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     csrfPrevention: true,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });

//   app.get("/home", (req, res) => res.send("Hi"));

//   await server.start();
//   server.applyMiddleware({ app });
//   await new Promise<void>((resolve) =>
//     httpServer.listen({ port: 3000 }, resolve)
//   );
//   console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
// }
