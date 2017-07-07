import $ from '../utils/ajax';

async function query(params) {
    return $.post('/medicone/banner/getBannerList');
}

async function deleteBanner(params) {
    return $.get('/medicone/admin/banner/deleteBanner', params);
}

async function updateBanner(params) {
    return $.post('/medicone/admin/banner/updateBanner', params);
}

export default { query, deleteBanner, updateBanner }
