import React, { Component } from 'react'

import { Section, UndrawSVG, theme } from 'react-saasify'

import styles from './styles.module.css'

export class ErrorSection extends Component {
  render() {
    const { className, ...rest } = this.props

    const subtitle = (
      <div className={theme(styles, 'desc')}>
        <p>Uh-oh, you ran into an unknown error.</p>

        <p>
          Please try refreshing the page. If the problem persists, please{' '}
          <a href='https://saasify.sh/#/support'>contact us</a>.
        </p>

        <p className={theme(styles, 'detail')}>
          Some privacy add-ons and ad-blocking software may mistake our CORS
          REST requests for suspicious behavior, but there is nothing to worry
          about. Feel free to check the devtools network tab yourself to verify!
        </p>
      </div>
    )

    return (
      <Section
        id='error'
        title='Error'
        subtitle={subtitle}
        className={theme(styles, 'error', className)}
        {...rest}
      >
        <UndrawSVG
          name='/assets/error.png'
          className={theme(styles, 'illustration')}
        />
      </Section>
    )
  }
}
