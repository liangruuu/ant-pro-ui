import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const RiskWarning: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>RiskWarning</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(RiskWarning);
