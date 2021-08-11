import React, { Component, Fragment } from 'react'

import { observer } from 'mobx-react'

import { Divider, PricingPlan, theme } from 'react-saasify'
import infinity from 'react-saasify/src/assets/infinity.svg'

import plans from 'lib/pricing-plans'

import styles from '../Tenk/styles.module.css'

const plan = plans[2] // self-host

@observer
export class SelfHost extends Component {
  render() {
    const { currency } = this.props

    return (
      <PricingPlan
        className={theme(styles, 'plan')}
        key={plan.slug} // self-host
        context={null}
        plan={{
          ...plan,
          context: null, // Remove top section hack.
          ctaLink: 'https://app.reacher.email/signup',
          name: (
            <span>
              Commercial License
              <br />
              <span className={styles.subtitle}>(🏠 For Self-Hosting)</span>
            </span>
          ),
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
            ...plan.features.slice(2, 5),
            <Divider key='divider' />,
            ...plan.features.slice(5)
          ],
          price: plan.price.replace('$', currency === 'eur' ? '€' : '$')
        }}
      />
    )
  }
}
