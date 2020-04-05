import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const RiskReadyToCheckList: React.FC<IProps> = props => {
  const { dispatch } = props;

  const [form] = Form.useForm();

  const [data, setDataSources] = useState([
    {
      key: '312312',
      name: '浙江新澳纺织股份有限公司',
      industry: '纺织工业',
      area: '永乐村村委会',
      business: '所属行业',
      legal: '王晓敏',
      phone: '12345678910',
      date: '2020-01-02'
    },
  ]);
  const [disabled, setDisabled] = useState(true);
  const [selectedItemKey, setSelectedItemKey] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const param = props.location.query;
    const addItemKey = Object.keys(param);
    if (addItemKey.length !== 0) {
      setDataSources([...data, param]);
    }
    console.log(props.location)
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setDisabled(false);
      setSelectedItemKey(selectedRowKeys);
      setSelectedItem(selectedRows[0]);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '行政区域',
      dataIndex: 'area',
      key: 'area',
    }, {
      title: '所属行业',
      dataIndex: 'industry',
      key: 'industry',
    }, {
      title: '主要负责人',
      dataIndex: 'legal',
      key: 'legal',
    }, {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '申请时间',
      dataIndex: 'date',
      key: 'date',
    }
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          form={form}
          className="ant-advanced-search-form"
        >
          <Row gutter={24}>
            <Col span={5.5} >
              <Form.Item
                label="企业名称">
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={5.5} >
              <Form.Item
                label="行政区划">
                <Input placeholder="请输入行政区划" />
              </Form.Item>
            </Col>
            <Col span={6.5} >
              <Form.Item
                label="申请时间">
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }} >
              <Button
                type="primary"
                style={{ marginRight: '30px' }}
                onClick={() => {
                }}>
                查询
              </Button>

            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card>
        <Row gutter={[16, 24]}>
          <Col>
            <Button
              type="primary"
              disabled={disabled}
              onClick={() => {
                router.push({
                  pathname: `/risk/riskpromisecheck/${selectedItemKey}`,
                  query: selectedItem
                })
              }}
            >审核</Button>
          </Col>
        </Row>
        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data} />
      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(RiskReadyToCheckList);
