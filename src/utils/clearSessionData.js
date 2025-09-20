const PRESERVED_LOCAL_KEYS = new Set(['language', 'i18nextLng'])

const clearSessionData = () => {
    if (typeof window === 'undefined') return

    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i)
        if (key && !PRESERVED_LOCAL_KEYS.has(key)) {
            keysToRemove.push(key)
        }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))

    sessionStorage.clear()

    document.cookie.split(';').forEach((cookie) => {
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
        if (!name) return
        document.cookie =
            name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
    })
}
export default clearSessionData
