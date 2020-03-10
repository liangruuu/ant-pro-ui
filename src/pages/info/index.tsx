import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const BasicInfo: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>organization</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(BasicInfo);
