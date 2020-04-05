import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const ProxyOrganization: React.FC<IProps> = props => {
  const { dispatch } = props;

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: "/info/proxylist",
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
          <Row gutter={19}>
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
            <Col span={9}>
              <Form.Item
                name="time"
                label="成立时间"
                rules={[{ required: true, message: '必须输入成立时间!' }]}
              >
                <Input
                  placeholder="请输入成立时间"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={18}>
            <Col span={10}>
              <Form.Item
                name="money"
                label="注册资金"
                rules={[{ required: true, message: '必须输入注册资金!' }]}
              >
                <Input
                  placeholder="请输入注册资金"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="zizhi"
                label="资质"
                rules={[{ required: true, message: '必须输入资质!' }]}
              >
                <Input
                  placeholder="请输入资质"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={21}>
            <Col span={9}>
              <Form.Item
                name="area"
                label="行政区域"
                rules={[{ required: true, message: '必须输入行政区域!' }]}
              >
                <Input
                  placeholder="请输入行政区域"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="number"
                label="从业人员数量"
                rules={[{ required: true, message: '必须输入从业人员数量!' }]}
              >
                <Input
                  placeholder="请输入从业人员数量"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={21}>
            <Col span={9}>
              <Form.Item
                name="legal"
                label="法定代表人"
                rules={[{ required: true, message: '必须输入法定代表人!' }]}
              >
                <Input
                  placeholder="请输入法定代表人"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="range"
                label="经营范围"
                rules={[{ required: true, message: '必须输入经营范围!' }]}
              >
                <Input
                  placeholder="请输入经营范围"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="status"
                label="经营状态"
                rules={[{ required: true, message: '必须输入经营状态!' }]}
              >
                <Input
                  placeholder="请输入经营状态"
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

export default connect(mapStateToProps)(ProxyOrganization);
