import React, { useState } from 'react';
import { Card, Row, Col, Button, Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';

interface IProps {}

const RuleVindicateDetail: React.FC<IProps> = () => {
  const [data] = useState([
    {
      type: 'A',
      cycle: '一个月',
      describe: 'xxxxx',
    },
  ]);

  const columns = [
    {
      title: '执行日期',
      dataIndex: 'date',
    },
    {
      title: '执行情况描述',
      dataIndex: 'situation_describe',
    },
    {
      title: '附件',
      dataIndex: 'att',
    },
    {
      title: '制度执行',
      dataIndex: 'recorder',
    },
  ];

  return (
    <PageHeaderWrapper
      onBack={() => {
        router.goBack();
      }}
    >
      <Card>
        <Row gutter={[16, 24]}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={() => router.push('/rule/ruleexecutedetailadd')}>
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
export default connect(mapStateToProps)(RuleVindicateDetail);
