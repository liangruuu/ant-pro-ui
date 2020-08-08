import request from '@/utils/request';

export async function saveEnt(params: any) {
  return request('/dapi/v1/tongxiang/backend/ent/save_ent', {
    method: 'POST',
    data: params,
  });
}

export async function fetchList(params: any) {
  return request('/dapi/v1/tongxiang/backend/ent/get_ent_list', {
    method: 'POST',
    data: params,
  });
}

export async function getEntById(params: any) {
  return request('/dapi/v1/tongxiang/backend/ent/get_ent_by_id', {
    method: 'POST',
    data: params,
  });
}

export async function getAllEntList(params: any) {
  return request('/dapi/v1/tongxiang/backend/ent/get_all_ent_list', {
    method: 'POST',
    data: params,
  });
}
