import $ from '../utils/ajax';

async function queryRequirement(params) {
    return $.post('/medicone/requirement/getListBack', params);
}

async function updateRequirement(params) {
    return $.post('/medicone/requirement/update', params);
}

async function deleteRequirement(params) {
    return $.post('/medicone/requirement/delete', params);
}

export default { queryRequirement, updateRequirement ,deleteRequirement }
