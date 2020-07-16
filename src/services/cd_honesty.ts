import request from '@/utils/request';

export async function fetchCdHonesty(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_honesty/get_honesty', {
    method: 'POST',
    data: params,
  });
}
