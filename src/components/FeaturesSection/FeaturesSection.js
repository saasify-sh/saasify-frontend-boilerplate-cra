import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import isUrl from 'is-url'
import { observer, inject } from 'mobx-react'

import { Section, UndrawSVG, theme } from 'react-saasify'

import defaultFeatures from './features.json'
import styles from './styles.module.css'

const allowedTypesName = ['strong', 'text', 'emphasis', 'break']

const allowedTypesDesc = [
  'strong',
  'text',
  'emphasis',
  'break',
  'link',
  'linkReference',
  'delete',
  'inlineCode'
]

@inject('config')
@observer
export class FeaturesSection extends Component {
  render() {
    const { deployment } = this.props.config

    const saasFeatures = deployment.saas.features
    const features =
      saasFeatures && saasFeatures.length ? saasFeatures : defaultFeatures

    return (
      <Section id='features' title='Features' stretch {...this.props}>
        <div className={theme(styles, 'features')}>
          {features.map((feature) => {
            const url = isUrl(feature.icon)

            return (
              <div className={theme(styles, 'feature')} key={feature.name}>
                {url ? (
                  <img
                    src={feature.icon}
                    alt={feature.name}
                    className={theme(styles, 'illustration')}
                  />
                ) : (
                  <UndrawSVG
                    name={feature.icon}
                    className={theme(styles, 'illustration')}
                  />
                )}

                <h3>
                  <ReactMarkdown
                    source={feature.name}
                    allowedTypes={allowedTypesName}
                    escapeHtml={false}
                    unwrapDisallowed
                  />
                </h3>

                <p>
                  <ReactMarkdown
                    source={feature.desc}
                    allowedTypes={allowedTypesDesc}
                    escapeHtml={false}
                    linkTarget='_blank'
                    unwrapDisallowed
                  />
                </p>
              </div>
            )
          })}
        </div>
      </Section>
    )
  }
}
