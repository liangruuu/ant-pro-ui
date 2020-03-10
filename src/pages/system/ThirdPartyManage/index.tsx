import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const ThirdPartyManage: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>ThirdPartyManage</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(ThirdPartyManage);
