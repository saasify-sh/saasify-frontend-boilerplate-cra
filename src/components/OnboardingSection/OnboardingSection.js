import React, { Component } from 'react'
import PropTypes from 'prop-types'
import copyTextToClipboard from 'copy-text-to-clipboard'

import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import deployment from 'lib/deployment'

import {
  Button,
  Icon,
  Result,
  Steps,
  Tooltip,
  Paper,
  Section,
  theme,
  getUpgradeLink
} from 'react-saasify'

import styles from './styles.module.css'

const { Step } = Steps

@inject('auth')
@inject('config')
@observer
export class OnboardingSection extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  }

  state = {
    isTokenVisible: false,
    copiedTextToClipboard: false
  }

  componentWillUnmount() {
    if (this._copyTimeout) {
      clearTimeout(this._copyTimeout)
      this._copyTimeout = null
    }
  }

  render() {
    const { auth, config, className, ...rest } = this.props
    const { isTokenVisible, copiedTextToClipboard } = this.state

    const { saas } = config.deployment
    const hasWebapp = !!saas?.webapp?.url

    let step = 0

    if (auth.isAuthenticated) {
      step = 1

      if (
        auth.consumer &&
        auth.consumer.enabled &&
        auth.consumer.plan !== 'free'
      ) {
        step = 2

        if (auth.consumer.activated) {
          step = 3
        }
      }
    }

    const params = new URLSearchParams(window.location.search)
    const success = params.get('success')
    let result = null

    if (
      auth.consumer &&
      auth.consumer.enabled &&
      auth.consumer.plan &&
      auth.consumer.plan !== 'free'
    ) {
      if (success) {
        result = (
          <Result
            status='success'
            title='Your subscription is ready to use.'
            className={theme(styles, 'result')}
          />
        )
      }
    } else if (auth.consumer && !auth.consumer.enabled) {
      result = (
        <Result
          status='info'
          title='Upgrade to continue.'
          subTitle={
            <span>
              You need an active subscription in order to use this product.
            </span>
          }
          extra={
            <>
              <Button type='primary' key='upgrade' href='/pricing'>
                Upgrade
              </Button>
            </>
          }
          className={theme(styles, 'result')}
        />
      )
    } else {
      result = (
        <Result
          status='info'
          title="You've signed up for the free tier."
          subTitle={<span>You're currently using the the free plan.</span>}
          extra={
            <>
              {saas?.docs !== false && (
                <Button type='secondary' key='docs' href='/docs'>
                  View docs
                </Button>
              )}

              <Button type='primary' key='upgrade' href='/pricing'>
                Upgrade
              </Button>
            </>
          }
          className={theme(styles, 'result')}
        />
      )
    }

    return (
      <Section id='onboarding' {...rest}>
        <Paper className={theme(styles, 'body')}>
          {result}

          <Steps
            direction='vertical'
            current={step}
            className={theme(styles, 'steps')}
          >
            <Step
              title='Create Account'
              description={
                hasWebapp
                  ? 'Test out the free plan.'
                  : 'Test out the the public, rate-limited version of the API without an auth token.'
              }
            />

            <Step
              title='Upgrade Plan'
              description={
                <span>
                  <Link to={getUpgradeLink({ auth, deployment })}>Upgrade</Link>{' '}
                  your plan once you're ready.
                </span>
              }
            />

            <Step
              title='Use your auth token'
              description={
                <span>
                  {saas.cx ? (
                    <span>
                      <Button
                        href={saas.cx}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Install Chrome Extension
                      </Button>

                      <p>And paste your private auth token.</p>
                    </span>
                  ) : hasWebapp ? (
                    <span>
                      If you want to use the API, you'll need your private auth
                      token. See the <Link to='/docs'>docs</Link> for more info.
                    </span>
                  ) : (
                    <span>Use your private auth token.</span>
                  )}

                  {auth.consumer && auth.consumer.enabled && (
                    <>
                      <br />

                      <Tooltip
                        placement='top'
                        title={
                          isTokenVisible ? 'Hide auth token' : 'Show auth token'
                        }
                      >
                        <Button
                          icon={isTokenVisible ? 'eye' : 'eye-invisible'}
                          className={theme(styles, 'tokenButton')}
                          onClick={this._onClickTokenVisibility}
                        />
                      </Tooltip>

                      <Tooltip
                        placement='top'
                        title={
                          copiedTextToClipboard
                            ? 'Copied!'
                            : 'Copy auth token to clipboard'
                        }
                      >
                        <Button onClick={this._onClickCopyToken}>
                          {isTokenVisible
                            ? auth.consumer.token
                            : `${auth.consumer.token.substr(0, 8)} ...`}
                        </Button>
                      </Tooltip>
                    </>
                  )}
                </span>
              }
              icon={step === 2 ? <Icon type='loading' /> : undefined}
            />
          </Steps>
        </Paper>
      </Section>
    )
  }

  _onClickTokenVisibility = () => {
    this.setState({ isTokenVisible: !this.state.isTokenVisible })
  }

  _onClickCopyToken = () => {
    const { token } = this.props.auth.consumer
    copyTextToClipboard(token)

    this.setState({ copiedTextToClipboard: true })
    this._clearCopyTimeout()
    this._copyTimeout = setTimeout(this._onCopyTimeout, 3000)
  }

  _onCopyTimeout = () => {
    this._clearCopyTimeout()
    this.setState({ copiedTextToClipboard: false })
  }

  _clearCopyTimeout = () => {
    if (this._copyTimeout) {
      clearTimeout(this._copyTimeout)
      this._copyTimeout = null
    }
  }
}
