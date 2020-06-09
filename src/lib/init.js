import ReactGA from 'react-ga'
import { autorun } from 'mobx'
import { bootstrap, AuthManager, ThemeManager, API } from 'react-saasify'
import * as themes from '../themes'

import deployment from './deployment'

if (process.env.REACT_APP_GA) {
  ReactGA.initialize(process.env.REACT_APP_GA)

  ReactGA.set({
    deployment: deployment.id,
    maker: deployment.user,
    project: deployment.project.id || deployment.project
  })
}

bootstrap()

for (const key of Object.keys(themes)) {
  const theme = themes[key]
  ThemeManager.registerTheme(key, theme)
}

ThemeManager.setTheme(deployment.saas.theme || 'okta')

AuthManager.context = {
  hostname: window.location.hostname,
  deployment: deployment.id,
  project: deployment.project.id
}

autorun(() => {
  if (AuthManager.isAuthenticated) {
    ReactGA.set({ userId: AuthManager.user.id })

    API.getConsumerByProject(deployment.project.id, {
      deployment: deployment.id
    }).then(
      (consumer) => {
        AuthManager.consumer = consumer
        ReactGA.set({ consumer: consumer.id })
      },
      (err) => {
        console.warn(err)
        AuthManager.consumer = null
        ReactGA.set({ consumer: null })
      }
    )
  } else {
    AuthManager.consumer = null
    ReactGA.set({ userId: null, consumer: null })
  }
})
