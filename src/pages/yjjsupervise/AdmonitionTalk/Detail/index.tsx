import React from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button } from 'antd';
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
            <Col span={20} style={{ marginBottom: 30 }}>
              <Card title="约谈记录" type="inner">
                <Col span={20}>
                  <Form.Item label="约谈事项或者理由（应急办）" name="Reasons">
                    <TextArea
                      disabled
                      rows={4}
                      placeholder="xxxxxxxxxxx"
                      defaultValue="xxxxxxxxxxx"
                    />
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item label="约谈对象说明情况及态度（约谈人）" name="Explain">
                    <TextArea
                      disabled
                      rows={4}
                      placeholder="xxxxxxxxxxx"
                      defaultValue="xxxxxxxxxxx"
                    />
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item label="约谈决定（应急办）" name="desition">
                    <TextArea
                      disabled
                      rows={4}
                      placeholder="xxxxxxxxxxx"
                      defaultValue="xxxxxxxxxxx"
                    />
                  </Form.Item>
                </Col>
              </Card>
            </Col>
            <Col span={10}>
              <Form.Item label="约谈人" name="suggester">
                <Input disabled defaultValue="张三" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="记录人" name="inputer">
                <Input disabled placeholder="请输入记录人" defaultValue="李四" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right', marginTop: 30 }}>
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
