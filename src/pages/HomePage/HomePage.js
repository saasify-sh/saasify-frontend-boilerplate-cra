import React, { Component } from 'react'
import { theme } from 'react-saasify'
import { observer, inject } from 'mobx-react'
import { withTracker } from 'lib/with-tracker'

import {
  NavHeader,
  NavFooter,
  ScrollToTopOnMount,
  HeroSection,
  FeaturesSection,
  CTASection,
  DemoSection
} from 'components'

import styles from './styles.module.css'

@withTracker
@inject('config')
@observer
export class HomePage extends Component {
  render() {
    const { deployment } = this.props.config
    const demo = deployment.saas.sections?.demo

    return (
      <div className={theme(styles, 'home-page')}>
        <ScrollToTopOnMount />

        <NavHeader />

        <div className={theme(styles, 'main')}>
          <div
            className={theme(
              styles,
              'main-body',
              demo === false && theme(styles, 'main-body-centered')
            )}
          >
            <HeroSection />

            <DemoSection />
          </div>
        </div>

        <FeaturesSection />

        <CTASection />

        <NavFooter />
      </div>
    )
  }
}
