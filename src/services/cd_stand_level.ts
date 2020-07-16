import request from '@/utils/request';

export async function fetchCdStandLevel(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_stand_level/get_stand_level', {
    method: 'POST',
    data: params,
  });
}
