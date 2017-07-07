import $ from '../utils/ajax';

async function queryUser(params) {
    return $.post('/medicone/admin/user/getList', params);
}

async function updateUser(params) {
    return $.post('/medicone/admin/user/update', params);
}

async function queryUserRecord(params) {
    return $.post('/medicone/admin/user/getRecordList', params);
}

async function insertUserRecord(params) {
    return $.post('/medicone/admin/user/insertRecord', params);
}

export default { queryUser, queryUserRecord, updateUser ,insertUserRecord}
