import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Input, Upload, Modal, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
import { Dispatch } from 'redux';
import { CdRiskTypeModelState } from '@/models/cd_risk_type';
import { CdRiskLevelModelState } from '@/models/cd_risk_level';
import { UserModelState } from '@/models/user';
import { UserManageModelState } from '@/models/user_manage';
import { RiskCheckModelState } from '@/models/risk_check';
import { UploadFile } from 'antd/lib/upload/interface';

interface IProps {
  dispatch: Dispatch<any>;
  user: UserModelState;
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
  userModel: UserManageModelState;
  riskCheck: RiskCheckModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}

const HiddenTroubleShootSituationRecord: React.FC<IProps> = props => {
  const {
    dispatch,
    cdRiskType: { cdRiskTypeList },
    cdRiskLevel: { cdRiskLevelList },
    user: { currentUser },
    userModel: { safetyOfficers },
    loading,
  } = props;

  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [checkDate] = useState<Date>(new Date());
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  // eslint-disable-next-line no-shadow
  const handleChange = ({ fileList }: { fileList: Array<UploadFile> }) => setFileList(fileList);

  const onFinish = (values: any) => {
    dispatch({
      type: 'riskCheck/saveRiskCheckRecord',
      payload: {
        entId: currentUser?.userInfo?.entid,
        status: 'checked',
        checker: currentUser?.userid,
        checkDate: checkDate.toISOString().slice(0, checkDate.toISOString().indexOf('T')),
        riskPicList: fileList.map(item => item.response.data),
        ...values,
      },
    });
    router.goBack();
  };

  useEffect(() => {
    if (firstRender) {
      dispatch({
        type: 'cdRiskType/fetchCdRiskType',
      });
      dispatch({
        type: 'cdRiskLevel/fetchCdRiskLevel',
      });
      dispatch({
        type: 'userModel/fetchSafetyOfficers',
        payload: { entId: currentUser?.userInfo?.entid },
      });
      setFirstRender(!firstRender);
    }
  });

  // useEffect(() => {
  //   return () => {
  //     dispatch({
  //       type: 'riskCheck/reset',
  //       payload: undefined,
  //       index: 'fileTokenList',
  //     });
  //   }
  // }, [fileTokenList]);

  return (
    <PageHeaderWrapper>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
        <Card>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="隐患类别" name="riskType">
                <Select placeholder="请选择隐患类别">
                  {cdRiskTypeList?.map(item => (
                    <Select.Option key={item.sid} value={item.sid}>
                      {item.content}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="风险源名称" name="riskSource">
                <Input placeholder="请输入风险源名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="隐患等级" name="riskLevel">
                <Select placeholder="请选择隐患等级">
                  {cdRiskLevelList?.map(item => (
                    <Select.Option key={item.sid} value={item.sid}>
                      {item.content}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="存在隐患" name="riskDescription">
                <Input placeholder="请输入存在隐患" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="整改措施" name="modifyMeasure">
                <Input placeholder="请输入整改措施" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="整改时限" name="modifyTimeLimit">
                <Select placeholder="选择0-30，0代表立即整改">
                  {[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                    30,
                  ].map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="隐患相关照片">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  action="/dapi/v1/tongxiang/backend/resource/upload"
                  name="resource"
                  data={{ owner: currentUser?.userInfo?.tele }}
                  // customRequest={({ file }) => {
                  //   const formData = new FormData();
                  //   formData.set('resource', file);
                  //   if (currentUser != null && currentUser.userInfo != null && currentUser.userInfo.tele != null) {
                  //     formData.set('owner', currentUser.userInfo.tele);
                  //   }
                  //   dispatch({
                  //     type: 'riskCheck/uploadFile',
                  //     payload: formData
                  //   });
                  // }}
                >
                  {fileList.length >= 3 ? null : (
                    <div>
                      <PlusOutlined />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
            </Col>
            <Col span={8} />
            <Col span={8} />
            <Col span={8}>
              <Form.Item label="排查人员">
                <span>{currentUser?.name}</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="排查时间">
                <span>
                  {checkDate.toISOString().slice(0, checkDate.toISOString().indexOf('T'))}
                </span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="整改责任人" name="modifyCharger">
                <Select
                  loading={loading.effects['userModel/fetchSafetyOfficers']}
                  placeholder="请选择整改责任人"
                >
                  {safetyOfficers?.map(item => (
                    <Select.Option key={item.sid} value={item.sid}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={() => router.goBack()}>
            取消
          </Button>
        </Card>
      </Form>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({
  cdRiskType,
  cdRiskLevel,
  user,
  userModel,
  riskCheck,
  loading,
}: {
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
  user: UserModelState;
  userModel: UserManageModelState;
  riskCheck: RiskCheckModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  cdRiskType,
  cdRiskLevel,
  user,
  userModel,
  riskCheck,
  loading,
});
export default connect(mapStateToProps)(HiddenTroubleShootSituationRecord);
