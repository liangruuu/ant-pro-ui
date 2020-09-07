import React, { Dispatch, useState, useEffect } from 'react';
import { Card, Table, Row, Col, Button, Descriptions, Divider, Popconfirm } from 'antd';
import { Link } from 'umi';
import router from 'umi/router';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Ent, Agencycontract } from '@/models/entity';
import { AgencycontractModelState } from '@/models/agencycontract';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
  agencycontractModel: AgencycontractModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const ContractPutOnRecords: React.FC<IProps> = props => {
  const {
    dispatch,
    location,
    agencycontractModel: {
      listData: { pageSizel, currentPage, total, dataSource },
      nowEnt,
    },
    loading,
  } = props;

  // const [form] = Form.useForm();
  const [firstRender, changeFirstRender] = useState<boolean>(true);
  const [entInfo, setEntInfo] = useState<Ent>();

  // const onFinish = (values: any) => {
  //   dispatch({
  //     type: 'userModel/fetchList',
  //     payload: {
  //       currentPage: 0,
  //       pageSize: pageSizel,
  //       user: {
  //         ...values,
  //         entid: entInfo?.sid,
  //       },
  //     },
  //   });
  // };

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'agencycontractModel/fetchList',
      payload: {
        currentPage: current - 1,
        pageSize,
        agencycontract: { agencyid: entInfo?.sid },
      },
    });
  };

  const handleDelete = (sid: string) => {
    dispatch({
      type: 'agencycontractModel/deleteAgencycontractById',
      payload: { sid },
    });
  };

  const columns = [
    {
      title: '合同名称',
      dataIndex: 'conname',
    },
    {
      title: '合同期起',
      dataIndex: 'constart',
    },
    {
      title: '合同期至',
      dataIndex: 'conend',
    },
    {
      title: '合同金额 ',
      dataIndex: 'conamount',
    },
    {
      title: '上传附件',
      render: (text: Agencycontract, record: Agencycontract) => (
        <a href={record.docurl}>{record.conname}</a>
      ),
    },
    {
      title: '上传人（关联责任人）',
      dataIndex: 'uploader',
    },
    {
      title: '上传日期',
      dataIndex: 'uploaddate',
    },
    {
      title: '操作',
      render: (text: Agencycontract, record: Agencycontract) => (
        <span>
          <Link
            to={{
              pathname: '/info/addcontract',
              state: { agencycontract: record },
            }}
          >
            修改
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除吗?"
            okText="确认"
            cancelText="取消"
            onConfirm={() => handleDelete(record.sid)}
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (location.state != null) {
      dispatch({
        type: 'agencycontractModel/save',
        payload: location.state.ent,
        index: 'nowEnt',
      });
    }
  }, [location]);

  useEffect(() => {
    if (firstRender) {
      if (location.state != null && location.state.ent != null) {
        setEntInfo(location.state.ent);
        dispatch({
          type: 'agencycontractModel/fetchList',
          payload: {
            currentPage,
            pageSize: pageSizel,
            agencycontract: { agencyid: location.state.ent?.sid },
          },
        });
      } else {
        setEntInfo(nowEnt);
        dispatch({
          type: 'agencycontractModel/fetchList',
          payload: {
            currentPage,
            pageSize: pageSizel,
            agencycontract: { agencyid: nowEnt?.sid },
          },
        });
      }
      changeFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper
      onBack={() => {
        router.goBack();
      }}
    >
      <Card>
        <Descriptions title="实体信息">
          <Descriptions.Item label="实体名称">{entInfo?.entname}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">{entInfo?.uniscid}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card>
        <Row gutter={24} style={{ marginBottom: 20 }}>
          <Col span={12} style={{ textAlign: 'left' }}>
            <Button
              style={{ marginLeft: '30px' }}
              type="primary"
              onClick={() => {
                router.push({
                  pathname: '/info/addcontract',
                  state: { ent: entInfo },
                });
              }}
            >
              新增
            </Button>
          </Col>
        </Row>
        <Table<Agencycontract>
          loading={loading.effects['agencycontractModel/fetchList']}
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
  agencycontractModel,
  loading,
}: {
  agencycontractModel: AgencycontractModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}) => ({
  agencycontractModel,
  loading,
});
export default connect(mapStateToProps)(ContractPutOnRecords);
