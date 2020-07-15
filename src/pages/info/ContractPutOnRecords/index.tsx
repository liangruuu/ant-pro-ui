import React from 'react';
import { Card, Form, Table, Row, Col, Button } from 'antd';
import { Link } from 'umi';
import router from 'umi/router';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const CompanyList: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '合同期起',
      dataIndex: 'date_start',
    },
    {
      title: '合同期至',
      dataIndex: 'date_end',
    },
    {
      title: '合同金额 ',
      dataIndex: 'price',
    },
    {
      title: '上传附件',
      dataIndex: 'attachment ',
    },
    {
      title: '上传人（关联责任人）',
      dataIndex: 'upload_person',
    },
    {
      title: '上传日期',
      dataIndex: 'upload_date',
    },
    {
      title: '操作',
      render: () => <Link to="/info/addcontract">修改</Link>,
    },
  ];

  const data = [
    {
      date_start: '2019-10-11',
      date_end: '2020-2-3',
      price: '￥10000000000',
      attachment: 'XX合同.pdf',
      upload_person: '张三',
      upload_date: '2019-12-1',
    },
  ];

  return (
    <PageHeaderWrapper
      onBack={() => {
        router.goBack();
      }}
    >
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
                <span>企业名称</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="统一社会信用代码" name="uniscid">
                <span>统一社会信用代码</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="法定代表人" name="lerep">
                <span>法定代表人</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="法定代表人电话" name="lerep_tel">
                <span>法定代表人电话</span>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                label="经营地址"
                name="address"
              >
                <span>经营地址</span>
              </Form.Item>
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
              onClick={() => {
                router.push({
                  pathname: '/info/addcontract',
                });
              }}
            >
              新增
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(CompanyList);
