import React from 'react';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
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
              <Form.Item label="法定代表人" name="lerep">
                <Input placeholder="请输入法定代表人" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="法定代表人电话" name="lerep_tel">
                <Input placeholder="请输入法定代表人电话" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                label="经营地址"
                name="address"
              >
                <Input placeholder="请输入经营地址" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
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
