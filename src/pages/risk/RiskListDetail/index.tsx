import React, { useState } from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Button, Input, Upload, Modal } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';

interface IProps {
  dispatch: any;
}

const RiskCheckDetail: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList1, setFileList1] = useState<any>([]);
  const [fileList2, setFileList2] = useState<any>([]);
  const [fileList3, setFileList3] = useState<any>([]);

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

  const handleChange1 = ({ fileList }: any) => setFileList1(fileList);
  const handleChange2 = ({ fileList }: any) => setFileList2(fileList);
  const handleChange3 = ({ fileList }: any) => setFileList3(fileList);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.goBack();
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="name" label="企业名称">
              <span>企业名称</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="legal" label="法定代表人">
              <span>法定代表人</span>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card>
        <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="source"
                label="主要风险源"
                rules={[{ required: true, message: '必须输入主要风险源!' }]}
              >
                <Input placeholder="请输入主要风险源" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="risknum"
                label="风险数量"
                rules={[{ required: true, message: '必须输入风险数量!' }]}
              >
                <Input placeholder="请输入风险数量" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="risklevel"
                label="风险等级"
                rules={[{ required: true, message: '必须输入风险等级!' }]}
              >
                <Input placeholder="请输入风险等级" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="riskType"
                label="主要事故类型"
                rules={[{ required: true, message: '必须输入主要事故类型!' }]}
              >
                <Input placeholder="请输入主要事故类型" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="Preventmethod"
                label="防控措施"
                rules={[{ required: true, message: '必须输入防控措施!' }]}
              >
                <Input placeholder="请输入防控措施" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="charger"
                label="责任人"
                rules={[{ required: true, message: '必须输入责任人!' }]}
              >
                <Input placeholder="请输入责任人" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="operatRule" label="操作规程上传（JPG）">
                <Upload
                  listType="picture-card"
                  fileList={fileList1}
                  onPreview={handlePreview}
                  onChange={handleChange1}
                >
                  {fileList1.length >= 1 ? null : (
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
            <Col span={10}>
              <Form.Item name="riskNotifiy" label="风险告知上传（JPG）">
                <Upload
                  listType="picture-card"
                  fileList={fileList2}
                  onPreview={handlePreview}
                  onChange={handleChange2}
                >
                  {fileList2.length >= 1 ? null : (
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
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="TwoDCode"
                label="二维码（生成后不修改）"
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList3}
                  onPreview={handlePreview}
                  onChange={handleChange3}
                >
                  {fileList3.length >= 1 ? null : (
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
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                style={{ marginRight: 20 }}
                type="primary"
                htmlType="submit"
                onClick={() => {
                  router.goBack();
                }}
              >
                保存
              </Button>
              <Button
                onClick={() => {
                  router.goBack();
                }}
              >
                取消
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RiskCheckDetail);
