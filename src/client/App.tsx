import React from "react";

import Dashboard from "./pages/Dashboard";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//https://github.com/apollographql/apollo-client/issues/3733
//typically would also import useQuery and gql - removed them because they were defined but not used

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

//`http://localhost:${process?.env.PORT || 3000}/graphql`,

const App: React.FC = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        {/* Hello, this is a new App */}
        <Dashboard />
      </ApolloProvider>
    </div>
  );
};

export default App;
