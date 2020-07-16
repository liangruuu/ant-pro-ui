import request from '@/utils/request';

export async function fetchCdRegState(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_reg_state/get_reg_state', {
    method: 'POST',
    data: params,
  });
}
