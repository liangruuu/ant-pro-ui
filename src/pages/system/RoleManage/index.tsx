import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const RoleManage: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>RoleManage</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(RoleManage);
