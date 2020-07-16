import request from '@/utils/request';

export async function fetchCdEntPersonType(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_ent_person_type/get_person_type', {
    method: 'POST',
    data: params,
  });
}
