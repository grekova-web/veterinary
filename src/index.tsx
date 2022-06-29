import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
    uri: 'https://graphql-server-veterinary.herokuapp.com/',
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);

reportWebVitals();