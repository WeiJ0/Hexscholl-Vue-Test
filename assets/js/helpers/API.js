import { createClient } from '@supabase/supabase-js'
import UUID from './UUID.js'
import CryptoJS from 'crypto-js'
import { getUserInfo } from './LoginStatus.js'

const supabaseUrl = 'https://vrvybashmqzmnityvcky.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const key = "WeiJ";

export const signUp = async ({ nickname, email, password }) => {

    let { data: result, error } = await supabase.from('Users').select("email")

        .eq('email', email);

    if (error) {
        return { isSuccess: false, message: error1.message };
    }

    if (result.length > 0) {
        return { isSuccess: false, message: 'email已註冊' };
    }

    password = CryptoJS.HmacSHA256(password, key).toString();

    let { data: user, error: error2 } = await supabase.from('Users')
        .insert(
            {
                id: UUID(),
                nickname,
                email,
                password
            },
        )
        .select();

    if (error2) {
        return { isSuccess: false, message: error1.message };
    }

    user[0].password = '';

    return { isSuccess: true, message: '註冊成功', userInfo: user[0] };

}

export const signIn = async ({ email, password }) => {

    password = CryptoJS.HmacSHA256(password, key).toString();
    
    let { data: user, error } = await supabase.from('Users').select('*')
        .eq('email', email)
        .eq('password', password);

    if (error) {
        return { isSuccess: false, message: error.message };
    }

    if (user.length === 0) {
        return { isSuccess: false, message: '帳號或密碼錯誤' };
    }

    return { isSuccess: true, message: '登入成功', userInfo: user[0] };
}

export const getViews = async (isAdmin) => {

    let views, error;

    if (isAdmin) {
        let userInfo = getUserInfo();
        let result = await supabase.from('Views').select('*').eq('userId', userInfo.id);
        views = result.data;
        error = result.error;
    } else {
        let result = await supabase.from('Views').select('*')
        views = result.data;
        error = result.error;
    }

    if (error) {
        return { isSuccess: false, message: error.message };
    }

    return { isSuccess: true, message: '取得景點成功', views: views };
}

export const getView = async (id) => {

    let view, error, result;

    if (!getUserInfo()) {
        // 沒有登入不用取得收藏資料
        result = await supabase.from('Views').select().eq('id', id);
        view = result.data;
        error = result.error;
    } else {
        result = await supabase.from('Views').select('*, Collects(userId)').eq('id', id).eq('Collects.userId', getUserInfo().id)
        view = result.data;
        error = result.error;
    }

    if (error) {
        return { isSuccess: false, message: error.message };
    }

    if (view.length === 0) {
        return { isSuccess: false, message: '該筆景點不存在' };
    }

    let userInfo = getUserInfo();

    return { isSuccess: true, message: '取得景點成功', view: view[0] };
}

export const addView = async (view) => {
    const { name, content, image } = view;

    console.log(view);

    const userInfo = getUserInfo();
    const viewID = UUID();

    let { data: result, error } = await supabase.from('Views').insert({ id: viewID, name, content, image, userId: userInfo.id });

    if (error) {
        return { isSuccess: false, message: error.message };
    }

    return { isSuccess: true, message: '新增景點成功', viewID };
}

export const updateView = async (view) => {
    const { id, name, content, image } = view;

    let { data: result, error } = await supabase.from('Views').update({ name, content, image }).eq('id', id).select();

    if (error) {
        return { isSuccess: false, message: error.message };
    }

    const viewID = result[0].id;

    return { isSuccess: true, message: '更新景點成功', viewID };
}

export const deleteView = async (id) => {

    let userInfo = getUserInfo();

    let { data: result, error } = await supabase.from('Collects').delete().eq('viewId', id);

    result = await supabase
        .from('Views')
        .delete()
        .eq('id', id)
        .eq('userId', userInfo.id)

    error = result.error;

    if (error) {
        return { isSuccess: false, message: error.message };
    }

    return { isSuccess: true, message: '刪除成功' };
}

export const collectView = async (id) => {
    let userInfo = getUserInfo();
    let isCollected = false;
    let { data: result, error } = await supabase.from('Collects').select('*').eq('userId', userInfo.id).eq('viewId', id);

    if (result.length > 0) {
        isCollected = true;
    }

    if (isCollected) {
        let { data: result, error } = await supabase.from('Collects')
            .delete()
            .eq('userId', userInfo.id)
            .eq('viewId', id);

        if (error) {
            return { isSuccess: false, message: error.message };
        }

        return { isSuccess: true, message: '取消收藏景點成功' };
    }

    result = await supabase.from('Collects')
        .insert({ id: UUID(), userId: userInfo.id, viewId: id });

    error = result.error;

    if (error) {
        return { isSuccess: false, message: error.message };
    }

    return { isSuccess: true, message: '收藏景點成功' };
}

export const getCollects = async () => {
    let userInfo = getUserInfo();
    let { data: collects, error } = await supabase.from('Collects').select('Views(id, name, content, image)').eq('userId', userInfo.id);

    if (error) {
        return { isSuccess: false, message: error.message };
    }

    return { isSuccess: true, message: '取得收藏景點成功', collects };
}