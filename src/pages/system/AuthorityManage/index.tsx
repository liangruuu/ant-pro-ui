import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const AuthorityManage: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>AuthorityManage</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(AuthorityManage);
