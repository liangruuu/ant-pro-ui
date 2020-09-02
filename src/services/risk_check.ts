import request from '@/utils/request';

export async function getRiskCheckList(params: any) {
  return request('/dapi/v1/tongxiang/backend/risk_check/get_risk_check_record_list', {
    method: 'POST',
    data: params,
  });
}

export async function saveRiskCheckRecord(params: any) {
  return request('/dapi/v1/tongxiang/backend/risk_check/save_risk_check_record', {
    method: 'POST',
    data: params,
  });
}

export async function saveRiskCheckModify(params: any) {
  return request('/dapi/v1/tongxiang/backend/risk_check/save_risk_check_modify', {
    method: 'POST',
    data: params,
  });
}

export async function saveRiskCheckInspect(params: any) {
  return request('/dapi/v1/tongxiang/backend/risk_check/save_risk_check_inspect', {
    method: 'POST',
    data: params,
  });
}

export async function uploadFile(params: any) {
  return request('/dapi/v1/tongxiang/backend/resource/upload', {
    method: 'POST',
    data: params,
  });
}

export async function fetchPic(params: any) {
  return request('/dapi/v1/tongxiang/backend/resource/preview_resource', {
    method: 'POST',
    data: params,
  });
}

export async function fetchFileNameList(params: any) {
  return request('/dapi/v1/tongxiang/backend/resource/query_resource_name', {
    method: 'POST',
    data: params,
  });
}

export async function downloadFile(params: any) {
  return request('/dapi/v1/tongxiang/backend/resource/query_resource', {
    method: 'POST',
    data: params,
  });
}
