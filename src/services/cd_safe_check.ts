import request from '@/utils/request';

export async function fetchCdSafeCheck(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_safe_check/get_safe_check', {
    method: 'POST',
    data: params,
  });
}
