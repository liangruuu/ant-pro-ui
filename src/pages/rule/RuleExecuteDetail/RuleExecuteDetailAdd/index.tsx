import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Button, message, Upload, DatePicker, Modal } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

interface IProps {}

const RuleVindicateDetail: React.FC<IProps> = () => {
  const uploadProps = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }: { file: any; fileList: any }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
  };

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList1, setFileList1] = useState<any>([]);

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

  return (
    <PageHeaderWrapper
      onBack={() => {
        router.goBack();
      }}
    >
      <Card>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={24}>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="exeDesc"
                label="执行情况描述"
                rules={[{ required: true, message: '必须输入执行情况描述!' }]}
              >
                <TextArea rows={4} placeholder="请输入执行情况描述" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="exeDate"
                label="执行日期"
                rules={[{ required: true, message: '必须输入执行日期!' }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="cdExeCycle"
                label="录入人"
                rules={[{ required: true, message: '必须输入执行周期!' }]}
              >
                <Input placeholder="请输入执行周期" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="att"
                label="附件pdf"
                rules={[{ required: true, message: '必须输入安全培训记录!' }]}
              >
                <Upload {...uploadProps}>
                  <Button>
                    <UploadOutlined /> 点击上传
                  </Button>
                </Upload>
                ,
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
                  {fileList1.length >= 3 ? null : (
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
            <Col span={20} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={() => {
                  message.success('保存成功');
                  router.goBack();
                }}
              >
                保存
              </Button>
              <Button style={{ marginLeft: '10px' }} onClick={() => router.goBack()}>
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
export default connect(mapStateToProps)(RuleVindicateDetail);
