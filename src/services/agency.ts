import request from '@/utils/request';

export async function saveAgency(params: any) {
  return request('/dapi/v1/tongxiang/backend/agency/save_agency', {
    method: 'POST',
    data: params,
  });
}

export async function fetchList(params: any) {
  return request('/dapi/v1/tongxiang/backend/agency/get_agency_list', {
    method: 'POST',
    data: params,
  });
}

export async function getAgencyById(params: any) {
  return request('/dapi/v1/tongxiang/backend/agency/get_agency_by_id', {
    method: 'POST',
    data: params,
  });
}
