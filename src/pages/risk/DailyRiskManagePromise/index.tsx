import React, { useState } from 'react';
import { Card, Table, Button, Form, Select, Modal, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ColumnsType } from 'antd/lib/table';

interface IProps {
}

const RiskManagePromise: React.FC<IProps> = props => {
  const [visable, setVisable] = useState<boolean>(false);

  const columns1: ColumnsType<object> = [
    {
      title: '承诺日期',
      dataIndex: 'promise_date',
    }, {
      title: '录入时间',
      dataIndex: 'record_date',
    }, {
      title: '录入人',
      dataIndex: 'record_person',
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record) => (
        <span>
          <a>查看指定记录</a>
        </span>
      ),
    },
  ]

  const columns2: ColumnsType<object> = [
    {
      title: '编码',
      dataIndex: 'code',
    }, {
      title: '承诺内容',
      dataIndex: 'content',
    }, {
      title: '检查周期',
      dataIndex: 'period',
    }, {
      title: '责任人',
      dataIndex: 'legal',
    }, {
      title: '次数',
      dataIndex: 'time',
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record) => (
        <span>
          <a onClick={() => setVisable(true)}>新增</a>
        </span>
      ),
    },
  ];

  const data1 = [
    {
      promise_date: "2020/4/3",
      record_date: "2020/4/3 15:43",
      record_person: "张三",
    }, {
      promise_date: "2020/4/4",
      record_date: "2020/4/4 17:26",
      record_person: "李四",
    }, {
      promise_date: "2020/4/5",
      record_date: "2020/4/5 16:10",
      record_person: "王五",
    }, {
      promise_date: "2020/4/6",
      record_date: "2020/4/6 18:03",
      record_person: "赵六",
    },
  ]

  const data2 = [
    {
      code: "1",
      content: "警示、告知卡",
      period: "每日",
      legal: "安管员",
      time: "2",
    }, {
      code: "2",
      content: "警示、告知卡",
      period: "每日",
      legal: "安管员",
      time: "5",
    }, {
      code: "1",
      content: "警示、告知卡",
      period: "每日",
      legal: "安管员",
      time: "3",
    },
  ]

  return (
    <PageHeaderWrapper>
      <Card title="企业每人风险承诺列表">
        <Table columns={columns1} dataSource={data1} />
      </Card>
      <br />
      <Card title="对应记录">
        {/* <div style={{ textAlign: "right" }}>
          <Button style={{ margin: "0 20px 20px 20px" }} type="primary">新增</Button>
        </div> */}
        <Table columns={columns2} dataSource={data2} />
      </Card>
      <Modal
        visible={visable}
        title="新增"
        style={{ textAlign: 'center' }}
        okText="保存"
        onOk={() => { setVisable(false); message.success("保存成功"); }}
        onCancel={() => setVisable(false)}
      >
        <Form labelCol={{ span: 12 }} wrapperCol={{ span: 4 }}>
          <Form.Item label="有承包商作业">
            <Select>
              <Select.Option value="have">有</Select.Option>
              <Select.Option value="none">无</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="处于试生产期">
            <Select>
              <Select.Option value="have">有</Select.Option>
              <Select.Option value="none">无</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="处于开停车状态">
            <Select>
              <Select.Option value="have">有</Select.Option>
              <Select.Option value="none">无</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="开展中（扩）试">
            <Select>
              <Select.Option value="have">有</Select.Option>
              <Select.Option value="none">无</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="特殊时期">
            <Select>
              <Select.Option value="have">有</Select.Option>
              <Select.Option value="none">无</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="天气预警">
            <Select>
              <Select.Option value="have">有</Select.Option>
              <Select.Option value="none">无</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="重大生产安全事故隐患">
            <Select>
              <Select.Option value="have">有</Select.Option>
              <Select.Option value="none">无</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageHeaderWrapper>
  )
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
