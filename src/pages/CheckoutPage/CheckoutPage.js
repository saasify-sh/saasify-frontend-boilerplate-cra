import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import { withRouter, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { API, notification, theme } from 'react-saasify'
import { withTracker } from 'lib/with-tracker'

import { CheckoutForm, Paper, Tenk, SelfHost, NavHeader } from 'components'

import deployment from 'lib/deployment'
import plans from 'lib/pricing-plans'

import styles from './styles.module.css'

@withTracker
@withRouter
@inject('auth')
@observer
export class CheckoutPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  state = {
    loading: false
  }

  render() {
    const { auth } = this.props
    const { loading } = this.state

    const plan = this._getPlan()
    if (!plan) {
      return <Redirect to='/pricing' />
    }

    if (
      auth.isAuthenticated &&
      auth.consumer &&
      auth.consumer.enabled &&
      auth.consumer.plan === plan.slug
    ) {
      return <Redirect to='/dashboard' />
    }

    let action = 'Upgrade'

    if (plan.trialPeriodDays > 0) {
      action = `Start ${plan.trialPeriodDays} day free trial`
    }

    return (
      <div className={theme(styles, 'checkout-page')}>
        <NavHeader fixed />

        <div className={theme(styles, 'content')}>
          {plan.slug.startsWith('10k') ? <Tenk /> : <SelfHost />}

          <Paper className={theme(styles, 'checkout-form')}>
            <CheckoutForm
              title='Checkout'
              action={action}
              loading={loading}
              onSubmit={this._onSubmit}
            />
          </Paper>
        </div>
      </div>
    )
  }

  _getPlan = () => {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    return plans.find(({ slug }) => slug === query.plan)
  }

  _onSubmit = async ({ name, coupon, stripe }) => {
    const plan = this._getPlan()
    this.setState({ loading: true })

    try {
      const { token, error } = await stripe.createToken({ name })
      console.log({ plan, token, error })

      if (error) {
        notification.error({
          message: 'Error processing payment method',
          description: error.message,
          duration: 0
        })
        this.setState({ loading: false })
        return
      }

      // TODO: merge addBillingSource and createConsumer into one API call so the client
      // doesn't have to synchronously wait on two round-trips
      // const source = await API.addBillingSource({ source: token.id })
      // console.log('checkout source', { source })

      const consumer = await API.createConsumer({
        project: deployment.project.id,
        deployment: deployment.id,
        plan: plan.slug,
        source: token.id,
        coupon
      })
      console.log('checkout consumer', { consumer, plan })

      const activeCoupon =
        coupon &&
        (deployment.coupons || []).find((c) => c.stripeCoupon === coupon)

      if (activeCoupon) {
        // TODO: check if activeCoupon is valid and use it in UI
        console.log('active coupon', activeCoupon)
      }

      notification.success({
        message: 'Subscription Created',
        description: 'Your subscription has been created successfully.'
      })

      this.props.auth.consumer = consumer
      const querystring = qs.stringify({ success: true, coupon, plan })
      this.props.history.replace(`/dashboard?${querystring}`)
    } catch (err) {
      notification.error({
        message: 'Error initializing subscription',
        description: err?.response?.data?.error,
        duration: 0
      })

      this.setState({ loading: false })
    }
  }
}
