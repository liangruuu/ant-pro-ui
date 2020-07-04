import React from 'react';
import { Card, Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'umi';

interface IProps {}

const DailyRiskManagePromise: React.FC<IProps> = () => {
  const columns1: ColumnsType<object> = [
    {
      title: '承诺日期',
      dataIndex: 'promise_date',
    },
    {
      title: '录入时间',
      dataIndex: 'record_date',
    },
    {
      title: '录入人',
      dataIndex: 'record_person',
    },
    {
      title: '操作',
      key: 'operate',
      render: () => (
        <span>
          <Link to="/risk/dailyriskmanagepromiserecord">查看指定记录</Link>
        </span>
      ),
    },
  ];

  const data1 = [
    {
      promise_date: '2020/4/3',
      record_date: '2020/4/3 15:43',
      record_person: '张三',
    },
    {
      promise_date: '2020/4/4',
      record_date: '2020/4/4 17:26',
      record_person: '李四',
    },
    {
      promise_date: '2020/4/5',
      record_date: '2020/4/5 16:10',
      record_person: '王五',
    },
    {
      promise_date: '2020/4/6',
      record_date: '2020/4/6 18:03',
      record_person: '赵六',
    },
  ];
  return (
    <PageHeaderWrapper>
      <Card title="企业每日风险承诺列表">
        <Table columns={columns1} dataSource={data1} />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(DailyRiskManagePromise);
