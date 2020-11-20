import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { CTAButton, Section, UndrawSVG, theme } from 'react-saasify'

import styles from './styles.module.css'

export class EnterpriseSection extends Component {
  render() {
    return (
      <Section id='self-host' title='Self-Host it Yourself' {...this.props}>
        <p>
          If you do not want to use the SaaS offering above, Reacher is
          <br />
          <strong>open-source</strong> and allows you to host the service
          yourself.
        </p>
        <p>
          Reacher provides its source code under a dual license model designed
          <br />
          to meet the development and distribution needs of both commercial
          <br />
          distributors (such as OEMs, ISVs and VARs) and open source projects.
        </p>

        <UndrawSVG
          name='business_plan'
          className={theme(styles, 'illustration')}
        />

        <Link to='/self-host'>
          <CTAButton>Learn More about Self-Hosting</CTAButton>
        </Link>
      </Section>
    )
  }
}
