import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { CTAButton, Section } from 'react-saasify'

export class CTASection extends Component {
  render() {
    return (
      <Section id='cta' {...this.props}>
        <Link to='/signup'>
          <CTAButton>Get started for free</CTAButton>
        </Link>
      </Section>
    )
  }
}
