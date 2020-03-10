import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const DangeCheckRule: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>DangeCheckRule</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(DangeCheckRule);
