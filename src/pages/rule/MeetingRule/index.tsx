import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const MeetingRule: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>MeetingRule</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(MeetingRule);
