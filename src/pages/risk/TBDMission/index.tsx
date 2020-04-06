import React from 'react';
import { Card, Table, Alert } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';

interface IProps {}

const RiskManagePromise: React.FC<IProps> = () => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: '检查日期',
      dataIndex: 'date',
    },
    {
      title: '检查类型',
      dataIndex: 'type',
    },
    {
      title: '排查标准数量',
      dataIndex: 'total',
    },
    {
      title: '不通过项 ',
      dataIndex: 'dispass',
    },
    {
      title: '隐患数',
      dataIndex: 'num',
    },
    {
      title: '完成状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      key: 'operate',
      render: () => (
        <span>
          <a onClick={() => router.push('/risk/checksituationrecord')}>检查</a>
        </span>
      ),
    },
  ];

  const data = [
    {
      index: 1,
    },
    {
      index: 2,
    },
    {
      index: 3,
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card title="待完成任务列表">
        <Alert message="当天待完成任务5项" type="warning" showIcon style={{ margin: '10px' }} />
        <Alert message="本周期需完成任务6项" type="info" showIcon style={{ margin: '10px' }} />
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
