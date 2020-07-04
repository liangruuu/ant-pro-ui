import React, { useState } from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Button, Radio, Input } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { TextArea } = Input;
interface IProps {
  dispatch: any;
}

const DiagramDetail: React.FC<IProps> = () => {
  const [radioValue, setRadioRadio] = useState(1);

  const changeRadioValue = (e: any) => {
    setRadioRadio(e.target.value);
  };

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
        <Form name="basicForm" onFinish={onFinish}>
          <Row>
            <Col span={12} offset={3}>
              <img alt="" style={{ width: 850, height: 450 }} src="/example.png" />
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card>
        <Row gutter={[8, 24]}>
          <Col>
            <span style={{ fontSize: 20 }}>审核信息</span>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col offset={1}>
            <span>审核结果</span>
          </Col>
          <Col>
            <Radio.Group onChange={changeRadioValue} value={radioValue}>
              <Radio value={1}>通过</Radio>
              <Radio value={2}>不通过</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col offset={1}>
            <span>审核意见</span>
          </Col>
          <Col>
            <TextArea rows={10} cols={100} autoSize={{ minRows: 10, maxRows: 10 }} />
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }} justify="end">
          <Col style={{ marginRight: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                router.push('/risk/diagramlist');
              }}
            >
              保存
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                router.push('/risk/diagramlist');
              }}
            >
              取消
            </Button>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(DiagramDetail);
