import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Button, Empty, Radio, Input, Table } from 'antd';
const { TextArea } = Input;
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const LegalPersonCheck: React.FC<IProps> = props => {
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
        <Table columns={columns} dataSource={data} />
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
                router.push("/risk/riskmanagepromise")
              }}
            >保存</Button>
          </Col>
          <Col>
            <Button onClick={() => {
              router.push("/risk/riskmanagepromise")
            }}>取消</Button>
          </Col>
        </Row>

      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(LegalPersonCheck);
