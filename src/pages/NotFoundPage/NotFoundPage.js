import React, { Component } from 'react'
import { theme } from 'react-saasify'
import { withTracker } from 'lib/with-tracker'

import {
  NavHeader,
  NavFooter,
  ScrollToTopOnMount,
  NotFoundSection,
  CTASection
} from 'components'

import styles from './styles.module.css'

@withTracker
export class NotFoundPage extends Component {
  render() {
    return (
      <div className={theme(styles, 'not-found-page')}>
        <NavHeader />

        <ScrollToTopOnMount />

        <div className={theme(styles, 'main')}>
          <div className={theme(styles, 'main-body')}>
            <NotFoundSection />
          </div>
        </div>

        <CTASection />

        <NavFooter />
      </div>
    )
  }
}
