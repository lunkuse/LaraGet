// Helper function
// Checks Local Storage for user Item.
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token } // for laravel/Spring boot back-end
  } else {
    return {}
  }
}
