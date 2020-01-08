import * as React from "react";
import InputForm from './form'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Tasks from './tasks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Details from "./details";


function App() {



  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      console.log('networkError', networkError)
    }
  })
  return (

    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <React.Fragment>
            <div className="container  pt-3">
              <div style={{ width: 500, display: "block", margin: "auto" }}>
                <h1 className="display-4 my-3">Tasks</h1>
              </div>
              <Route exact path='/' component={Tasks} />
              <Route exact path='/:id' component={Details}/>


            </div>
          </React.Fragment>

        </Switch>
      </Router>
    </ApolloProvider>


  )



}



export default App