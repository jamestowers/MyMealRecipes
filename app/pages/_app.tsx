import type { AppProps /*, AppContext */ } from 'next/app'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import '../styles/globals.css';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://localhost:4487/graphql',
    credentials: 'same-origin',
    /* headers: {
      cookie: req.header('Cookie'),
    }, */
  }),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider>
}

export default MyApp
