import React, { Component } from 'react'
import { theme } from 'react-saasify'
import { withTracker } from 'lib/with-tracker'

import {
  NavHeader,
  NavFooter,
  ScrollToTopOnMount,
  PricingSection,
  EnterpriseSection,
  CTASection
} from 'components'

import styles from './styles.module.css'

@withTracker
export class PricingPage extends Component {
  render() {
    return (
      <div className={theme(styles, 'pricing-page')}>
        <ScrollToTopOnMount />

        <NavHeader />

        <div className={theme(styles, 'main')}>
          <div className={theme(styles, 'main-body')}>
            <PricingSection />
          </div>
        </div>

        <EnterpriseSection />

        <CTASection />

        <NavFooter />
      </div>
    )
  }
}
