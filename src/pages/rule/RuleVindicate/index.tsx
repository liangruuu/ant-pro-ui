import React, { useState } from 'react';
import router from 'umi/router';
import { Card, Table, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';

interface IProps {
  dispatch: any;
}

const RuleVindicate: React.FC<IProps> = () => {
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
      dataIndex: 'cycle',
    },
    {
      title: '制度描述',
      dataIndex: 'describe',
    },
    {
      title: '操作',
      render: () => (
        <span>
          <Link to="/rule/rulevindicatedetail">维护</Link>
        </span>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={[16, 24]}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={() => router.push('/rule/rulevindicatedetail')}>
              新增
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RuleVindicate);
