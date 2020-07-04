import React from 'react';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const CompanyList: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'entname',
    },
    {
      title: '统一信用代码',
      dataIndex: 'uniscid',
    },
    {
      title: '法定代表人 ',
      dataIndex: 'lerep',
    },
    {
      title: '联系电话',
      dataIndex: 'lerep_tel',
    },
    {
      title: '操作',
      render: () => <Link to="/risk/securityrisklist">录入</Link>,
    },
  ];

  const data = [
    {
      entname: '浙江飞帆纺织股份信息有限公司',
      uniscid: 'SD6DSF354SDF33F',
      lerep: '张忠华',
      lerep_tel: '123456798',
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
              <Form.Item label="企业名称" name="entname">
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="统一社会信用代码" name="uniscid">
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="法定代表人" name="uniscid">
                <Input placeholder="请输入法定代表人" />
              </Form.Item>
            </Col>
            <Col span={16} />
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button type="primary" style={{ marginRight: 20 }}>
                查询
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

export default connect(mapStateToProps)(CompanyList);
