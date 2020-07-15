import React from 'react';
import { Card, Form, Row, Col, Button, Table, DatePicker } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const ChemicalsManage: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '录入日期',
      dataIndex: 'date',
    },
    {
      title: '独立仓库',
      dataIndex: 'rep',
    },
    {
      title: '仓库类别 ',
      dataIndex: 'type',
    },
    {
      title: '建立使用台账',
      dataIndex: 'record_if',
    },
    {
      title: '有管理制度',
      dataIndex: 'rule_if',
    },
    {
      title: '年使用量',
      dataIndex: 'num',
    },
    {
      title: '录入人',
      dataIndex: 'recorder',
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
              <Form.Item label="录入日期">
                <DatePicker.RangePicker allowClear />
              </Form.Item>
            </Col>
            <Col span={8} />
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" style={{ marginRight: 16 }}>
                查询
              </Button>
              <Button
                style={{ marginRight: 30 }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card>
        <Row gutter={24} style={{ marginBottom: 20 }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              style={{ marginRight: '30px' }}
              type="primary"
              onClick={() => router.push('/risk/chemicalsmanageinforecord')}
            >
              新增
            </Button>
          </Col>
        </Row>
        <Table columns={columns} />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ChemicalsManage);
