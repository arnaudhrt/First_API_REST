export function success (result) {
  return {
     status: 'success',
     result: result
  }
}
export function error (message) {
  return {
     status: 'error',
     result: message
  }
}