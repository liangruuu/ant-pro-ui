import React, { useEffect, useState } from 'react';
import { Card, Form, Table, Input, Row, Col, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';

interface IProps {
  dispatch: any;
  histolocationry: any;
}

const WorkAdvise: React.FC<IProps> = props => {
  const [form] = Form.useForm();

  const [data, setDataSources] = useState([
    {
      key: 1234,
      name: '浙江飞帆纺织股份信息有限公司',
      legal: '张忠华',
      legal_phone: '123456798',
      address: '嘉兴市桐乡市',
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
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'code',
    },
    {
      title: '法定代表人',
      dataIndex: 'legal',
    },
    {
      title: '法定代表人电话',
      dataIndex: 'legal_phone',
    },
    {
      title: '约谈对象',
      dataIndex: 'address',
    },
    {
      title: '联系电话',
      dataIndex: 'time',
    },
    {
      title: '约谈时间 ',
      dataIndex: 'money',
    },
    {
      title: '约谈时间',
      dataIndex: 'time',
    },
    {
      title: '操作 ',
      render: () => <Link to="/report/admonitiontalkdetail">查看详细信息</Link>,
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
              <Form.Item label="统一社会信用代码">
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="法定代表人">
                <Input placeholder="请输入法定代表人" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="经营地址">
                <Input placeholder="请输入经营地址" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="约谈日期">
                <DatePicker.RangePicker />
              </Form.Item>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" style={{ margin: '0 16px' }}>
                查询
              </Button>
              <Button
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

export default connect(mapStateToProps)(WorkAdvise);
