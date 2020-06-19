import React from 'react';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const SecurityManager: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '姓名',
      kdataIndexey: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '电话 ',
      dataIndex: 'tele',
    },
    {
      title: '身份证号',
      dataIndex: 'id_number',
    },
    {
      title: '人员类别',
      dataIndex: 'type',
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
            <Col span={6}>
              <Form.Item label="姓名" name="name">
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="电话" name="tele">
                <Input placeholder="请输入电话" />
              </Form.Item>
            </Col>
            <Col span={6} />
            <Col span={6} style={{ textAlign: 'right' }}>
              <Button type="primary">查询</Button>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
                onClick={() => {
                  router.push({
                    pathname: '/info/securitymanagerdetail',
                  });
                }}
              >
                新增
              </Button>
              <Button
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
        <Table columns={columns} dataSource={undefined} />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(SecurityManager);
