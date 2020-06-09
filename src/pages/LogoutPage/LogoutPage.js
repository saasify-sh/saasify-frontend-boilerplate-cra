import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { AuthManager } from 'react-saasify'
import { withTracker } from 'lib/with-tracker'

@withTracker
export class LogoutPage extends Component {
  componentDidMount() {
    AuthManager.signout()
  }

  render() {
    return <Redirect to='/' />
  }
}
