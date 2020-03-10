import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const ContingencyPlan: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>ContingencyPlan</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(ContingencyPlan);
