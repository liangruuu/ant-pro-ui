import request from '@/utils/request';

export async function saveAgencycontract(params: any) {
  return request('/dapi/v1/tongxiang/backend/agencycontract/save_agencycontract', {
    method: 'POST',
    data: params,
  });
}

export async function fetchList(params: any) {
  return request('/dapi/v1/tongxiang/backend/agencycontract/get_agencycontract_list', {
    method: 'POST',
    data: params,
  });
}

export async function getAgencycontractById(params: any) {
  return request('/dapi/v1/tongxiang/backend/agencycontract/get_agencycontract_by_id', {
    method: 'POST',
    data: params,
  });
}

export async function deleteAgencycontractById(params: any) {
  return request('/dapi/v1/tongxiang/backend/agencycontract/delete_agencycontract_by_id', {
    method: 'POST',
    data: params,
  });
}
