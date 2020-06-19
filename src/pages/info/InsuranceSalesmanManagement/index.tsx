import React from 'react';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const InsuranceSalesmanManagement: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '身份证号 ',
      dataIndex: 'id_number',
    },
    {
      title: '手机号码',
      dataIndex: 'tele',
    },
    {
      title: '职位',
      dataIndex: 'position',
    },
    {
      title: '住所',
      dataIndex: 'address',
    },
  ];

  const data = [
    {
      name: '张忠华',
      sex: '男',
      id_number: '330280199902223333',
      tele: '123456798',
      position: '安全管理员',
      address: '嘉兴市桐乡市',
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
              <Form.Item label="姓名" name="name">
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="电话" name="tele">
                <Input placeholder="请输入电话" />
              </Form.Item>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary">查询</Button>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
                onClick={() => {
                  router.push({
                    pathname: '/info/addinsurancesalesman',
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
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(InsuranceSalesmanManagement);
