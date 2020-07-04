import React from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
  histolocationry: any;
}

const WorkAdvise: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          className="ant-advanced-search-form"
        >
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item label="企业名称">
                <span>浙江飞帆纺织股份信息有限公司</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="统一信用代码">
                <span>31254984351</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="法定代表人">
                <span>张忠华</span>
              </Form.Item>
            </Col>
            <Col span={10} />
            <Col span={10}>
              <Form.Item label="扣分项目" name="subtractItem">
                <Input placeholder="请输入扣分项目" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="分值" name="score">
                <Input placeholder="请输入分值" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="扣分日期" name="subtractDate">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                label="扣分项目说明"
                name="subtractDesc"
              >
                <Input placeholder="请输入扣分项目说明" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="录入人" name="inputer">
                <Input placeholder="请输入录入人" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="录入日期" name="inputdate">
                <Input placeholder="请输入录入日期" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right', marginTop: 30 }}>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
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
                返回
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(WorkAdvise);
