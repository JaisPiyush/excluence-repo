export function getAuthorizationToken() {
    return window.localStorage.getItem('token')
}

export function setAuthorizationToken(token: string) {
    // console.log('setting token')
    window.localStorage.setItem('token', token);
}

export function clearAuthorizationToken() {
    window.localStorage.removeItem('token')
}

export function getAuthorizationHeader() {
    const token = getAuthorizationToken()
    return {
        Authorization: `Bearer ${token}`
    }
}