import React from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button, Upload } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';

interface IProps {
  dispatch: any;
}

const ProxyOrganization: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: '/info/proxylist',
      query: values,
    });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="basicForm"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="data_start"
                label="合同期起"
                rules={[{ required: true, message: '必须输入合同期起!' }]}
              >
                <Input placeholder="请输入合同期起" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="money"
                label="合同期至"
                rules={[{ required: true, message: '必须输入合同期至!' }]}
              >
                <Input placeholder="请输入合同期至" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="price"
                label="合同金额"
                rules={[{ required: true, message: '必须输入合同金额!' }]}
              >
                <Input placeholder="请输入合同金额" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="context" label="合同文本上传(pdf格式)">
                <Upload
                  onChange={({ file, fileList }) => {
                    if (file.status !== 'uploading') {
                      console.log(file, fileList);
                    }
                  }}
                >
                  <Button>
                    <UploadOutlined /> 点击上传
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }} justify="end">
            <Col style={{ marginRight: 20 }}>
              <Button type="primary" htmlType="submit" onClick={() => router.goBack()}>
                保存
              </Button>
            </Col>
            <Col>
              <Button onClick={() => router.goBack()}>取消</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ProxyOrganization);
