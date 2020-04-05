import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const RiskList: React.FC<IProps> = props => {
  const { dispatch } = props;

  const [form] = Form.useForm();

  const [data, setDataSources] = useState([]);

  useEffect(() => {
    const param = props.location.query;
    const addItemKey = Object.keys(param);
    if (addItemKey.length !== 0) {
      setDataSources([...data, param]);
    }
    console.log(props.location)
  }, []);

  const columns = [
    {
      title: '主要涉及场所',
      dataIndex: 'mainplace',
      key: 'mainplace',
    }, {
      title: '风险排查内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '排查周期',
      dataIndex: 'period',
      key: 'period',
    }, {
      title: '排查部门',
      dataIndex: 'department ',
      key: 'department',
    }, {
      title: '责任人',
      dataIndex: 'legal',
      key: 'legal',
    }, {
      title: '录入人',
      dataIndex: 'staff',
      key: 'staff',
    }, {
      title: '录入日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record) => (
        <span>
          查看详情
        </span>
      ),
    }
  ]

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          form={form}
          className="ant-advanced-search-form"
        >
          <Row gutter={24}>
            <Col span={5.5} >
              <Form.Item
                label="主要涉及场所">
                <Input placeholder="主要涉及场所" />
              </Form.Item>
            </Col>
            <Col span={5.5} >
              <Form.Item
                label="风险排查内容">
                <Input placeholder="请输入风险排查内容" />
              </Form.Item>
            </Col>
            <Col span={6.5} >
              <Form.Item
                label="排查周期">
                <Input placeholder="请输入排查周期" />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={24}>
            <Col span={5.5} >
              <Form.Item
                label="排查部门">
                <Input placeholder="请输入排查部门" />
              </Form.Item>
            </Col>
            <Col span={5.5} >
              <Form.Item
                label="责任人">
                <Input placeholder="请输入责任人" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }} >
              <Button type="primary">
                查询
              </Button>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
                onClick={() => {

                }}>
                新增
              </Button>
              <Button style={{ marginRight: '30px' }}
                onClick={() => {
                  form.resetFields();
                  console.log("dataSources:", data)
                }}>
                重置
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
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(RiskList);
