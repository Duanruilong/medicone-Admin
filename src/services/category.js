import $ from '../utils/ajax';

async function queryCategory(params) {
    return $.post('/medicone/category/getCategoryList',params);
}

async function queryCategoryBrand(params) {
    return $.post('/medicone/category/getBrandList',params);
}

async function insertCategory(params) {
    return $.post('/medicone/admin/category/insertCategory',params);
}

async function queryById(params) {
    return $.post('/medicone/admin/category/getCategoryById',params);
}

async function updateById(params) {
    return $.post('/medicone/admin/category/updateCategoryById',params);
}

async function getHotList(params) {
    return $.post('/medicone/category/getHotList',params);
}


async function updateCategorySort(params) {
    return $.post('/medicone/admin/category/updateCategorySort',params);
}
export default { queryCategory ,queryCategoryBrand,insertCategory,queryById,updateById,getHotList,updateCategorySort}
