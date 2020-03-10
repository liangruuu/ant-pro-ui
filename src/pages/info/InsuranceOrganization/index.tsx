import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const InsuranceOrganization: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>insurance</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(InsuranceOrganization);
