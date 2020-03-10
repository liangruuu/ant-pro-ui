import React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const ChemicalsManage: React.FC<IProps> = props => {
  const { dispatch } = props;

  return (
    <>
      <Card>ChemicalsManage</Card>;
    </>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(ChemicalsManage);
