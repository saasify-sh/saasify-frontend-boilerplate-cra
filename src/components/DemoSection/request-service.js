import SaasifySDK from 'saasify-faas-sdk'

const sdk = new SaasifySDK()

export default async ({ auth, service, data }) => {
  sdk.token = auth.consumer?.token

  try {
    const result = await sdk.call(service.url, {
      method: service.httpMethod.toUpperCase(),
      data
    })

    if (result.body && result.contentType) {
      if (result.contentType.startsWith('image/')) {
        result.body = result.body.toString('base64')
      }
    }

    return {
      output: result.body,
      outputContentType: result.contentType,
      outputContentTypeParsed: result.contentTypeParsed,
      hitRateLimit: result.hitRateLimit
    }
  } catch (e) {
    console.log(e.data)
    return { outputError: e.message }
  }
}
