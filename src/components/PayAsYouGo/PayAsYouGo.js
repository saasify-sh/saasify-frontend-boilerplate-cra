import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { Divider, PricingPlan, theme } from 'react-saasify'

import plans, { formatPrice } from 'lib/pricing-plans'

import styles from './styles.module.css'

// Tiers for the pay-as-you-fo-v1 plan.
const payg = plans[1].original.requests

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
        key={plans[1].slug} // pay-as-you-go-v1
        plan={{
          ...plans[1],
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
            </div>
          ),
          features: [
            plans[1].features[0],
            plans[1].features[1],
            <Divider key='divider' />,
            ...plans[1].features.slice(2)
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
