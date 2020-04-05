import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const InsuranceOrganizationInfo: React.FC<IProps> = props => {
  const { dispatch } = props;

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: "/info/insurancelist",
      query: values
    })
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form name="basicForm" onFinish={onFinish} >
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="企业名称"
                rules={[{ required: true, message: '必须输入企业名称!' }]}
              >
                <Input
                  placeholder="请输入企业名称"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="address"
                label="详细地址"
                rules={[{ required: true, message: '必须输入详细地址!' }]}
              >
                <Input
                  placeholder="请输入详细地址"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={10}>
              <Form.Item
                name="code"
                label="统一社会信用代码"
                rules={[{ required: true, message: '必须输入统一社会信用代码!' }]}
              >
                <Input
                  placeholder="请输入统一社会信用代码"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="manager"
                label="业务经理"
                rules={[{ required: true, message: '必须输入业务经理!' }]}
              >
                <Input
                  placeholder="请输入业务经理"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="phone"
                label="联系电话"
                rules={[{ required: true, message: '必须输入联系电话!' }]}
              >
                <Input
                  placeholder="请输入联系电话"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{ marginTop: 10 }}
            justify="end">
            <Col style={{ marginRight: 20 }}>
              <Button
                type="primary"
                htmlType="submit"
              >保存</Button>
            </Col>
            <Col>
              <Button onClick={() => {
                console.dir(form);
              }}>取消</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(InsuranceOrganizationInfo);
