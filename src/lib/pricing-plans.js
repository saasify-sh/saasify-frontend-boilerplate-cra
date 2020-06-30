import deployment from './deployment'
import titleize from 'titleize'

// TODO: this should be less strict
function intervalToLabel(intervalS) {
  switch (intervalS) {
    case 60:
      return 'minute'
    case 3600:
      return 'hour'
    case 86400:
      return 'day'
    case 604800:
      return 'week'
    case 2.628e6:
      return 'month'
    default:
      return `${intervalS} seconds`
  }
}

export function formatPrice(price, opts = {}) {
  const { verbose = true } = opts

  const p = price / 100
  const v = p.toFixed(8).replace(/0+$/, '')
  const [d, c] = v.split('.')

  if (c.length === 0) {
    if (verbose) {
      return `${d}.00`
    } else {
      return d
    }
  } else if (c.length === 1) {
    return `${d}.${c}0`
  }

  return v
}

function getRateLimitLabel(rateLimit) {
  if (rateLimit && rateLimit.enabled) {
    if (rateLimit.desc) {
      return rateLimit.desc
    }

    const requestsIntervalLabel = intervalToLabel(rateLimit.requestsInterval)
    return `${rateLimit.requestsMaxPerInterval} / ${requestsIntervalLabel}`
  }
}

function isMetricEnabled(metric) {
  return (
    metric &&
    (metric.billingScheme === 'per_unit'
      ? metric.amount > 0
      : metric.tiers.length > 0)
  )
}

function formatPricingPlan(plan) {
  const isFree = plan.slug === 'free'
  const hasRequestsMeteredBilling = isMetricEnabled(plan.requests)
  const hasMeteredBilling =
    hasRequestsMeteredBilling || (plan.metrics || []).some(isMetricEnabled)
  const defaultDesc = isFree
    ? 'FREE FOREVER'
    : hasMeteredBilling
    ? 'STARTING AT'
    : ''
  const hasRequestsRateLimit = !!plan.rateLimit?.enabled
  const hasRateLimit =
    hasRequestsRateLimit ||
    (plan.metrics || []).some((metric) => metric.rateLimit?.enabled)

  return {
    ...plan,
    original: plan,
    type: isFree ? 'secondary' : 'primary',
    desc: plan.desc || defaultDesc,
    interval: 'mo',
    price: `$${formatPrice(plan.amount, { verbose: false })}`,
    hasRequestsMeteredBilling,
    hasMeteredBilling,
    hasRequestsRateLimit,
    hasRateLimit,
    isFree
  }
}

const pricingPlans = deployment.pricingPlans.map(formatPricingPlan)

export const hasRequestsRateLimits = pricingPlans.some(
  (plan) => plan.hasRequestsRateLimit
)
export const hasRateLimits = pricingPlans.some((plan) => plan.hasRateLimit)
export const hasRequestsMeteredBilling = pricingPlans.some(
  (plan) => plan.hasRequestsMeteredBilling
)
export const hasMeteredBilling = pricingPlans.some(
  (plan) => plan.hasMeteredBilling
)

export const hasFreeTier = pricingPlans.some((plan) => plan.isFree)

const context = {
  hasFreeTier,
  hasRateLimits,
  hasRequestsRateLimits,
  hasMeteredBilling,
  hasRequestsMeteredBilling,
  showMeteredBilling:
    deployment.saas.sections?.pricing?.showMeteredBilling !== false
}

for (const plan of pricingPlans) {
  plan.context = context

  if (hasRequestsMeteredBilling || hasRequestsRateLimits) {
    plan.requests = {
      price: `$${formatPrice(plan.requests.amount, {
        verbose: hasMeteredBilling
      })} / call`,
      rateLimit: getRateLimitLabel(plan.rateLimit)
    }
  } else {
    plan.requests = null
  }

  for (const metric of plan.metrics || []) {
    metric.label = titleize(metric.label)
    metric.price = `$${formatPrice(metric.amount, {
      verbose: hasMeteredBilling
    })} / ${metric.unitLabel}`
    metric.rateLimit = getRateLimitLabel(metric.rateLimit)
  }

  if (!hasRateLimits && !hasMeteredBilling) {
    if (!plan.features || !plan.features.length) {
      plan.features = ['No rate limits']
    }
  }
}

pricingPlans.context = context
// console.log('pricing plans', pricingPlans)

export default pricingPlans
