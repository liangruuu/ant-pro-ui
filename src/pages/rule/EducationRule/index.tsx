import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const EducationRule: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>EducationRule</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(EducationRule);
