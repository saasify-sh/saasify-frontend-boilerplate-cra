import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer, inject } from 'mobx-react'
import { handleAuth, theme } from 'react-saasify'

import { LoginForm, Paper, NavHeader } from 'components'

import { withTracker } from 'lib/with-tracker'
import deployment from 'lib/deployment'

import styles from './styles.module.css'

// const authConfig = deployment.authProviders

const authParams = {
  deployment: deployment.id
}

@withTracker
@inject('auth')
@observer
export class LoginPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {
    if (this.props.auth.isAuthenticated) {
      return handleAuth(this.props)
    }

    return (
      <div className={theme(styles, 'login-page')}>
        <NavHeader fixed />

        <div className={theme(styles, 'content')}>
          <Paper className={theme(styles, 'body')}>
            <div className={theme(styles, 'migration')}>
              <small>
                ⚠️ If you have been invited to the new Reacher dashboard, please
                login at{' '}
                <a href='https://app.reacher.email/login'>the new login page</a>{' '}
                instead .
              </small>
            </div>

            <LoginForm
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
