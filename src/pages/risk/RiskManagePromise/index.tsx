import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const RiskManagePromise: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>RiskManagePromise</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(RiskManagePromise);
