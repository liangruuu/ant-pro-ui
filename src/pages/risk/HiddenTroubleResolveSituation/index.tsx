import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Row, Col, Input, Select, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import { CdRiskTypeModelState } from '@/models/cd_risk_type';
import { CdRiskLevelModelState } from '@/models/cd_risk_level';
import { RiskCheckModelState } from '@/models/risk_check';
import { Dispatch } from 'redux';
import { RiskCheckEntity } from '@/models/entity';
import { getAuthority } from '@/utils/authority';

interface IProps {
  dispatch: Dispatch<any>;
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
  riskCheck: RiskCheckModelState;
  loading: boolean;
}

const HiddenTroubleResolveSituation: React.FC<IProps> = props => {
  const {
    dispatch,
    cdRiskType: { cdRiskTypeList },
    cdRiskLevel: { cdRiskLevelList },
    riskCheck: {
      listData: { pageSizel, currentPage, total, dataSource },
    },
    loading,
  } = props;

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
      title: '整改状态',
      key: 'status',
      render: (text: RiskCheckEntity, record: RiskCheckEntity) => (
        <span>
          {record.status === 'checked' ? '已排查' : null}
          {record.status === 'modified' ? '已整改' : null}
          {record.status === 'inspected' ? '已验收' : null}
        </span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text: RiskCheckEntity, record: RiskCheckEntity) => (
        <a
          onClick={() =>
            router.push({
              pathname: '/risk/hiddentroubleresolvetmiddlecheckstatus',
              state: { record },
            })
          }
        >
          查看详细信息
        </a>
      ),
    },
  ];

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
      <Card title="企业信息">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="企业名称">
              <span>XX公司</span>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="经营地址">
              <span>xxxxxxx</span>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="法定代表人">
              <span>赵六</span>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="联系电话">
              <span>13668667696</span>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <br />
      <Card>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="企业名称">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="隐患类别" name="riskType">
                <Select placeholder="请选择隐患类别">
                  {cdRiskTypeList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="风险源名称" name="riskSource">
                <Input placeholder="请输入风险源名称" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="隐患等级" name="riskLevel">
                <Select placeholder="请选择隐患等级">
                  {cdRiskLevelList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="排查日期" name="checkDate">
                <DatePicker.RangePicker allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
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
            <Col span={6}>
              <Form.Item label="是否超期">
                <Select placeholder="请选择是否超期">
                  <Select.Option value="all">全部</Select.Option>
                  <Select.Option value="over">超期</Select.Option>
                  <Select.Option value="intime">未超期</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 16, marginRight: 30 }}>重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card>
        <Row gutter={24} style={{ marginBottom: 10 }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" style={{ marginRight: 30 }}>
              导出
            </Button>
          </Col>
        </Row>
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
export default connect(mapStateToProps)(HiddenTroubleResolveSituation);
