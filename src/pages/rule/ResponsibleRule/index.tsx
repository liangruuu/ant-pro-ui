import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const ResponsibleRule: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>ResponsibleRule</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(ResponsibleRule);
