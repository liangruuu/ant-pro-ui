import request from '@/utils/request';

export async function fetchCdIndustry(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_industry/get_industry', {
    method: 'POST',
    data: params,
  });
}
