import React from 'react';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { Link } from 'umi'
import { connect } from 'dva';
import styles from './index'
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const CompanyList: React.FC<IProps> = props => {
  const { dispatch } = props;

  const [form] = Form.useForm();

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '信用代码',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '所属区域 ',
      dataIndex: 'area',
      key: 'area',
    }, {
      title: '行业',
      dataIndex: 'business',
      key: 'business',
    }, {
      title: '法定代表人',
      dataIndex: 'legal',
      key: 'legal',
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '详情',
      key: 'detail',
      render: (text, record) => (
        <span>
          <Link to="/info/companyinfo">查看详情</Link>
        </span>
      ),
    }
  ]

  const data = [
    {
      key: '1',
      name: '浙江新澳纺织股份有限公司',
      code: '180040800073',
      address: '崇福镇',
      area: '所属区域',
      business: '所属行业',
      legal: '沈剑波',
      phone: '12345678910'
    },
    {
      key: '1',
      name: '浙江新澳纺织股份有限公司',
      code: '180040800073',
      address: '崇福镇',
      area: '所属区域',
      business: '所属行业',
      legal: '沈剑波',
      phone: '12345678910'
    },
    {
      key: '1',
      name: '浙江新澳纺织股份有限公司',
      code: '180040800073',
      address: '崇福镇',
      area: '所属区域',
      business: '所属行业',
      legal: '沈剑波',
      phone: '12345678910'
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          form={form}
          className="ant-advanced-search-form"
        >
          <Row gutter={24}>
            <Col span={6} >
              <Form.Item
                label="企业名称">
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                label="信用代码">
                <Input placeholder="请输入信用代码" />
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                label="法定代表人">
                <Input placeholder="请输入法定代表人" />
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                label="地址">
                <Input placeholder="请输入地址" />
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                label="所属区域">
                <Input placeholder="请输入所属区域" />
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                label="行业">
                <Input placeholder="请输入行业" />
              </Form.Item>
            </Col>
            <Col span={9} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 24 }}
                onClick={() => {
                  form.resetFields();
                }}>
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
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(CompanyList);
