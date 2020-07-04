import React, { useState } from 'react';
import { Card, Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';

interface IProps {
  dispatch: any;
}

const RuleExecute: React.FC<IProps> = () => {
  const [data] = useState([
    {
      type: 'A',
      cycle: '一个月',
      describe: 'xxxxx',
    },
  ]);

  const columns = [
    {
      title: '制度类别',
      dataIndex: 'type',
    },
    {
      title: '执行周期',
      dataIndex: 'cyclecycle',
    },
    {
      title: '制度描述',
      dataIndex: 'describeedescribee',
    },
    {
      title: '制度执行',
      render: () => (
        <span>
          <Link to="/rule/ruleexecutedetail">执行</Link>
        </span>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RuleExecute);
