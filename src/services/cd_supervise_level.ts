import request from '@/utils/request';

export async function fetchCdSuperviseLevel(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_supervise_level/get_supervise_level', {
    method: 'POST',
    data: params,
  });
}
