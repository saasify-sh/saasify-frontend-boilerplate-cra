import React, { Component } from 'react'

import { Section, UndrawSVG, theme } from 'react-saasify'

import styles from './styles.module.css'

export class EnterpriseSection extends Component {
  render() {
    return (
      <Section id='enterprise' title='Enterprise' {...this.props}>
        <p>
          For questions regarding bulk pricing, dedicated support,
          customization, self-hosting, or other enterprise considerations,
          please <a href='mailto:support@reacher.email'>contact us</a>.
        </p>

        <UndrawSVG
          name='business_plan'
          className={theme(styles, 'illustration')}
        />
      </Section>
    )
  }
}
