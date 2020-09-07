import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Table,
  Input,
  Row,
  Col,
  Button,
  Descriptions,
  Divider,
  Popconfirm,
} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { UserManageModelState } from '@/models/user_manage';
import { User, Ent } from '@/models/entity';
import { Link } from 'umi';
import { EntModelState } from '@/models/ent';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
  userModel: UserManageModelState;
  entModel: EntModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const SecurityManager: React.FC<IProps> = props => {
  const {
    dispatch,
    location,
    userModel: {
      listData: { pageSizel, currentPage, total, dataSource },
      nowEnt,
    },
    entModel: { entDetail },
    loading,
  } = props;

  const [form] = Form.useForm();
  const [firstRender, changeFirstRender] = useState<boolean>(true);
  const [entInfo, setEntInfo] = useState<Ent>();

  const onFinish = (values: any) => {
    dispatch({
      type: 'userModel/fetchList',
      payload: {
        currentPage: 0,
        pageSize: pageSizel,
        user: {
          ...values,
          entid: entInfo?.sid,
        },
      },
    });
  };

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'userModel/fetchList',
      payload: {
        currentPage: current - 1,
        pageSize,
        user: { entid: entInfo?.sid },
      },
    });
  };

  const handleDelete = (sid: string) => {
    dispatch({
      type: 'userModel/deleteUserById',
      payload: { sid },
    });
  };

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
      title: '操作',
      render: (text: User, record: User) => (
        <span>
          <Link
            to={{
              pathname: '/info/securitymanagerdetail',
              state: { ent: entInfo, user: record },
            }}
          >
            修改
          </Link>
          <Divider type="vertical" />
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.sid)}>
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (firstRender) {
      if (location.state != null && location.state.ent != null) {
        setEntInfo(location.state.ent);
        dispatch({
          type: 'userModel/reset',
          payload: location.state.ent,
          index: 'nowEnt',
        });
        dispatch({
          type: 'userModel/fetchList',
          payload: {
            currentPage,
            pageSize: pageSizel,
            user: { entid: location.state.ent.sid },
          },
        });
      } else if (location.state != null && location.state.entId != null) {
        dispatch({
          type: 'userModel/fetchList',
          payload: {
            currentPage,
            pageSize: pageSizel,
            user: { entid: location.state.entId },
          },
        });
        dispatch({
          type: 'entModel/getEntById',
          payload: { sid: location.state.entId },
        });
      } else {
        setEntInfo(nowEnt);
        dispatch({
          type: 'userModel/fetchList',
          payload: {
            currentPage,
            pageSize: pageSizel,
            user: { entid: nowEnt?.sid },
          },
        });
      }
      changeFirstRender(!firstRender);
    }
  });

  useEffect(() => {
    if (entDetail != null) {
      setEntInfo(entDetail);
      dispatch({
        type: 'userModel/reset',
        payload: entDetail,
        index: 'nowEnt',
      });
    }
    return () => {
      dispatch({
        type: 'entModel/reset',
        payload: undefined,
        index: 'entDetail',
      });
    };
  }, [entDetail]);

  return (
    <PageHeaderWrapper
      onBack={() => {
        dispatch({
          type: 'userModel/reset',
          payload: undefined,
          index: 'nowEnt',
        });
        router.goBack();
      }}
    >
      <Card>
        {entInfo ? (
          <Descriptions title="实体信息">
            <Descriptions.Item label="实体类型">
              {entInfo?.entType === 'ent' ? '企业' : null}
              {entInfo?.entType === 'proxy' ? '中介机构' : null}
              {entInfo?.entType === 'insurance' ? '保险机构' : null}
            </Descriptions.Item>
            <Descriptions.Item label="实体名称">{entInfo?.entname}</Descriptions.Item>
            <Descriptions.Item label="统一社会信用代码">{entInfo?.uniscid}</Descriptions.Item>
          </Descriptions>
        ) : null}
      </Card>
      <Card>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={onFinish}>
          <Row>
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
          <Row style={{ marginBottom: 20 }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Button
                style={{ marginLeft: '30px' }}
                type="primary"
                onClick={() => {
                  router.push({
                    pathname: '/info/securitymanagerdetail',
                    state: { ent: entInfo },
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
          loading={loading.effects['userModel/fetchList']}
          columns={columns}
          dataSource={dataSource.map(item => {
            return { ...item, key: item.sid };
          })}
          pagination={{ total, current: currentPage + 1, pageSize: pageSizel }}
          onChange={handleChange}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({
  userModel,
  entModel,
  loading,
}: {
  userModel: UserManageModelState;
  entModel: EntModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}) => ({
  userModel,
  entModel,
  loading,
});
export default connect(mapStateToProps)(SecurityManager);
