import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { Section, theme } from 'react-saasify'

import { FreeTier } from './FreeTier'
import { PayAsYouGo } from './PayAsYouGo'
import { SelfHost } from './SelfHost'

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
          <FreeTier />
          <PayAsYouGo />
          <SelfHost />
        </div>
      </Section>
    )
  }
}
