import React, { Component } from 'react'

import { CTAButton, Section } from 'react-saasify'

export class CTASection extends Component {
  render() {
    return (
      <Section id='cta' {...this.props}>
        <a href='https://app.reacher.email/signup'>
          <CTAButton>Get started for free</CTAButton>
        </a>
      </Section>
    )
  }
}
