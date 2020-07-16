import request from '@/utils/request';

export async function fetchCdArea(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_area/get_area', {
    method: 'POST',
    data: params,
  });
}
