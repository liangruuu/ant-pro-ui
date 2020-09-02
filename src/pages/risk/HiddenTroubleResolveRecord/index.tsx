import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Upload, Modal, Row, Col, Button, Divider, Image } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { router } from 'umi';
import { RiskCheckEntity } from '@/models/entity';
import { Dispatch } from 'redux';
import { UserModelState } from '@/models/user';
import { RiskCheckModelState } from '@/models/risk_check';
import { UploadFile } from 'antd/lib/upload/interface';

interface IProps {
  dispatch: Dispatch<any>;
  user: UserModelState;
  riskCheck: RiskCheckModelState;
  location: any;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const HiddenTroubleResolveRecord: React.FC<IProps> = props => {
  const {
    dispatch,
    user: { currentUser },
    riskCheck: { picBase64List },
    location,
  } = props;

  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [modifyDate] = useState<Date>(new Date());
  const [data, setData] = useState<RiskCheckEntity>();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList1, setFileList1] = useState<Array<UploadFile>>([]);
  const [fileList2, setFileList2] = useState<Array<UploadFile>>([]);

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

  const handleChange1 = ({ fileList }: { fileList: Array<UploadFile> }) => setFileList1(fileList);
  const handleChange2 = ({ fileList }: { fileList: Array<UploadFile> }) => setFileList2(fileList);

  const onFinish = (values: any) => {
    dispatch({
      type: 'riskCheck/saveRiskCheckModify',
      payload: {
        id: data?.id,
        status: 'modified',
        modifier: currentUser?.userid,
        modifyDate: modifyDate.toISOString().slice(0, modifyDate.toISOString().indexOf('T')),
        modifyFileList: fileList1.map(item => item.response.data),
        modifyPicList: fileList2.map(item => item.response.data),
        ...values,
        modifyFlow: {
          flowStep: '整改',
          operateResult: values.modifySituation,
          operator: currentUser?.userid,
          operateDate: modifyDate.toISOString().slice(0, modifyDate.toISOString().indexOf('T')),
        },
      },
    });
    router.goBack();
  };

  useEffect(() => {
    if (firstRender) {
      setData(location.state.record);
      setFirstRender(!firstRender);
      if (location.state.record.riskPicList) {
        dispatch({
          type: 'riskCheck/fetchPic',
          payload: { tokenList: location.state.record.riskPicList },
        });
      }
    }
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Form onFinish={onFinish}>
          <Card title="已录入隐患信息" type="inner">
            <Card>
              <Row>
                <Col span={8}>
                  <Form.Item label="隐患类别">
                    <span>{data?.riskType}</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="风险源名称">
                    <span>{data?.riskSource}</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="隐患等级">
                    <span>{data?.riskLevel}</span>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="存在隐患">
                    <span>{data?.riskDescription}</span>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="整改措施">
                    <span>{data?.modifyMeasure}</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="整改时限">
                    <span>{data?.modifyTimeLimit}</span>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="隐患相关照片">
                    {picBase64List?.map(item => (
                      <Card
                        key={item}
                        bodyStyle={{ padding: 5 }}
                        style={{
                          height: 214,
                          width: 214,
                          marginRight: 20,
                          display: 'inline-flex',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translate(0, -50%)',
                            padding: 4,
                          }}
                          width={200}
                          src={item}
                        />
                      </Card>
                    ))}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="排查人员">
                    <span>{data?.checker}</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="排查时间">
                    <span>{data?.checkDate}</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="整改责任人">
                    <span>{data?.modifyCharger}</span>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Card>
          <br />
          <Divider>请填写整改信息</Divider>
          <Card title="整改信息">
            <Form.Item
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 6 }}
              label="整改情况"
              name="modifySituation"
            >
              <Input placeholder="（完成整改、已管控）" />
            </Form.Item>
            <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} label="上传文档">
              <Upload
                fileList={fileList1}
                onPreview={handlePreview}
                onChange={handleChange1}
                action="/dapi/v1/tongxiang/backend/resource/upload"
                name="resource"
                data={{ owner: currentUser?.userInfo?.tele }}
              >
                <Button>
                  <UploadOutlined /> 点击上传
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} label="上传照片">
              <Upload
                listType="picture-card"
                fileList={fileList2}
                onPreview={handlePreview}
                onChange={handleChange2}
                action="/dapi/v1/tongxiang/backend/resource/upload"
                name="resource"
                data={{ owner: currentUser?.userInfo?.tele }}
              >
                {fileList2.length >= 3 ? null : (
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
            <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} label="整改人">
              <span>{currentUser?.name}</span>
            </Form.Item>
            <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} label="整改日期">
              <span>
                {modifyDate.toISOString().slice(0, modifyDate.toISOString().indexOf('T'))}
              </span>
            </Form.Item>
          </Card>
          <Card style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button style={{ marginLeft: '16px' }} onClick={() => router.goBack()}>
              取消
            </Button>
          </Card>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({
  user,
  riskCheck,
  loading,
}: {
  user: UserModelState;
  riskCheck: RiskCheckModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}) => ({
  user,
  riskCheck,
  loading,
});
export default connect(mapStateToProps)(HiddenTroubleResolveRecord);
