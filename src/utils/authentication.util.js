const getAuthenticationToken = () => {
    return localStorage.getItem("SessionVault")
}

const setAuthenticationToken = (token) => {
    localStorage.setItem("SessionVault", token)
}

const removeAuthenticationToken = () => {
    localStorage.removeItem("SessionVault")
}

const isUserSessionExists = () => {
    return !!getAuthenticationToken()
}

const clearAllSession = () => {
    localStorage.clear();
    window.location.href = '/'
}

const clearAllSessionAndReload = () => {
    localStorage.clear();
    window.location.reload()
}

export {
    getAuthenticationToken,
    setAuthenticationToken,
    removeAuthenticationToken,
    isUserSessionExists,
    clearAllSession,
    clearAllSessionAndReload,
}