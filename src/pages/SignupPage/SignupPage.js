import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer, inject } from 'mobx-react'
import { handleAuth, theme } from 'react-saasify'

import { SignupForm, Paper, NavHeader } from 'components'

import { withTracker } from 'lib/with-tracker'
import deployment from 'lib/deployment'

import styles from './styles.module.css'

const authParams = {
  deployment: deployment.id
}

@withTracker
@inject('auth')
@observer
export class SignupPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  componentWillMount() {
    window.location.replace('https://app.reacher.email/signup')
  }

  render() {
    if (this.props.auth.isAuthenticated) {
      return handleAuth(this.props)
    }

    return (
      <div className={theme(styles, 'signup-page')}>
        <NavHeader fixed />

        <div className={theme(styles, 'content')}>
          <Paper className={theme(styles, 'body')}>
            <SignupForm
              onAuth={this._onAuth}
              authParams={authParams}
              authConfig={deployment.authProviders}
            />
          </Paper>
        </div>
      </div>
    )
  }

  _onAuth = () => {
    handleAuth(this.props)
  }
}
