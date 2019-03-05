export function changePassword (password) {
  return {
    type: 'CHANGE_PASSWORD',
    payload: password
  }
}