import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Button, Empty, Radio, Input, Table } from 'antd';
const { TextArea } = Input;
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const RiskManagePromiseCheck: React.FC<IProps> = props => {
  const { dispatch } = props;

  const [form] = Form.useForm();

  const [radioValue, setRadioRadio] = useState(1);

  const columns = [
    {
      title: '承诺内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '检查周期',
      dataIndex: 'period',
      key: 'period',
    }, {
      title: '责任人',
      dataIndex: 'legal',
      key: 'legal',
    }, {
      title: '企业码',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '说明',
      dataIndex: 'instruction',
      key: 'instruction',
    }, {
      title: '录入时间',
      dataIndex: 'time',
      key: 'date',
    }, {
      title: '录入人',
      dataIndex: 'staff',
      key: 'staff',
    }, {
      title: '操作',
      key: 'operate',
    }
  ];

  const data = [
    {
      content: "警示、告知卡",
      period: "每月",
      legal: "安管员",
      code: "",
      instruction: "安全隐患排查时检查项",
      time: "",
      staff: ""
    }
  ]

  const changeRadioValue = (e: any) => {
    setRadioRadio(e.target.value);
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: "/info/insurancelist",
      query: values
    })
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form name="basicForm" onFinish={onFinish} >
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="企业名称"
              >
                <label>企业名称</label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="address"
                label="详细地址"
              >
                <label>详细地址</label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="code"
                label="统一社会信用代码"
              >
                <label>统一社会信用代码</label>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="date"
                label="成立时间"
              >
                <label>成立时间</label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="money"
                label="注册资金"
              >
                <label>注册资金</label>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="sell"
                label="年销售额"
              >
                <label>年销售额</label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="area"
                label="行政区域"
              >
                <label>行政区域</label>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="legal"
                label="法定代表人"
              >
                <label>法定代表人</label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col span={8}>
              <Form.Item
                name="phone"
                label="联系电话"
              >
                <label>联系电话</label>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="risk"
                label="风险隐患"
              >
                <label>风险隐患</label>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row gutter={[8, 24]}>
          <Col>
            <label style={{ fontSize: 20, fontWeight: "bold" }}>企业风险清单</label>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
        <Row gutter={[8, 24]}>
          <Col>
            <label style={{ fontSize: 20, fontWeight: "bold" }}>法定代表人审批意见</label>
          </Col>
        </Row>
        <Form name="basicForm" onFinish={onFinish} >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="result"
                label="审核结果"
              >
                <label>审核结果</label>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="date"
                label="审核时间"
              >
                <label>审核时间</label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="person"
                label="审核人"
              >
                <label>审核人</label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="suggestion"
                label="审核意见"
              >
                <label>审核意见</label>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card>
        <Row gutter={[8, 24]}>
          <Col>
            <label style={{ fontSize: 20 }}>审核信息</label>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col offset={1}>
            <label >审核结果</label>
          </Col>
          <Col>
            <Radio.Group onChange={changeRadioValue} value={radioValue}>
              <Radio value={1}>通过</Radio>
              <Radio value={2}>不通过</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col offset={1}>
            <label >审核意见</label>
          </Col>
          <Col>
            <TextArea
              rows={10}
              cols={100}
              autoSize={{ minRows: 10, maxRows: 10 }}
            />
          </Col>
        </Row>
        <Row
          style={{ marginTop: 10 }}
          justify="end">
          <Col style={{ marginRight: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                router.push("/risk/riskreadytochecklist")
              }}
            >保存</Button>
          </Col>
          <Col>
            <Button onClick={() => {
              router.push("/risk/riskreadytochecklist")
            }}>取消</Button>
          </Col>
        </Row>

      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(RiskManagePromiseCheck);
