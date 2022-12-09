export const isLogin = !!localStorage.getItem('userInfo')

export const checkStatus = () => !isLogin ? window.location.href = '/index.html' : null;

export const getUserInfo = () => JSON.parse(localStorage.getItem('userInfo'));

export const logout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
}