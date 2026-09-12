const key = 'COOKIE_NOTICE'

export const hasSeenCookieNotice = (): boolean => {
    return localStorage.getItem(key) === 'true'
}

export const setCookieNoticeSeen = (): void => {
    localStorage.setItem(key, 'true')
}