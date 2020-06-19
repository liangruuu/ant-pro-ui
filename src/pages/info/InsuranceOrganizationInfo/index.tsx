import React from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const InsuranceOrganizationInfo: React.FC<IProps> = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: '/info/insurancelist',
      query: values,
    });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} name="basicForm" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="name"
                label="企业名称"
                rules={[{ required: true, message: '必须输入企业名称!' }]}
              >
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="address"
                label="详细地址"
                rules={[{ required: true, message: '必须输入详细地址!' }]}
              >
                <Input placeholder="请输入详细地址" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="code"
                label="统一社会信用代码"
                rules={[{ required: true, message: '必须输入统一社会信用代码!' }]}
              >
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="manager"
                label="业务经理"
                rules={[{ required: true, message: '必须输入业务经理!' }]}
              >
                <Input placeholder="请输入业务经理" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="phone"
                label="联系电话"
                rules={[{ required: true, message: '必须输入联系电话!' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col span={20} style={{ marginTop: 10, textAlign: 'right' }}>
              <Button
                style={{ marginRight: 20 }}
                type="primary"
                htmlType="submit"
                onClick={() => router.goBack()}
              >
                保存
              </Button>
              <Button onClick={() => router.goBack()}>取消</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(InsuranceOrganizationInfo);
