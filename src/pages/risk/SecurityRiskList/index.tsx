import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const RiskList: React.FC<IProps> = props => {
  const [form] = Form.useForm();

  const [data, setDataSources] = useState([]);

  useEffect(() => {
    const param = props.location.query;
    const addItemKey = Object.keys(param);
    if (addItemKey.length !== 0) {
      setDataSources([...data, param]);
    }
    console.log(props.location);
  }, []);

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
      dataIndex: 'staff',
      key: 'staff',
    },
    {
      title: '录入日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'operate',
      render: () => <span>查看详情</span>,
    },
  ];

  return (
    <PageHeaderWrapper
      onBack={() => {
        router.goBack();
      }}
    >
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
                <span>XX企业</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="法定代表人">
                <span>张三</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="录入人" name="inputer">
                <Input placeholder="请输入录入人" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="录入时间" name="inputdate">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                label="说明"
                name="riskDesc"
              >
                <Input placeholder="请输入说明" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="状态" name="status">
                <Input placeholder="请输入状态" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" style={{ margin: '0 16px' }}>
                保存
              </Button>
              <Button type="primary">提交</Button>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
                onClick={() => {
                  router.push('/risk/risklistdetail');
                }}
              >
                新增清单
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RiskList);
