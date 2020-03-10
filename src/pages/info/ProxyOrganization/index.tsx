import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const ProxyOrganization: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>proxy</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(ProxyOrganization);
