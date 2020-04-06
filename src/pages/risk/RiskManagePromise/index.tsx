import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const RiskManagePromise: React.FC<IProps> = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();

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
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }}>删除</a>
          <a>修改</a>
        </span>
      ),
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
    }, {
      content: "宣传教育制度",
      period: "每月",
      legal: "安管员",
      code: "",
      instruction: "设置周期提醒",
      time: "",
      staff: ""
    }, {
      content: "会议制度",
      period: "每月",
      legal: "安管员",
      code: "",
      instruction: "设置周期提醒",
      time: "",
      staff: ""
    }, {
      content: "安全生产责任制度",
      period: "每月",
      legal: "安管员",
      code: "",
      instruction: "设置周期提醒",
      time: "",
      staff: ""
    }, {
      content: "应急预案",
      period: "每月",
      legal: "安管员",
      code: "",
      instruction: "设置周期提醒",
      time: "",
      staff: ""
    }, {
      content: "操作规程",
      period: "每月",
      legal: "安管员",
      code: "",
      instruction: "安全隐患排查时检查项",
      time: "",
      staff: ""
    }, {
      content: "隐患排查制度",
      period: "每月",
      legal: "安管员",
      code: "",
      instruction: "安全隐患排查时检查项",
      time: "",
      staff: ""
    }
  ]

  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={[24, 18]}>
          <Col span={24} style={{ textAlign: 'right' }} >
            <Button
              type="primary"
              style={{ margin: '0 16px' }}
              onClick={() => {

              }}>
              新增
              </Button>
            <Button style={{ marginRight: '30px' }}
              onClick={() => {
                form.resetFields();
                console.log("dataSources:", data)
              }}>
              导出
              </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(RiskManagePromise);
