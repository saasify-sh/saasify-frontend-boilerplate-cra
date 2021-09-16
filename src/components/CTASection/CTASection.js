import React, { Component } from 'react'

import { CTAButton, Section } from 'react-saasify'

import styles from './styles.module.css'

export class CTASection extends Component {
  render() {
    return (
      <Section id='cta' {...this.props}>
        <h2 className={styles.people}>What other people say about Reacher</h2>
        <div className={styles.blog}>
          <a
            href='https://geekflare.com/email-verification-api/#anchor-reacher'
            rel='noreferrer'
            target='_blank'
          >
            <img
              className={styles.geekflare}
              src='https://geekflare.com/wp-content/themes/geekflare/site/static/images/common/logos/header.png'
            />
          </a>
          <a
            href='https://bigmongolian.com/product/reacher'
            rel='noreferrer'
            target='_blank'
          >
            <img
              className={styles.bigmongolian}
              src='https://bigmongolian.com/wp-content/uploads/2020/09/9.5.jpg'
            />
          </a>
        </div>
        <a className={styles.cta} href='https://app.reacher.email/signup'>
          <CTAButton>Get started for free</CTAButton>
        </a>
      </Section>
    )
  }
}
