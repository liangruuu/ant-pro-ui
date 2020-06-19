import React from 'react';
import { Card, Form, Input, Row, Col, Button, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import TextArea from 'antd/lib/input/TextArea';

interface IProps {}

const RiskManagePromise: React.FC<IProps> = () => {
  return (
    <PageHeaderWrapper
      onBack={() => {
        router.goBack();
      }}
    >
      <Card>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
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
            <Col span={10}>
              <Form.Item
                name="address"
                label="住址"
                rules={[{ required: true, message: '必须输入住址!' }]}
              >
                <Input placeholder="请输入住址" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="certificate_number"
                label="证书编号"
                rules={[{ required: true, message: '必须输入证书编号!' }]}
              >
                <Input placeholder="请输入证书编号" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="issue_unit"
                label="发证单位"
                rules={[{ required: true, message: '必须输入发证单位!' }]}
              >
                <Input placeholder="请输入发证单位" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="issue_date"
                label="发证日期"
                rules={[{ required: true, message: '必须输入发证日期!' }]}
              >
                <Input placeholder="请输入发证日期" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="expire_date"
                label="失效日期"
                rules={[{ required: true, message: '必须输入失效日期!' }]}
              >
                <Input placeholder="请输入失效日期" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="safety_training"
                label="安全培训记录"
                rules={[{ required: true, message: '必须输入安全培训记录!' }]}
              >
                <TextArea rows={4} placeholder="请输入安全培训记录" />
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
export default connect(mapStateToProps)(RiskManagePromise);
