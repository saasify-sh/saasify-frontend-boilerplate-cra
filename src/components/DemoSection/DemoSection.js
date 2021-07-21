import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { Section, LiveServiceDemo } from 'react-saasify'

// TODO: make service selectable

@inject('config')
@observer
export class DemoSection extends Component {
  render() {
    const { deployment } = this.props.config
    const demo = deployment.saas.sections?.demo
    const image = demo?.image || deployment.saas.exampleImage
    const isEmpty = !image && !deployment.services[0]

    if (demo === false || demo === null || isEmpty) {
      return null
    }

    // TODO: disable if no examples exist on the deployment's services
    return (
      <Section
        id='demo'
        title={demo?.title || (image ? '' : 'Live Demo')}
        {...this.props}
      >
        {image ? (
          <img
            src={image}
            alt='Example Image'
            style={{ maxWidth: '100%' }}
            width={500}
          />
        ) : (
          <LiveServiceDemo
            project={deployment.project}
            deployment={deployment}
            service={{
              ...deployment.services[0],
              url: 'https://api.reacher.email/v0/check_email'
            }}
          />
        )}
      </Section>
    )
  }
}
