import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button, Select } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';
import { AgencyModelState } from '@/models/agency';
import { Dispatch } from 'redux';
import { Agency } from '@/models/entity';
import { CdAdminOrgModelState } from '@/models/cd_admin_org';

interface IProps {
  dispatch: Dispatch<any>;
  agencyModel: AgencyModelState;
  cdAdminOrg: CdAdminOrgModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const ProxyOrganization: React.FC<IProps> = props => {
  const {
    dispatch,
    agencyModel: {
      listData: { pageSizel, currentPage, total, dataSource },
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
      render: (text: Agency, record: Agency) => (
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
  ];

  const onFinish = (values: any) => {
    dispatch({
      type: 'agencyModel/fetchList',
      payload: {
        currentPage: 0,
        pageSize: pageSizel,
        agency: {
          ...values,
          agencytype: 'proxy',
        },
      },
    });
  };

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'agencyModel/fetchList',
      payload: {
        currentPage: current - 1,
        pageSize,
        agency: { agencytype: 'proxy' },
      },
    });
  };

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
              <Form.Item name="entname" label="企业名称">
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item name="regorg" label="行政区域">
                <Select
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
              <Form.Item name="uniscid" label="统一社会信用代码">
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
        <Table<Agency>
          loading={loading.effects['agencyModel/fetchList']}
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
  agencyModel,
  cdAdminOrg,
  loading,
}: {
  agencyModel: AgencyModelState;
  cdAdminOrg: CdAdminOrgModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  agencyModel,
  cdAdminOrg,
  loading,
});
export default connect(mapStateToProps)(ProxyOrganization);
