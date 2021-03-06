import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from "react-cookie"
import './index.css'
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
  // uri: 'https://calm-mesa-69319.herokuapp.com/graphql',
  credentials: 'include',
})
 

ReactDOM.render(
  <CookiesProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </CookiesProvider>,
  document.getElementById('root')
)

export default client