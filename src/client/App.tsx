import React from "react";

import Dashboard from "./pages/Dashboard";
import Brokers from "./pages/Brokers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
//https://github.com/apollographql/apollo-client/issues/3733
//typically would also import useQuery and gql - removed them because they were defined but not used

// Create a batch link to have reduce network requests needed to query data
const link = new BatchHttpLink({
  uri: "/graphql",
  batchMax: 3,
  batchInterval: 10,
  batchDebounce: true,
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Broker: {
        keyFields: ["brokerId"],
        merge: true,
        fields: {},
      },
    },
  }),
});

//`http://localhost:${process?.env.PORT || 3000}/graphql`,

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/brokers" element={<Brokers />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>nothing here!</p>
              </main>
            }
          />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
