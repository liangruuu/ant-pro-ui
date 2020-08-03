import React, { useState, Dispatch, useEffect } from 'react';
import { Card, Table, Form, Row, Col, Input, Select, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import { CdRiskTypeModelState } from '@/models/cd_risk_type';
import { CdRiskLevelModelState } from '@/models/cd_risk_level';
import { RiskCheckModelState } from '@/models/risk_check';
import { getAuthority } from '@/utils/authority';
import { RiskCheckEntity } from '@/models/entity';

interface IProps {
  dispatch: Dispatch<any>;
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
  riskCheck: RiskCheckModelState;
  loading: boolean;
}

const HiddenTroubleShootSituation: React.FC<IProps> = props => {
  const {
    dispatch,
    cdRiskType: { cdRiskTypeList },
    cdRiskLevel: { cdRiskLevelList },
    riskCheck: {
      listData: { pageSizel, currentPage, total, dataSource },
    },
    loading,
  } = props;

  const [form] = Form.useForm();

  const [firstRender, setFirstRender] = useState<boolean>(true);

  const columns = [
    {
      title: '隐患类别',
      dataIndex: 'riskType',
    },
    {
      title: '风险源名称',
      dataIndex: 'riskSource',
    },
    {
      title: '隐患等级',
      dataIndex: 'riskLevel',
    },
    {
      title: '存在隐患',
      dataIndex: 'riskDescription',
    },
    {
      title: '排查日期',
      dataIndex: 'checkDate',
    },
    {
      title: '整改时限',
      dataIndex: 'modifyTimeLimit',
    },
    {
      title: '排查人员',
      dataIndex: 'checker',
    },
    {
      title: '整改责任人',
      dataIndex: 'modifyCharger',
    },
    {
      title: '整改情况描述',
      dataIndex: 'modifySituation',
    },
    {
      title: '验收意见',
      dataIndex: 'modifyTimeLimit',
    },
  ];

  const onFinish = (values: any) => {
    dispatch({
      type: 'riskCheck/getRiskCheckList',
      payload: {
        currentPage: 0,
        pageSize: pageSizel,
        riskCheckEntity: {
          entId: getAuthority().toString(),
          ...values,
        },
      },
    });
  };

  const handleChange = ({ current, pageSize }: any) => {
    dispatch({
      type: 'riskCheck/getRiskCheckList',
      payload: {
        currentPage: current - 1,
        pageSize,
        riskCheckEntity: {
          entId: getAuthority().toString(),
        },
      },
    });
  };

  useEffect(() => {
    if (firstRender) {
      dispatch({
        type: 'cdRiskType/fetchCdRiskType',
      });
      dispatch({
        type: 'cdRiskLevel/fetchCdRiskLevel',
      });
      handleChange({ current: currentPage + 1, pageSize: pageSizel });
      setFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      {/* <Card>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="企业名称">
                <span>企业名称</span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br /> */}
      <Card title="企业名称">
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
          <Row gutter={24}>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item label="隐患类别" name="riskType">
                <Select placeholder="请选择隐患类别">
                  {cdRiskTypeList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item label="风险源名称" name="riskSource">
                <Input placeholder="请输入风险源名称" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item label="隐患等级" name="riskLevel">
                <Select placeholder="请选择隐患等级">
                  {cdRiskLevelList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item label="排查日期" name="checkDate">
                <DatePicker.RangePicker allowClear />
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item label="整改时限" name="modifyTimeLimit">
                <Select placeholder="请选择整改时限">
                  {[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                    30,
                  ].map(item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={18} md={14} lg={10} xl={6}>
              <Form.Item label="验收意见" name="c">
                <Input placeholder="请输入验收意见" />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Button
                style={{ marginLeft: 30 }}
                type="primary"
                htmlType="submit"
                onClick={() => router.push('/risk/hiddentroubleshootsituationrecord')}
              >
                新增
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{ marginLeft: 16, marginRight: 30 }}
                onClick={() => form.resetFields()}
                htmlType="submit"
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
        <Table<RiskCheckEntity>
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{ total, current: currentPage + 1, pageSize: pageSizel }}
          onChange={handleChange}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({
  cdRiskType,
  cdRiskLevel,
  riskCheck,
  loading,
}: {
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
  riskCheck: RiskCheckModelState;
  loading: { models: { [key: string]: boolean } };
}) => ({
  cdRiskType,
  cdRiskLevel,
  riskCheck,
  loading: loading.models.riskCheck,
});
export default connect(mapStateToProps)(HiddenTroubleShootSituation);
