import React, { Component } from 'react'
import { theme } from 'react-saasify'
import { observer } from 'mobx-react'
import { withTracker } from 'lib/with-tracker'

import {
  NavHeader,
  NavFooter,
  ScrollToTopOnMount,
  ProfileSection,
  BillingSourcesSection,
  BillingUsageSection,
  InvoicingSection
} from 'components'

import styles from './styles.module.css'

@withTracker
@observer
export class AccountPage extends Component {
  render() {
    return (
      <div className={theme(styles, 'account-page')}>
        <ScrollToTopOnMount />

        <NavHeader fixed />

        <ProfileSection />

        <BillingUsageSection />

        <BillingSourcesSection />

        <InvoicingSection />

        <NavFooter />
      </div>
    )
  }
}
