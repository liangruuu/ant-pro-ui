import React from 'react';
import { Card, Form, Table, Input, Row, Col, Button, Select } from 'antd';
const { Option } = Select;
import { Link } from 'umi'
import router from 'umi/router';
import { connect } from 'dva';
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
      key: 'name',
      render: (text, record) => (
        <span>
          {console.log(record)}
          <Link to={`/info/companyinfo/${record.key}`}>{record.name}</Link>
        </span>
      )
    }, {
      title: '生产经营地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '法定代表人',
      dataIndex: 'legal',
      key: 'legal',
    }, {
      title: '手机号码 ',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '所属行业/专业',
      dataIndex: 'business',
      key: 'business',
    }, {
      title: '企业规模',
      dataIndex: 'size',
      key: 'size',
    }
  ]

  const data = [
    {
      "key": "1234",
      "name": "浙江飞帆纺织股份信息有限公司",
      "address": "嘉兴市桐乡市",
      "legal": "张忠华",
      "phone": "123456798",
      "business": "纺织工业",
      "size": "规上"
    }
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
                label="行政区划">
                <Input placeholder="请输入行政区划" />
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
                label="规模情况">
                <Input placeholder="请输入规模情况" />
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item
                label="所属行业/专业">
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={7} >
              <Form.Item
                label="企业规模">
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={9} style={{ textAlign: 'right' }}>
              <Button type="primary">
                查询
              </Button>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
                onClick={() => {
                  router.push({
                    pathname: "/info/companyinfo/1"
                  })
                }}>
                新增
              </Button>
              <Button
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
