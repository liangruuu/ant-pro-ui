import React, { useEffect, useState, Dispatch } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { AgencyModelState } from '@/models/agency';
import { Link } from 'umi';
import { Agency } from '@/models/entity';

interface IProps {
  dispatch: Dispatch<any>;
  agencyModel: AgencyModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const InsuranceOrganization: React.FC<IProps> = props => {
  const {
    dispatch,
    agencyModel: {
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
      render: (text: Agency, record: Agency) => (
        <span>
          <Link
            to={{
              pathname: '/info/insuranceinfo',
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
      title: '详细地址',
      dataIndex: 'oploc',
    },
    // {
    //   title: '业务经理',
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
          agencytype: 'insurance',
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
        agency: { agencytype: 'insurance' },
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
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={onFinish}>
          <Row>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item name="entname" label="企业名称">
                <Input placeholder="请输入企业名称" />
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
                style={{ marginLeft: '30px' }}
                type="primary"
                onClick={() => {
                  router.push({
                    pathname: '/info/insuranceinfo',
                  });
                }}
              >
                新增
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button style={{ margin: '0 16px' }} type="primary" htmlType="submit">
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
  loading,
}: {
  agencyModel: AgencyModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  agencyModel,
  loading,
});
export default connect(mapStateToProps)(InsuranceOrganization);
