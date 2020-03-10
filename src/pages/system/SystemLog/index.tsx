import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const SystemLog: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>SystemLog</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(SystemLog);
