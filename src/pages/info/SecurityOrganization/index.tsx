import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const SecurityOrganization: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>security</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(SecurityOrganization);
