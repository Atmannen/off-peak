import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as Unstated from 'unstated'
import * as auth from './lib/auth'

import Cover from './app/Cover'
import Menu from './app/components/Menu'
import About from './app/About'
import Homes from './app/Homes'
import List from './app/List'
import Callback from './app/Callback'
import GraphLoader from './app/Graph/GraphLoader'
import SnapLoader from './app/Graph/SnapLoader'

import './App.css'

export default class App extends Component {
  constructor(readonly props: any) {
    super(props)
  }

  public render() {
    return (
      <Unstated.Provider>
        <Router>
          <div className="App">
            <Menu />
            <Route path="/" exact component={Cover} />
            <Route path="/about" exact component={About} />
            <Route path="/homes" exact component={Homes} />
            <Route path="/homes/:priceAreaCode/:gridAreaCode/:id/graphs" component={GraphLoader} />
            <Route path="/list" exact component={List} />
            <Route path="/snaps/:id/graphs" component={SnapLoader} />
            <Route path="/auth/callback" exact component={Callback} />
          </div>
        </Router>
      </Unstated.Provider>
    )
  }
}

export type AuthState = {
  isLoggedIn: boolean
}

export class AuthContainer extends Unstated.Container<AuthState> {
  state: AuthState = {
    isLoggedIn: auth.isLoggedIn(),
  }

  public login() {
    auth.login()
  }

  public logout() {
    auth.logout()
    window.location.href = window.location.origin
  }

  public update() {
    this.setState({ isLoggedIn: auth.isLoggedIn() })
  }
}
