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
