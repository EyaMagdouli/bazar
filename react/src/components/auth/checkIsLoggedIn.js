export const isLoggedIn = ()=>{
    return !!localStorage.getItem('auth_token')
}