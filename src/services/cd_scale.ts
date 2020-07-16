import request from '@/utils/request';

export async function fetchCdScale(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_scale/get_scale', {
    method: 'POST',
    data: params,
  });
}
