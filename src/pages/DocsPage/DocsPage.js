import React, { Component, Suspense } from 'react'
import ErrorBoundary from 'react-error-boundary'
import { theme } from 'react-saasify'
import { observer, inject } from 'mobx-react'
import { withTracker } from 'lib/with-tracker'

import {
  // NavHeader,
  Loading,
  ScrollToTopOnMount,
  NavHeader,
  NavFooter,
  ErrorSection
} from 'components'

import styles from './styles.module.css'

const LazyRedoc = React.lazy(() => import('lib/redoc'))
const LazySwaggerUI = React.lazy(() => import('lib/swagger-ui'))

@inject('config')
@withTracker
@observer
export class DocsPage extends Component {
  state = {
    error: false,
    loading: true
  }

  render() {
    const { deployment } = this.props.config
    const { error, loading } = this.state

    const errorFallback = <ErrorSection />

    if (error) {
      return (
        <div className={theme(styles, 'error-page')}>
          <NavHeader />

          <ScrollToTopOnMount />

          {errorFallback}

          <NavFooter />
        </div>
      )
    }

    const isSwaggerUI = deployment.saas.sections?.docs?.ui === 'swagger-ui'
    const suspenseFallback = isSwaggerUI ? (
      <div className={styles.fill} />
    ) : (
      <Loading title='Loading Docs' />
    )

    return (
      <div className={theme(styles, 'docs-page')}>
        <ScrollToTopOnMount />

        <NavHeader />

        <ErrorBoundary FallbackComponent={errorFallback}>
          <Suspense fallback={suspenseFallback}>
            {loading && !isSwaggerUI && suspenseFallback}

            <div className={theme(null, theme.light, styles.fill)}>
              {isSwaggerUI ? (
                <LazySwaggerUI
                  className={styles.fill}
                  url={deployment.openApiUrl}
                  docExpansion='list'
                  onComplete={this._onComplete}
                />
              ) : (
                <LazyRedoc
                  specUrl={deployment.openApiUrl}
                  options={{
                    suppressWarnings: process.env.NODE_ENV === 'production',
                    hideDownloadButton: true,
                    hideLoading: true,
                    noAutoAuth: true,
                    requiredPropsFirst: true,
                    onlyRequiredInSamples: true,
                    jsonSampleExpandLevel: 4,
                    scrollYOffset: 80,
                    expandResponses: '200',
                    theme: {
                      menu: {
                        backgroundColor: 'white',
                        level1Items: {
                          textTransform: 'uppercase'
                        }
                      },
                      rightPanel: {
                        backgroundColor: 'white'
                      },
                      codeSample: {
                        // backgroundColor: '#263238'
                        backgroundColor: '#11171a'
                      }
                    }
                  }}
                  onLoaded={this._onRedocLoad}
                />
              )}
            </div>
          </Suspense>
        </ErrorBoundary>

        <NavFooter />
      </div>
    )
  }

  _onRedocLoad = (error) => {
    if (error) {
      console.error('Error loading OpenAPI spec', error)
      this.setState({ error })
    } else if (this.state.loading) {
      this.setState({ loading: false })
    }
  }

  _onComplete = () => {
    this.setState({ loading: false })
  }
}
