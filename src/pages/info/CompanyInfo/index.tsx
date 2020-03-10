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
            <div style={{ fontSize: "25px" }}>基本信息</div>
          </Col>
        </Row>
        <Row gutter={[16, 40]}>
          <Col span={12} >企业名称</Col>
          <Col span={12} >经营地址</Col>
        </Row>
        <Row gutter={[16, 40]}>
          <Col span={12} >行业</Col>
          <Col span={12} >所属区域</Col>
        </Row>
        <Row gutter={[16, 40]}>
          <Col span={12} >企业信用代码</Col>
          <Col span={12} >注册资金</Col>
        </Row>
        <Row gutter={[16, 40]}>
          <Col span={12} >成立日期</Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={6}>
            <div style={{ fontSize: "25px" }}>法定代表人信息</div>
          </Col>
        </Row>
        <Row gutter={[16, 40]}>
          <Col span={12} >法定代表人姓名</Col>
          <Col span={12} >性别</Col>
        </Row>
        <Row gutter={[16, 40]}>
          <Col span={12} >身份证号码</Col>
          <Col span={12} >联系电话</Col>
        </Row>
        <Row gutter={[16, 40]}>
          <Col span={12} >手机</Col>
          <Col span={12} >邮箱</Col>
        </Row>
        <Row gutter={[16, 40]}>
          <Col span={12} >住所</Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(BasicInfo);
