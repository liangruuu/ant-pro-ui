import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const Diagram: React.FC<IProps> = props => {
  const { dispatch } = props;


  return (
    <>
      <Card>Diagram</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(Diagram);
