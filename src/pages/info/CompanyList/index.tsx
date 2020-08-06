import React, { useEffect, useState } from 'react';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { Link } from 'umi';
import router from 'umi/router';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { EntModelState } from '@/models/ent';
import { Ent } from '@/models/entity';

interface IProps {
  dispatch: Dispatch<any>;
  entModel: EntModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const CompanyList: React.FC<IProps> = props => {
  const {
    dispatch,
    entModel: {
      listData: { pageSizel, currentPage, total, dataSource },
    },
    loading,
  } = props;

  const [form] = Form.useForm();
  const [firstRender, changeFirstRender] = useState<boolean>(true);

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'entname',
      render: (text: Ent, record: Ent) => (
        <span>
          <Link
            to={{
              pathname: '/info/companyinfo',
              state: { sid: record.sid },
            }}
          >
            {record.entname}
          </Link>
        </span>
      ),
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'uniscid',
    },
    {
      title: '生产经营地址',
      dataIndex: 'oploc',
    },
    {
      title: '法定代表人',
      dataIndex: 'lerep',
    },
    {
      title: '手机号码 ',
      dataIndex: 'lerepTel',
    },
    {
      title: '所属行业/专业',
      dataIndex: 'industryCategory',
    },
    {
      title: '企业规模',
      dataIndex: 'scale',
    },
  ];

  const onFinish = (values: any) => {
    dispatch({
      type: 'entModel/fetchList',
      payload: {
        currentPage: 0,
        pageSize: pageSizel,
        ent: { ...values },
      },
    });
  };

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'entModel/fetchList',
      payload: {
        currentPage: current - 1,
        pageSize,
      },
    });
  };

  useEffect(() => {
    if (firstRender) {
      handleChange({ current: currentPage + 1, pageSize: pageSizel });
      changeFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={onFinish}
          className="ant-advanced-search-form"
        >
          <Row gutter={24}>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item name="entname" label="企业名称">
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item name="lerep" label="法定代表人">
                <Input placeholder="请输入法定代表人" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={8}>
              <Form.Item name="uniscid" label="统一社会信用代码">
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
            {/* <Col span={6}>
              <Form.Item name="scale" label="规模情况">
                <Input placeholder="请输入规模情况" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="所属行业/专业">
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="企业规模">
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} /> */}
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Button
                type="primary"
                style={{ marginLeft: '30px' }}
                onClick={() => {
                  router.push({
                    pathname: '/info/companyinfo',
                  });
                }}
              >
                新增
              </Button>
              <Button style={{ margin: '0 16px' }}>导出</Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button htmlType="submit" type="primary" style={{ margin: '0 16px' }}>
                查询
              </Button>
              <Button
                style={{ marginRight: '30px' }}
                onClick={() => {
                  form.resetFields();
                }}
                htmlType="submit"
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
        <Table<Ent>
          loading={loading.effects['entModel/fetchList']}
          columns={columns}
          dataSource={dataSource}
          pagination={{ total, current: currentPage + 1, pageSize: pageSizel }}
          onChange={handleChange}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = ({
  entModel,
  loading,
}: {
  entModel: EntModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  entModel,
  loading,
});
export default connect(mapStateToProps)(CompanyList);
