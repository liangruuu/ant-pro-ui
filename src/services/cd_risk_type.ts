import request from '@/utils/request';

export async function fetchCdRiskType(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_risk_type/get_risk_type', {
    method: 'POST',
    data: params,
  });
}
