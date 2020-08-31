import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryCurrentUser(params: any): Promise<any> {
  return request('/dapi/v1/tongxiang/backend/user/get_current_user', {
    method: 'POST',
    data: params,
  });
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

export async function fetchUserById(params: any) {
  return request('/dapi/v1/tongxiang/backend/user/get_user_by_id', {
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

export async function getMenu(params: any) {
  return request('/dapi/v1/tongxiang/backend/aaa/query_user_menu', {
    method: 'POST',
    data: params,
  });
}

export async function fetchSafetyOfficers(params: any) {
  return request('/dapi/v1/tongxiang/backend/user/get_safety_officer', {
    method: 'POST',
    data: params,
  });
}
