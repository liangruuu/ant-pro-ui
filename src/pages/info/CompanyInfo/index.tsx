import React from 'react';
import { Card, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const BasicInfo: React.FC<IProps> = props => {
  const { dispatch } = props;
  const style = { background: '#0092ff', padding: '8px 0' };

  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={6}>
            <div style={{ fontSize: "20px", fontWeight: 'bold' }}>基本信息</div>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12} >
            <label>企业名称：</label>
            <label>浙江新澳纺织股份有限公司</label>
          </Col>
          <Col span={12} ><label>经营地址：</label></Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12} ><label>行业：</label></Col>
          <Col span={12} ><label>所属区域：</label></Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12} ><label>企业信用代码：180040800073</label></Col>
          <Col span={12} >注册资金：</Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12} >成立日期：</Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={6}>
            <div style={{ fontSize: "20px", fontWeight: 'bold' }}>法定代表人信息：</div>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12} >法定代表人姓名：沈剑波</Col>
          <Col span={12} >性别：男</Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12} >身份证号码：</Col>
          <Col span={12} >联系电话：</Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12} >手机：12345678910</Col>
          <Col span={12} >邮箱：</Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12} >住所：</Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(BasicInfo);
