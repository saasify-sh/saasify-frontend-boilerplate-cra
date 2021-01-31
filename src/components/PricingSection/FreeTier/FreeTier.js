import React, { Component, Fragment } from 'react'

import { observer } from 'mobx-react'

import { Divider, PricingPlan, theme } from 'react-saasify'

import plans from 'lib/pricing-plans'

import styles from '../PayAsYouGo/styles.module.css'

const plan = plans[0] // free-tier

@observer
export class FreeTier extends Component {
  render() {
    return (
      <PricingPlan
        className={theme(styles, 'plan')}
        key={plan.slug} // self-host
        context={null}
        plan={{
          ...plan,
          name: (
            <span>
              Free Tier
              <br />
              <span className={styles.subtitle}>(Free forever)</span>
            </span>
          ),
          context: null, // Remove top section hack.
          desc: null,
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
            <Divider key='divider' />,
            ...plan.features.slice(3)
          ],
          price: plan.price
        }}
      />
    )
  }
}
