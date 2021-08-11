import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { Section, theme } from 'react-saasify'

import { FreeTier } from './FreeTier'
import { Tenk } from './Tenk'
import { SelfHost } from './SelfHost'

import styles from './styles.module.css'

@observer
export class PricingSection extends Component {
  state = {
    currency: 'eur'
  }

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
        <div className={styles.currency}>
          <select
            value={this.state.currency}
            onChange={(e) => this.setState({ currency: e.target.value })}
          >
            <option value='eur'>Pay in EUR</option>
            <option value='usd'>Pay in USD</option>
          </select>
        </div>
        <div className={theme(styles, 'plans')}>
          <FreeTier currency={this.state.currency} />
          <Tenk currency={this.state.currency} />
          <SelfHost currency={this.state.currency} />
        </div>
      </Section>
    )
  }
}
