import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const RiskList: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>RiskList</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(RiskList);
