import $ from '../utils/ajax';

async function login(params) {
    return $.post('/medicone/admin/user/login',params);
}

async function loginOut(params) {
    return $.post('/medicone/admin/user/loginOut');
}
async function geteSys(params) {
    return $.post('/medicone/admin/sys/get',params);
}
async function updateSys(params) {
    return $.post('/medicone/admin/sys/update',params);
}

export default { login,loginOut ,geteSys,updateSys}
