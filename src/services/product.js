import $ from '../utils/ajax';

async function queryProduct(params) {
    return $.post('/medicone/product/getProductList',params);
}

async function queryProductById(params) {
    return $.post('/medicone/product/getProductById',params);
}
async function insertProduct(params) {
    return $.post('/medicone/admin/product/insertProduct',params);
}
async function deleteProduct(params) {
    return $.post('/medicone/admin/product/deleteProduct',params);
}
async function updateProduct(params) {
    return $.post('/medicone/admin/product/updateProduct',params);
}
async function deleteProductImage(params) {
    return $.post('/medicone/admin/product/deleteProductImage',params);
}
export default { queryProduct,insertProduct,deleteProduct,updateProduct,deleteProductImage,queryProductById }
