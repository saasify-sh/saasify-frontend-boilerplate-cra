import React, { Component, Fragment } from 'react'

import { observer } from 'mobx-react'

import { Divider, PricingPlan, theme } from 'react-saasify'
import infinity from 'react-saasify/src/assets/infinity.svg'

import plans, { formatPrice } from 'lib/pricing-plans'

import styles from './styles.module.css'

// Tiers for the pay-as-you-fo-v2 plan.
const plan = plans[1]
const payg = plan.original.requests

/**
 * Given the number of emails, calculate the price.
 */
function calculatePrice(emails = 0) {
  // Find the tier we fall in.
  const tier =
    payg.tiers.find((tier) => emails <= +tier.upTo) ||
    payg.tiers[payg.tiers.length - 1]

  return emails * +tier.unitAmount
}

@observer
export class PayAsYouGo extends Component {
  state = {
    emails: 1000
  }

  render() {
    return (
      <PricingPlan
        className={theme(styles, 'plan')}
        key={plan.slug} // pay-as-you-go-v1
        plan={{
          ...plan,
          context: null, // Remove top section hack.
          desc: (
            <div>
              <span>
                <label htmlFor='emails'>ESTIMATE LOOKUPS/MONTH:</label>
                <input
                  className={styles.emailsInput}
                  min={0}
                  name='emails'
                  onChange={({ target: { value } }) =>
                    this.setState({ emails: value })
                  }
                  step={1}
                  type='number'
                  value={this.state.emails}
                />
              </span>
              <p className={styles.emailsWarning}>
                * The price below is indicative. The actual price will be
                determined by{' '}
                <a
                  href='https://www.notion.so/Enterprise-Pricing-dd54b64b2fcc43c1811ead80e004a1e2'
                  rel='noreferrer'
                  target='_blank'
                >
                  how many lookups
                </a>{' '}
                you do for that month.
              </p>
            </div>
          ),
          features: [
            <div className={theme(styles, 'pricing')} key='api-calls'>
              <div />
              <div className={theme(styles, 'column')}>Price</div>

              <div className={theme(styles, 'column')}>Rate Limit</div>

              {plan.requests && (
                <Fragment>
                  <div className={theme(styles, 'emphasis')}>API Calls</div>

                  <div className={theme(styles, 'column-content')}>
                    Variable
                  </div>

                  <div className={theme(styles, 'column-content')}>
                    <img
                      alt='unlimited'
                      src={infinity}
                      className={theme(styles, 'infinity')}
                    />{' '}
                    / month
                  </div>
                </Fragment>
              )}
            </div>,
            <Divider key='divider' />,
            plan.features[0],
            plan.features[1],
            <Divider key='divider' />,
            ...plan.features.slice(2)
          ],
          // Dynamic pricing.
          price: `$${formatPrice(
            Math.round(calculatePrice(this.state.emails))
          )}*`
        }}
      />
    )
  }
}
