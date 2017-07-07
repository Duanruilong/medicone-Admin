import $ from '../utils/ajax';

async function queryProvider(params) {
    return $.post('/medicone/provider/getList', params);
}

async function updateProvider(params) {
    return $.post('/medicone/admin/provider/update', params);
}
async function insertProvider(params) {
    return $.post('/medicone/admin/provider/insert', params);
}
async function deleteProvider(params) {
    return $.post('/medicone/admin/provider/delete', params);
}
export default { queryProvider, updateProvider, insertProvider ,deleteProvider}
