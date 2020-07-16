import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Input, Upload, Modal, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
import { getAuthority } from '@/utils/authority';
import { Dispatch } from 'redux';
import { CdRiskTypeModelState } from '@/models/cd_risk_type';
import { CdRiskLevelModelState } from '@/models/cd_risk_level';

interface IProps {
  dispatch: Dispatch<any>;
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
}

const HiddenTroubleShootSituationRecord: React.FC<IProps> = props => {
  const {
    dispatch,
    cdRiskType: { cdRiskTypeList },
    cdRiskLevel: { cdRiskLevelList },
  } = props;

  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [checker] = useState<string>(getAuthority().toString());
  const [checkDate] = useState<Date>(new Date());
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList, setFileList] = useState<any>([]);

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
  const handleChange = ({ fileList }: any) => setFileList(fileList);

  const onFinish = (values: any) => {
    dispatch({
      type: 'riskCheck/saveRiskCheckRecord',
      payload: {
        entId: getAuthority().toString(),
        status: 'checked',
        checker,
        checkDate: checkDate.toISOString().slice(0, checkDate.toISOString().indexOf('T')),
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
      setFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
        <Card>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="隐患类别" name="riskType">
                <Select placeholder="请选择隐患类别">
                  {cdRiskTypeList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
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
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
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
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <br />
        <Card title="上传隐患相关照片(最大三张）">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
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
        </Card>
        <br />
        <Card>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="排查人员">
                <span>{checker}</span>
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
                <Input placeholder="请输入整改责任人" />
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
  loading,
}: {
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
  loading: { models: { [key: string]: boolean } };
}) => ({
  cdRiskType,
  cdRiskLevel,
  loading: loading.models.CdEntPersonType,
});
export default connect(mapStateToProps)(HiddenTroubleShootSituationRecord);
