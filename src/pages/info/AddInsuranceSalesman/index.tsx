import React from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const AddInsuranceSalesman: React.FC<IProps> = () => {
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
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} name="basicForm" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="name"
                label="姓名"
                rules={[{ required: true, message: '必须输入姓名!' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="sex"
                label="性别"
                rules={[{ required: true, message: '必须输入性别!' }]}
              >
                <Input placeholder="请输入性别" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="id_number"
                label="身份证号"
                rules={[{ required: true, message: '必须输入身份证号!' }]}
              >
                <Input placeholder="请输入身份证号" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="tele"
                label="手机号码"
                rules={[{ required: true, message: '必须输入手机号码!' }]}
              >
                <Input placeholder="请输入手机号码" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="position"
                label="职务"
                rules={[{ required: true, message: '必须输入职务!' }]}
              >
                <Input placeholder="请输入职务" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="address"
                label="住所"
                rules={[{ required: true, message: '必须输入住所!' }]}
              >
                <Input placeholder="请输入住所" />
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

export default connect(mapStateToProps)(AddInsuranceSalesman);
