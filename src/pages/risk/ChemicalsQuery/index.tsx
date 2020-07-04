import React from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Input, Table, Radio, Checkbox, Button } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';

interface IProps {
  dispatch: any;
}

const ChemicalsQuery: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const plainOptions1 = ['甲类', '乙类', '丙类', '其他'];

  const data = [
    {
      data: '2020-5-6',
    },
  ];

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
      title: '仓库类别',
      dataIndex: 'rep_type',
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
      title: '易燃易爆',
      dataIndex: 'opinion1',
    },
    {
      title: '有毒有害',
      dataIndex: 'opinion2',
    },
    {
      title: '腐蚀氧化',
      dataIndex: 'opinion3',
    },
    {
      title: '录入人',
      dataIndex: 'recorder',
    },
    {
      title: '操作',
      render: () => (
        <span>
          <Link to="">修改</Link>
        </span>
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: '/info/insurancelist',
      query: values,
    });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="basicForm"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="code" label="企业名称">
                <span>AAAAA</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="date" label="法定代表人">
                <span>法定代表人</span>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="date"
                label="统一信用代码"
              >
                <Input placeholder="请输入图示名称" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="date" label="有独立危化品仓库">
                <Radio.Group>
                  <Radio>是</Radio>
                  <Radio>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="risknum" label="危化品仓库类别">
                <Checkbox.Group
                  options={plainOptions1}
                  // value={this.state.checkedList}
                  // onChange={this.onChange}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="risklevel" label="建立危化品使用台账">
                <Radio.Group>
                  <Radio>是</Radio>
                  <Radio>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="riskType" label="有危化品管理制度">
                <Radio.Group>
                  <Radio>是</Radio>
                  <Radio>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="charger" label="年使用量">
                <Input placeholder="请输入年使用量" />
              </Form.Item>
            </Col>
            <Col span={14} style={{ textAlign: 'right' }}>
              <Button type="primary">查询</Button>
              <Button type="primary" style={{ margin: '0 16px' }}>
                导出
              </Button>
              <Button
                style={{ marginRight: '30px' }}
                onClick={() => {
                  form.resetFields();
                  console.log('dataSources:', data);
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

export default connect(mapStateToProps)(ChemicalsQuery);
