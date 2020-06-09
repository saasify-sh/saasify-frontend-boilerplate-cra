import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { PricingPlan, Section, theme } from 'react-saasify'

import plans from 'lib/pricing-plans'

import styles from './styles.module.css'

@observer
export class PricingSection extends Component {
  render() {
    return (
      <Section
        id='pricing'
        title='Pricing'
        subtitle={
          <span>
            Free. Unlimited. <b>Pay as you Grow.</b>
          </span>
        }
        stretch
        {...this.props}
      >
        <div className={theme(styles, 'plans')}>
          {plans.map((plan) => (
            <PricingPlan
              className={theme(styles, 'plan')}
              key={plan.slug}
              plan={plan}
            />
          ))}
        </div>
      </Section>
    )
  }
}
