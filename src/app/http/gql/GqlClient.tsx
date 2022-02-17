import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'https://devent.marstranslation.com/graphiql/' });

const authMiddleware = new ApolloLink((operation, forward) => {
    const accessToken = localStorage.getItem('access_token');

    operation.setContext(({ headers = {} }) => ({
        headers: {
            "keep-alive": "true",
            "accept": "application/json",
            "content-type": 'application/json',
            "authorization": accessToken? 'Bearer' + accessToken : '',
            }
        }
));

  return forward(operation);
})

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
        addTypename: false,
    }),
    name:'Peacecoin Client'
});
