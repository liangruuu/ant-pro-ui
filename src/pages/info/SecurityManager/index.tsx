import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const SecurityManager: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>manager</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(SecurityManager);
