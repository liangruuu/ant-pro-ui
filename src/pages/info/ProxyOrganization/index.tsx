import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button, Select, Divider } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';
import { Dispatch } from 'redux';
import { Ent } from '@/models/entity';
import { CdAdminOrgModelState } from '@/models/cd_admin_org';
import { EntModelState } from '@/models/ent';

interface IProps {
  dispatch: Dispatch<any>;
  entModel: EntModelState;
  cdAdminOrg: CdAdminOrgModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const ProxyOrganization: React.FC<IProps> = props => {
  const {
    dispatch,
    entModel: {
      listData: { pageSizel, currentPage, total, dataSource },
      entType,
    },
    cdAdminOrg: { cdAdminOrgList },
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
              pathname: '/info/proxyinfo',
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
      title: '成立时间',
      dataIndex: 'estdate',
    },
    {
      title: '注册资金 ',
      dataIndex: 'regcap',
    },
    {
      title: '资质',
      dataIndex: 'qualify',
    },
    {
      title: '详细地址',
      dataIndex: 'oploc',
    },
    {
      title: '行政区域',
      dataIndex: 'regorg',
    },
    // {
    //   title: '法定代表人',
    //   dataIndex: 'lerep',
    // },
    // {
    //   title: '联系电话',
    //   dataIndex: 'lerep_tel',
    // },
    {
      title: '操作',
      render: (text: Ent, record: Ent) => (
        <span>
          <Link
            to={{
              pathname: '/info/securitymanager',
              state: { ent: record },
            }}
          >
            人员管理
          </Link>
          <Divider type="vertical" />
          <Link
            to={{
              pathname: '/info/contractputonrecords',
              state: { ent: record },
            }}
          >
            合同备案
          </Link>
        </span>
      ),
    },
  ];

  const onFinish = (values: any) => {
    dispatch({
      type: 'entModel/fetchList',
      payload: {
        currentPage: 0,
        pageSize: pageSizel,
        ent: {
          ...values,
          entType: 'proxy',
        },
      },
    });
  };

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'entModel/fetchList',
      payload: {
        currentPage: current - 1,
        pageSize,
        ent: { entType: 'proxy' },
      },
    });
  };

  const normalize = (value: any) => {
    if (value === '') {
      return null;
    }
    return value;
  };

  useEffect(() => {
    dispatch({
      type: 'entModel/reset',
      payload: 'proxy',
      index: 'entType',
    });
    return () => {
      dispatch({
        type: 'entModel/reset',
        payload: undefined,
        index: 'entType',
      });
    };
  }, [entType]);

  useEffect(() => {
    if (firstRender) {
      dispatch({
        type: 'cdAdminOrg/fetchCdAdminOrg',
      });
      handleChange({ current: currentPage + 1, pageSize: pageSizel });
      changeFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={onFinish}>
          <Row>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item name="entname" label="企业名称" normalize={normalize}>
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item name="regorg" label="行政区域">
                <Select
                  allowClear
                  placeholder="请选择行政区域"
                  loading={loading.effects['cdAdminOrg/fetchCdAdminOrg']}
                >
                  {cdAdminOrgList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={8}>
              <Form.Item name="uniscid" label="统一社会信用代码" normalize={normalize}>
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Button
                type="primary"
                style={{ marginLeft: '30px' }}
                onClick={() => {
                  router.push('/info/proxyinfo');
                }}
              >
                新增
              </Button>
              <Button style={{ margin: '0 16px' }}>导出</Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" style={{ margin: '0 16px' }}>
                查询
              </Button>
              <Button
                style={{ marginRight: '30px' }}
                htmlType="submit"
                onClick={() => {
                  form.resetFields();
                }}
              >
                清空
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
  cdAdminOrg,
  loading,
}: {
  entModel: EntModelState;
  cdAdminOrg: CdAdminOrgModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  entModel,
  cdAdminOrg,
  loading,
});
export default connect(mapStateToProps)(ProxyOrganization);
