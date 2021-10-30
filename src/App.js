import React, { Component } from 'react'
import BodyClassName from 'react-body-classname'

import { toJS } from 'mobx'
import { observer, Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import InnerHTML from 'dangerously-set-html-content'
import removeMd from 'remove-markdown'

import {
  AuthManager,
  ThemeManager,
  AuthenticatedRoute,
  theme,

  // third-party auth flow
  AuthGitHubPage,
  AuthGooglePage,
  AuthSpotifyPage,
  AuthLinkedInPage,
  AuthTwitterPage,
  AuthStripePage
} from 'react-saasify'

import {
  // marketing site
  HomePage,
  PricingPage,
  NotFoundPage,

  // auth flow
  LoginPage,
  LogoutPage,
  SignupPage,

  // authenticated webapp
  DashboardPage
} from './pages'

import deployment from 'lib/deployment'

const saasifyConfig = {
  deployment,
  coupons: deployment.coupons,
  name: deployment.saas.name,
  logo: deployment.saas.logo,
  header: {
    links: [
      {
        label: 'Help Center',
        href: 'https://help.reacher.email'
      },
      {
        label: 'Pricing',
        to: '/pricing'
      }
    ],
    actions: ({ auth }) => {
      return auth.isAuthenticated
        ? [
            {
              href: 'https://app.reacher.email/dashboard',
              type: 'primary',
              icon: 'home',
              label: 'Dashboard'
            },
            {
              to: '/logout',
              type: 'secondary',
              icon: 'logout',
              label: 'Log out'
            }
          ]
        : [
            {
              href: 'https://app.reacher.email/login',
              type: 'secondary',
              label: 'Log in'
            },
            {
              href: 'https://app.reacher.email/signup',
              type: 'primary',
              label: 'Get started'
            }
          ]
    }
  },
  footer: {
    columns: [
      {
        label: 'Sitemap',
        links: [
          {
            label: 'Home',
            to: '/'
          },
          {
            label: 'Pricing',
            to: '/pricing'
          },
          ({ auth }) =>
            auth.isAuthenticated
              ? {
                  label: 'Dashboard',
                  href: 'https://app.reacher.email/dashboard'
                }
              : {
                  label: 'Get started',
                  href: 'https://app.reacher.email/signup'
                },
          ({ auth }) =>
            auth.isAuthenticated
              ? {
                  label: 'Account',
                  href: 'https://app.reacher.email/dashboard'
                }
              : null
        ]
      },
      {
        label: 'Help Center',
        links: [
          {
            label: 'Self-Host',
            href: 'https://help.reacher.email/self-host-guide'
          },
          {
            label: 'Terms of Service',
            href: 'https://help.reacher.email/terms-of-service'
          },
          {
            label: 'Privacy Policy',
            href: 'https://help.reacher.email/privacy-policy'
          },
          {
            label: 'Mentions Légales ',
            href: 'https://help.reacher.email/mentions-lgales'
          },
          {
            label: 'CGU-CGV',
            href: 'https://help.reacher.email/cgu-cgv'
          },
          {
            label: 'Politique de Confidentialité',
            href: 'https://help.reacher.email/politique-de-confidentialit'
          }
        ]
      },
      {
        label: 'Contact Us',
        links: [
          {
            label: 'Email',
            href: 'mailto:amaury@reacher.email'
          },
          {
            label: 'Github',
            href: 'https://github.com/reacherhq/check-if-email-exists'
          },
          {
            label: 'Help Center',
            href: 'https://help.reacher.email'
          }
        ]
      }
    ]
  }
}

@observer
export default class App extends Component {
  render() {
    const { saas } = deployment

    const fonts = toJS(ThemeManager.theme.fonts)
    const themeClassName = `theme-${ThemeManager.theme['@name']}`
    const themeRootClassName = ThemeManager.theme.rootClassName

    return (
      <Provider auth={AuthManager} config={saasifyConfig}>
        <Helmet>
          <title>
            {saas.name}
            {saas.heading ? ` - ${removeMd(saas.heading)}` : ''}
          </title>

          {saas.favicon && <link rel='shortcut icon' href={saas.favicon} />}

          <meta
            name='description'
            content='Reacher is a powerful, free and open-source email verification API service to reduce your bounce rate and avoid spam sign-ups. We check SMTP responses, syntax validation, catch-all addresses and disposable providers.'
          />

          {saas.scripts &&
            saas.scripts.map((src) => (
              <script key={src} src={src} type='text/javascript' />
            ))}

          {saas.styles &&
            saas.styles.map((src) => (
              <link key={src} rel='stylesheet' type='text/css' href={src} />
            ))}

          {fonts &&
            fonts.map((font) => (
              <link
                key={font}
                href={`https://fonts.googleapis.com/css?family=${font}&display=swap`}
                rel='stylesheet'
              />
            ))}

          {saas.cx && <link rel='chrome-webstore-item' href={saas.cx} />}
        </Helmet>

        {saas.htmlPreBody &&
          saas.htmlPreBody.map((src, index) => (
            <InnerHTML key={index} html={src} />
          ))}

        <BodyClassName
          className={theme(null, themeClassName, themeRootClassName)}
        >
          <Router>
            <Switch>
              <Route exact path='/' component={HomePage} />

              <Route path='/pricing' component={PricingPage} />

              <Route path='/login' component={LoginPage} />
              <Route path='/signup' component={SignupPage} />

              <Route path='/auth/github' component={AuthGitHubPage} />
              <Route path='/auth/google' component={AuthGooglePage} />
              <Route path='/auth/spotify' component={AuthSpotifyPage} />
              <Route path='/auth/linkedin' component={AuthLinkedInPage} />
              <Route path='/auth/twitter' component={AuthTwitterPage} />
              <Route path='/auth/stripe' component={AuthStripePage} />

              <AuthenticatedRoute path='/dashboard' component={DashboardPage} />
              <AuthenticatedRoute path='/account' component={DashboardPage} />
              <AuthenticatedRoute path='/checkout' component={DashboardPage} />
              <AuthenticatedRoute path='/logout' component={LogoutPage} />

              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </BodyClassName>

        {saas.htmlPostBody &&
          saas.htmlPostBody.map((src, index) => (
            <InnerHTML key={index} html={src} />
          ))}
      </Provider>
    )
  }
}
