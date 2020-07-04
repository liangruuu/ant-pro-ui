import React from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TextArea from 'antd/lib/input/TextArea';

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
            <Col span={10} />
            <Col span={10}>
              <Form.Item label="约谈对象" name="SuggestObject">
                <Input placeholder="请输入约谈对象" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="联系电话" name="tele">
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="约谈时间" name="SuggestDate">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="地点" name="address">
                <Input placeholder="请输入地点" />
              </Form.Item>
            </Col>
            <Col span={20} style={{ marginBottom: 30 }}>
              <Card title="约谈记录" type="inner">
                <Col span={20}>
                  <Form.Item label="约谈事项或者理由（应急办）" name="Reasons">
                    <TextArea rows={4} placeholder="请输入约谈事项或者理由" />
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item label="约谈对象说明情况及态度（约谈人）" name="Explain">
                    <TextArea rows={4} placeholder="请输入约谈对象说明情况及态度" />
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item label="约谈决定（应急办）" name="desition">
                    <TextArea rows={4} placeholder="请输入约谈决定" />
                  </Form.Item>
                </Col>
              </Card>
            </Col>
            <Col span={10}>
              <Form.Item label="约谈人" name="suggester">
                <Input placeholder="请输入约谈人" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="记录人" name="inputer">
                <Input placeholder="请输入记录人" />
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
