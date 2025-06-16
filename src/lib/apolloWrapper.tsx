import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

// have a function to create a client for you
function makeClient() {
  const authLink = new ApolloLink((operation, forward) => {
    // Read the token from cookies
    // const token = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("token="))
    //   ?.split("=")[1];
    // const refreshToken = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("refreshToken="))
    //   ?.split("=")[1];

    // // Set the authorization header
    // operation.setContext(({ headers = {} }) => ({
    //   headers: {
    //     ...headers,
    //     Authorization: token ? `Bearer ${token}` : "",
    //     "X-refresh-token": refreshToken ? `Bearer ${refreshToken}` : "",
    //     "X-device":
    //       "gAWuP2lOtuBADm3icYIjEjq14rkKJiXJgO3gma19diTerIQBDDFK3StiAC7vV3sPLkyhJkGmWSCT6gYN0mvV3rzY03xB5mA8z2lW6aJDoPv7nu2f6iNlwa64",
    //   },
    // }));
    console.log("Setting up auth link for Apollo Client");
    return forward(operation);
  });

  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: "https://api.alineacapitaltechnologies.com/",
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  // const formatResponseLink = new ApolloLink((operation, forward) => {
  //   return forward(operation).map((response) => {
  //     return response?.data?.data;
  //   });
  // });
  const link = ApolloLink.from([authLink, httpLink]);
  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link,
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={makeClient()}>{children}</ApolloProvider>;
}
