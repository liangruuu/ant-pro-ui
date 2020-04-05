import React, { useState } from 'react';
import { Card, Table, Form, Row, Col, Input, Select, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { router } from 'umi';
import moment from 'moment';

interface IProps {
}

const RiskManagePromise: React.FC<IProps> = props => {
  const [expand, setExpand] = useState<boolean>(false);

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
    }, {
      title: '法定代表人',
      dataIndex: 'legal_person',
    }, {
      title: '联系电话',
      dataIndex: 'phone',
    }, {
      title: '隐患类别',
      dataIndex: 'type',
    }, {
      title: '隐患等级',
      dataIndex: 'level',
    }, {
      title: '存在隐患',
      dataIndex: 'hidden_trouble',
    }, {
      title: '排查日期',
      dataIndex: 'date',
    }, {
      title: '整改时限',
      dataIndex: 'limit_time',
    }, {
      title: '排查人员',
      dataIndex: 'check_person',
    }, {
      title: '整改状态',
      key: 'status',
      render: () => (
        <a onClick={() => router.push('/risk/hiddentroubleresolvetmiddlecheckstatus')}>查看整改状态</a>
      )
    },
  ];

  const data = [
    {
      name: "XXXXXX有限公司",
      legal_person: "李四",
      phone: "18888888888",
      type: "类别1",
      level: "level1",
      hidden_trouble: "火灾隐患",
      date: "2020/2/20",
      limit_time: "5",
      check_person: "张三",
    }
  ]

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="企业名称" >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="隐患类别">
                <Select>
                  <Select.Option value="type1">类别1</Select.Option>
                  <Select.Option value="type2">类别2</Select.Option>
                  <Select.Option value="type3">类别3</Select.Option>
                </Select>
              </Form.Item >
            </Col>
            <Col span={6}>
              <Form.Item label="隐患等级">
                <Select>
                  <Select.Option value="level1">level1</Select.Option>
                  <Select.Option value="level2">level2</Select.Option>
                  <Select.Option value="level3">level3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: expand ? "block" : "none" }}>
              <Form.Item label="排查日期" >
                <DatePicker.RangePicker allowClear />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: expand ? "block" : "none" }}>
              <Form.Item label="整改时限" >
                <DatePicker.RangePicker allowClear />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: expand ? "block" : "none" }}>
              <Form.Item label="验收意见" >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: expand ? "block" : "none" }} />
            <Col span={6} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 10 }} >
                重置
              </Button>
              <Button type="link" style={{ marginLeft: 10 }} >
                导出
              </Button>
              <a style={{ marginLeft: 10, fontSize: 14 }} onClick={() => setExpand(!expand)}>
                {expand ? '收起' : '展开'} {expand ? <UpOutlined /> : <DownOutlined />}
              </a>
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

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
