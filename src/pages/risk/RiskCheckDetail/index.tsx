import React, { useState } from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Button, Radio, Input, Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getAuthority } from '@/utils/authority';

const { TextArea } = Input;

interface IProps {
  dispatch: any;
}

const RiskCheckDetail: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const [radioValue, setRadioRadio] = useState(1);

  const columns = [
    {
      title: '主要涉及场所',
      dataIndex: 'mainplace',
      key: 'mainplace',
    },
    {
      title: '风险排查内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '排查周期',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '排查部门',
      dataIndex: 'department ',
      key: 'department',
    },
    {
      title: '责任人',
      dataIndex: 'legal',
      key: 'legal',
    },
    {
      title: '录入人',
      dataIndex: 'record',
      key: 'record',
    },
    {
      title: '录入日期',
      dataIndex: 'date',
      key: 'date',
    },
  ];

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

  const getDate = () => {
    const dateString = new Date().toISOString();
    return dateString.substr(0, dateString.indexOf('T'));
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form name="basicForm" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="name" label="中介名称">
                <span>XX中介公司</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="address" label="联系电话">
                <span>16295655335</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="code" label="录入人">
                <span>张三</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="date" label="录入时间">
                <span>2020-1-1</span>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item name="money" label="说明">
                <span>.............</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="sell" label="状态">
                <span>未审核</span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card title="企业风险清单">
        <Table columns={columns} />
      </Card>
      <br />
      <Card title="审核信息">
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Row gutter={[16, 24]}>
            <Col span={20}>
              <Form.Item name="entConfirm" label="审核意见">
                <Radio.Group onChange={changeRadioValue} value={radioValue}>
                  <Radio value={1}>通过</Radio>
                  <Radio value={2}>不通过</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item name="confirmDesc" label="审核意见描述">
                <TextArea rows={5} cols={100} autoSize={{ minRows: 10, maxRows: 10 }} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="confirmer"
                label="审核人"
              >
                <span>{getAuthority().toString()}</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="confirmDate"
                label="审核时间"
              >
                <span>{getDate()}</span>
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                style={{ marginRight: 20 }}
                type="primary"
                htmlType="submit"
                onClick={() => {
                  router.push('/risk/riskchecklist');
                }}
              >
                保存
              </Button>
              <Button
                onClick={() => {
                  router.push('/risk/riskchecklist');
                }}
              >
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

export default connect(mapStateToProps)(RiskCheckDetail);
