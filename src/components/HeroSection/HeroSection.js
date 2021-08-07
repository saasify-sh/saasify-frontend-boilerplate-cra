import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ReactMarkdown from 'react-markdown'

import { CTAButton, Section, theme } from 'react-saasify'

import styles from './styles.module.css'

const allowedTypes = ['strong', 'text', 'break']

@inject('config')
@observer
export class HeroSection extends Component {
  render() {
    const { deployment } = this.props.config
    const { saas } = deployment
    const hero = saas?.sections?.hero

    return (
      <Section
        id='hero'
        title={
          <ReactMarkdown
            source={saas.heading}
            allowedTypes={allowedTypes}
            unwrapDisallowed
          />
        }
        subtitle={
          <ReactMarkdown
            source={saas.subheading}
            allowedTypes={allowedTypes}
            unwrapDisallowed
          />
        }
        {...this.props}
      >
        {hero?.image && (
          <img className={theme(styles, 'image')} src={hero.image} />
        )}

        <a href='https://app.reacher.email/signup'>
          <CTAButton>{hero?.cta || 'Get started'}</CTAButton>
        </a>
      </Section>
    )
  }
}
