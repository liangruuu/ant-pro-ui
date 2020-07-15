import request from '@/utils/request';

export async function fetchCdRiskLevel(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_risk_level/get_risk_level', {
    method: 'POST',
    data: params,
  });
}
