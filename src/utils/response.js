export function getNetworkErrorMessage(res, customError) {
  if (customError) return customError
  if (!res) return 'No internet connection, please reconnect'
  if (res.status === 401) return 'These credentials are not in our records'
  if (Object.prototype.hasOwnProperty.call(res.data, 'message')) {
    return res.data.message
  }
  return ''
}

export function getResponse(response) {
  if (response && Object.prototype.hasOwnProperty.call(response, 'data')) {
    return response.data
  }
  return null
}

export function getResponseData(response) {
  if (
    response &&
        Object.prototype.hasOwnProperty.call(response, 'data') &&
        Object.prototype.hasOwnProperty.call(response.data, 'payload')
  ) {
    return response.data.payload
  }
  return null
}
