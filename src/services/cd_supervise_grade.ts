import request from '@/utils/request';

export async function fetchCdSuperviseGrade(params: any) {
  return request('/dapi/v1/tongxiang/backend/cd_supervise_grade/get_supervise_grade', {
    method: 'POST',
    data: params,
  });
}
