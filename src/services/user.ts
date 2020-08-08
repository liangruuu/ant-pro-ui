import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function saveUser(params: any) {
  return request('/dapi/v1/tongxiang/backend/user/save_user', {
    method: 'POST',
    data: params,
  });
}

export async function fetchList(params: any) {
  return request('/dapi/v1/tongxiang/backend/user/get_user_list', {
    method: 'POST',
    data: params,
  });
}

export async function deleteUserById(params: any) {
  return request('/dapi/v1/tongxiang/backend/user/delete_user_by_id', {
    method: 'POST',
    data: params,
  });
}
