import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const ReportManage: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>ReportManage</Card>
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(ReportManage);
