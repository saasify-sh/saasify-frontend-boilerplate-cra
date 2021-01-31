import React, { Component } from 'react'

import { CTAButton, Section, theme } from 'react-saasify'

import styles from './styles.module.css'

export class EnterpriseSection extends Component {
  render() {
    return (
      <Section
        id='self-host'
        title='Questions about the Pricing?'
        {...this.props}
      >
        <p className={theme(styles, 'reply')}>
          Feel free to send us an email, or use the chat box on the bottom right
          corner.
          <br />
          We reply pretty fast. 🚄
        </p>

        <a href='mailto:amaury@reacher.email'>
          <CTAButton>Ask us a question</CTAButton>
        </a>
      </Section>
    )
  }
}
