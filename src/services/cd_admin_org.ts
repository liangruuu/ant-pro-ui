import request from '@/utils/request';

export async function fetchAdminOrg(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_admin_org/get_admin_org', {
    method: 'POST',
    data: params,
  });
}
