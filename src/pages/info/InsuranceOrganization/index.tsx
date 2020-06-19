import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const InsuranceOrganization: React.FC<IProps> = props => {
  const [form] = Form.useForm();

  const [data, setDataSources] = useState([
    {
      name: '人保嘉兴分公司',
    },
  ]);

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
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '业务经理',
      dataIndex: 'manager',
      key: 'legal',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

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
            <Col span={8}>
              <Form.Item label="企业名称">
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="详细地址">
                <Input placeholder="请输入详细地址" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="统一社会信用代码">
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="业务经理">
                <Input placeholder="请输入业务经理" />
              </Form.Item>
            </Col>
            <Col span={8} />
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary">查询</Button>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
                onClick={() => {
                  router.push({
                    pathname: '/info/insuranceinfo',
                  });
                }}
              >
                新增
              </Button>
              <Button
                style={{ marginRight: '30px' }}
                onClick={() => {
                  form.resetFields();
                  console.log('dataSources:', data);
                }}
              >
                清空
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

export default connect(mapStateToProps)(InsuranceOrganization);
