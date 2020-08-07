import React, { useEffect, useState, Dispatch } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';
import { Ent } from '@/models/entity';
import { EntModelState } from '@/models/ent';

interface IProps {
  dispatch: Dispatch<any>;
  entModel: EntModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const InsuranceOrganization: React.FC<IProps> = props => {
  const {
    dispatch,
    entModel: {
      listData: { pageSizel, currentPage, total, dataSource },
      entType,
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
          entType: 'insurance',
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
        ent: { entType: 'insurance' },
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: 'entModel/save',
      payload: 'insurance',
      index: 'entType',
    });
    return () => {
      dispatch({
        type: 'entModel/clean',
        index: 'entType',
      });
    };
  }, [entType]);

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
export default connect(mapStateToProps)(InsuranceOrganization);
