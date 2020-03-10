import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const Report: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>Report</Card>
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(Report);
