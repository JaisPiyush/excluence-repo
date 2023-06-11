export function getAuthorizationToken() {
    return window.localStorage.getItem('token')
}

export function setAuthorizationToken(token: string) {
    window.localStorage.setItem('token', token);
}

export function getAuthorizationHeader() {
    const token = getAuthorizationToken()
    return {
        Authorization: `Bearer ${token}`
    }
}