import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const OperationRule: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>OperationRule</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(OperationRule);
