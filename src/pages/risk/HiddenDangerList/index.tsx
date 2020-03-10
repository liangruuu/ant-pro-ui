import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const HiddenDangerList: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>HiddenDangerList</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(HiddenDangerList);
