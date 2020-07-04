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
      dataIndex: 'shoot_person',
    },
    {
      title: '整改责任人',
      dataIndex: 'response_person',
    },
    {
      title: '整改情况描述',
      dataIndex: 'situation',
    },
    {
      title: '验收意见',
      dataIndex: 'opinion',
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
                  <Select.Option value="type1">类别1</Select.Option>
                  <Select.Option value="type2">类别2</Select.Option>
                  <Select.Option value="type3">类别3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="风险源名称">
                <Select>
                  <Select.Option value="type1">源1</Select.Option>
                  <Select.Option value="type2">源2</Select.Option>
                  <Select.Option value="type3">源3</Select.Option>
                </Select>
              </Form.Item>
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
            <Col span={6} style={{ display: expand ? 'block' : 'none' }}>
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
            <Col span={6} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                type="link"
                htmlType="submit"
                onClick={() => router.push('/risk/hiddentroubleshootsituationrecord')}
              >
                新增
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
        <Table columns={columns} />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
