import React from "react";

import Dashboard from "./pages/Dashboard";
import Brokers from "./pages/Brokers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
      {/* Hello, this is a new App */}
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
    </div>
  );
};

export default App;
