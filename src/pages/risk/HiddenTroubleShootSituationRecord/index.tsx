import React, { useState } from 'react';
import { Card, Form, Select, Input, Upload, Modal, Row, Col, Button, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
import StandardFormRow from './components/StandardFormRow';

interface IProps {}

const RiskManagePromise: React.FC<IProps> = () => {
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

  return (
    <PageHeaderWrapper>
      <Form>
        <Card>
          <StandardFormRow grid style={{ paddingBottom: 11 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="隐患类别">
                  <Select defaultValue="type1">
                    <Select.Option value="type1">基础安全</Select.Option>
                    <Select.Option value="type2">其他1</Select.Option>
                    <Select.Option value="type3">其他2</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="隐患等级">
                  <Select defaultValue="level1">
                    <Select.Option value="level1">重大隐患</Select.Option>
                    <Select.Option value="level2">普通隐患</Select.Option>
                    <Select.Option value="level3">其他隐患</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
          <StandardFormRow grid style={{ paddingBottom: 11 }}>
            <Form.Item label="存在隐患">
              <Input />
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow grid last style={{ paddingBottom: 11 }}>
            <Form.Item label="整改措施">
              <Input />
            </Form.Item>
          </StandardFormRow>
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
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="整改时限">
                <Select>
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
            <Col span={6}>
              <Form.Item label="排查人员（当前用户）">
                <Input disabled defaultValue="张三" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="排查时间（当前时间）">
                <Input disabled defaultValue="2020/2/20" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="整改责任人">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              message.success('保存成功');
              router.replace('/risk/hiddentroubleshootsituation');
            }}
          >
            保存
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => router.replace('/risk/hiddentroubleshootsituation')}
          >
            取消
          </Button>
        </Card>
      </Form>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
