import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const EmergencyManage: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>EmergencyManage</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(EmergencyManage);
