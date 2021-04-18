import React, { Component, Fragment } from 'react'

import { observer } from 'mobx-react'

import { Divider, PricingPlan, theme } from 'react-saasify'

import plans from 'lib/pricing-plans'

import styles from './styles.module.css'

// Tiers for the 10k-v2 plan.
const plan = plans[1]

@observer
export class Tenk extends Component {
  render() {
    return (
      <PricingPlan
        className={theme(styles, 'plan')}
        key={plan.slug} // 10k-v2
        plan={{
          ...plan,
          name: (
            <span>
              10K Emails (SaaS)
              <br />
              <span className={styles.subtitle}>(⭐ Most Popular)</span>
            </span>
          ),
          context: null, // Remove top section hack.
          features: [
            <div className={theme(styles, 'pricing')} key='api-calls'>
              <div />
              <div className={theme(styles, 'column')}>Price</div>

              <div className={theme(styles, 'column')}>Rate Limit</div>

              {plan.requests && (
                <Fragment>
                  <div className={theme(styles, 'emphasis')}>API Calls</div>

                  <div className={theme(styles, 'column-content')}>
                    {plan.requests.price}
                  </div>

                  <div className={theme(styles, 'column-content')}>
                    {plan.requests.rateLimit}
                  </div>
                </Fragment>
              )}
            </div>,
            <Divider key='divider' />,
            plan.features[0],
            plan.features[1],
            <Divider key='divider' />,
            plan.features[2],
            ...plan.features.slice(3)
          ]
        }}
      />
    )
  }
}
