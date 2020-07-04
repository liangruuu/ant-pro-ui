import React from 'react';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';

interface IProps {
  dispatch: any;
  histolocationry: any;
}

const WorkAdvise: React.FC<IProps> = () => {
  const [form] = Form.useForm();

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
      title: '扣分项目',
      dataIndex: 'legal_phone',
    },
    {
      title: '分值',
      dataIndex: 'address',
    },
    {
      title: '录入人',
      dataIndex: 'time',
    },
    {
      title: '扣分日期 ',
      dataIndex: 'money',
    },
    {
      title: '管理',
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
            <Col span={16} />
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" style={{ margin: '0 16px' }}>
                查询
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
              >
                清空
              </Button>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
                onClick={() => {
                  router.push('/report/entcreditratingmanagementrecord');
                }}
              >
                新增
              </Button>
              <Button>导出</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card>
        <Table columns={columns} />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(WorkAdvise);
