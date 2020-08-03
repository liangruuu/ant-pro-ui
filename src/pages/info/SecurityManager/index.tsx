import React, { useState, useEffect } from 'react';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { UserModelState } from '@/models/user_manage';
import { User } from '@/models/entity';

interface IProps {
  dispatch: Dispatch<any>;
  userModel: UserModelState;
  loading: boolean;
}

const SecurityManager: React.FC<IProps> = props => {
  const {
    dispatch,
    userModel: {
      listData: { pageSizel, currentPage, total, dataSource },
    },
    loading,
  } = props;

  const [form] = Form.useForm();
  const [firstRender, changeFirstRender] = useState<boolean>(true);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '电话 ',
      dataIndex: 'tele',
    },
    {
      title: '身份证号',
      dataIndex: 'idNumber',
    },
    {
      title: '人员类别',
      dataIndex: 'persontype',
    },
  ];

  const onFinish = (values: any) => {
    dispatch({
      type: 'userModel/fetchList',
      payload: {
        currentPage: 0,
        pageSize: pageSizel,
        user: { ...values },
      },
    });
  };

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'userModel/fetchList',
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
              <Form.Item label="姓名" name="name">
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item label="电话" name="tele">
                <Input placeholder="请输入电话" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item label="身份证号" name="idNumber">
                <Input placeholder="请输入身份证号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: 20 }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Button
                style={{ marginLeft: '30px' }}
                type="primary"
                onClick={() => {
                  router.push({
                    pathname: '/info/securitymanagerdetail',
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
        <Table<User>
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{ total, current: currentPage + 1, pageSize: pageSizel }}
          onChange={handleChange}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({
  userModel,
  loading,
}: {
  userModel: UserModelState;
  loading: { models: { [key: string]: boolean } };
}) => ({
  userModel,
  loading: loading.models.userModel,
});
export default connect(mapStateToProps)(SecurityManager);
