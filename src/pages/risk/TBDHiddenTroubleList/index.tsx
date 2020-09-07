import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Row, Col, Select, Button, DatePicker, Input } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import { Dispatch } from 'redux';
import { CdRiskTypeModelState } from '@/models/cd_risk_type';
import { CdRiskLevelModelState } from '@/models/cd_risk_level';
import { RiskCheckModelState } from '@/models/risk_check';
import { RiskCheckEntity } from '@/models/entity';
import { UserModelState } from '@/models/user';

interface IProps {
  dispatch: Dispatch<any>;
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
  riskCheck: RiskCheckModelState;
  user: UserModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}

const TBDHiddenTroubleList: React.FC<IProps> = props => {
  const {
    dispatch,
    cdRiskType: { cdRiskTypeList },
    cdRiskLevel: { cdRiskLevelList },
    riskCheck: {
      listData: { pageSizel, currentPage, total, dataSource },
    },
    user: { currentUser },
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
      title: '操作',
      key: 'operate',
      render: (text: RiskCheckEntity, record: RiskCheckEntity) => (
        <span>
          {/* <Link to={`/risk/hiddentroubleresolverecord?record=${record}`}>整改</Link> */}
          <a
            onClick={() =>
              router.push({
                pathname: '/risk/hiddentroubleresolverecord',
                state: { record },
              })
            }
          >
            整改
          </a>
        </span>
      ),
    },
  ];

  const onFinish = (values: any) => {
    dispatch({
      type: 'riskCheck/getRiskCheckList',
      payload: {
        currentPage: 0,
        pageSize: pageSizel,
        riskCheckEntity: {
          entId: currentUser?.userInfo?.entid,
          status: 'checked',
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
          entId: currentUser?.userInfo?.entid,
          status: 'checked',
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
      <Card>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="隐患类别" name="riskType">
                <Select placeholder="请选择隐患类别">
                  {cdRiskTypeList?.map(item => (
                    <Select.Option key={item.sid} value={item.sid}>
                      {item.content}
                    </Select.Option>
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
                    <Select.Option key={item.sid} value={item.sid}>
                      {item.content}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="排查日期" name="checkDate">
                <DatePicker.RangePicker allowClear placeholder={['起始日期', '截止日期']} />
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
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} />
            <Col span={6} />
            <Col span={6} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 16, marginRight: 30 }}>重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table<RiskCheckEntity>
          loading={loading.effects['riskCheck/getRiskCheckList']}
          columns={columns}
          dataSource={dataSource.map(item => {
            return { ...item, key: item.id };
          })}
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
  user,
  loading,
}: {
  cdRiskType: CdRiskTypeModelState;
  cdRiskLevel: CdRiskLevelModelState;
  riskCheck: RiskCheckModelState;
  user: UserModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  cdRiskType,
  cdRiskLevel,
  riskCheck,
  user,
  loading,
});
export default connect(mapStateToProps)(TBDHiddenTroubleList);
