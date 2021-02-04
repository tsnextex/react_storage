import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, from } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

const apiHost = "http://dev.api.sroa.com";
const httpLink = new HttpLink({ uri: apiHost });

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token") || "";
  const refreshToken =  localStorage.getItem("refreshToken") || "";
    // set the headers to the context
    operation.setContext({
      headers: {
        "x-token": token,
        "x-refresh-token": refreshToken,
      },
    });

  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext();
    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token) {
        localStorage.setItem("token", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }

    return response;
  });
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([middlewareLink, afterwareLink, onErrorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
