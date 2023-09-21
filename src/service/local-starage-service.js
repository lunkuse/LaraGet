const storage = localStorage

export const useLocalStorage = () => {
 
  const clearSession = () => {
    const Language = localStorage.getItem('lang')
    storage.clear()
    localStorage.setItem('lang', Language)
  }

  const saveUser = user => {
    console.log('save user login: current lang', localStorage.getItem('lang'))
    storage.setItem('user', JSON.stringify(user))
    storage.setItem('userID', user?.id)
    storage.setItem('facilityID', user?.facility_id)
  }

  const saveToken = token => {
    storage.setItem('token', token)
  }

  const saveExpiryTime = expiryTimeInSecs => {
    storage.setItem('expires_in', expiryTimeInSecs)
  }

  const user = storage.getItem('user')
    ? JSON.parse(storage.getItem('user'))
    : null

  const token = storage.getItem('token') ? storage.getItem('token') : null

  const saveSession = (user, token, expiryTimeInSecs) => {
    clearSession()
    saveUser(user)
    saveToken(token)
    saveExpiryTime(expiryTimeInSecs)
  }

  return {
    saveUser,
    saveToken,
    saveExpiryTime,
    saveSession,
    clearSession,
    user,
    token
  }
}
