import React, { useState } from 'react';
import { Card, Table, Form, Row, Col, Input, Select, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { router } from 'umi';

interface IProps {}

const RiskManagePromise: React.FC<IProps> = () => {
  const [expand, setExpand] = useState<boolean>(false);

  const columns = [
    {
      title: '隐患类别',
      dataIndex: 'type',
    },
    {
      title: '隐患等级',
      dataIndex: 'level',
    },
    {
      title: '存在隐患',
      dataIndex: 'hidden_trouble',
    },
    {
      title: '排查日期',
      dataIndex: 'date',
    },
    {
      title: '整改时限',
      dataIndex: 'limit_time',
    },
    {
      title: '排查人员',
      dataIndex: 'check_person',
    },
    {
      title: '操作',
      key: 'operate',
      render: () => (
        <span>
          <a onClick={() => router.push('/risk/hiddentroubleresolveecheck')}>验收</a>
        </span>
      ),
    },
  ];

  const data = [
    {
      type: '基础安全',
      level: '重大隐患',
      hidden_trouble: '火灾隐患',
      date: '2020/2/20',
      limit_time: '5',
      check_person: '张三',
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="隐患类别">
                <Select>
                  <Select.Option value="type1">基础安全</Select.Option>
                  <Select.Option value="type2">其他1</Select.Option>
                  <Select.Option value="type3">其他2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="隐患等级">
                <Select>
                  <Select.Option value="level1">重大隐患</Select.Option>
                  <Select.Option value="level2">普通隐患</Select.Option>
                  <Select.Option value="level3">其他隐患</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="排查日期">
                <DatePicker.RangePicker allowClear />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: expand ? 'block' : 'none' }}>
              <Form.Item label="整改时限">
                <DatePicker.RangePicker allowClear />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: expand ? 'block' : 'none' }}>
              <Form.Item label="验收意见">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: expand ? 'block' : 'none' }} />
            <Col span={6} style={{ display: expand ? 'block' : 'none' }} />
            <Col span={6} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 10 }}>重置</Button>
              <a style={{ marginLeft: 10, fontSize: 14 }} onClick={() => setExpand(!expand)}>
                {expand ? '收起' : '展开'} {expand ? <UpOutlined /> : <DownOutlined />}
              </a>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card title="企业隐患处理列表">
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
