import request from '@/utils/request';

export async function fetchCdIndustry(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_industry/get_industry', {
    method: 'POST',
    data: params,
  });
}

export async function fetchSuperviseTypeTree(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_industry/get_supervise_type', {
    method: 'POST',
    data: params,
  });
}
