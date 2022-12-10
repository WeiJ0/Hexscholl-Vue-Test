export const isLogin = !!localStorage.getItem('userInfo')

// 部分頁面非登入狀態不可進入
export const checkStatus = () => !isLogin ? window.location.href = '/index.html' : null;

// 取得登入會員資料
export const getUserInfo = () => JSON.parse(localStorage.getItem('userInfo'));

export const logout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = './index.html';
}