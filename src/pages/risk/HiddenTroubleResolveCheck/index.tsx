import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Row, Col, Button, Divider, Radio, Table, Image } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import { RiskCheckEntity } from '@/models/entity';
import { Dispatch } from 'redux';
import { UserModelState } from '@/models/user';
import { RiskCheckModelState } from '@/models/risk_check';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
  user: UserModelState;
  riskCheck: RiskCheckModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const RiskManagePromise: React.FC<IProps> = props => {
  const {
    dispatch,
    location,
    user: { currentUser },
    riskCheck: { picBase64List, fileNameList },
  } = props;

  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [firstReceive, setFirstReceive] = useState<boolean>(true);
  const [inspectDate] = useState<Date>(new Date());
  const [data, setData] = useState<RiskCheckEntity>();
  const [riskPicBase64List, setRiskPicBase64List] = useState<string[]>();
  const [modifyPicBase64List, setModifyPicBase64List] = useState<string[]>();

  const columns = [
    {
      title: '序号',
      dataIndex: 'no',
    },
    {
      title: '流程步骤',
      dataIndex: 'flowStep',
    },
    {
      title: '操作结果',
      dataIndex: 'operateResult',
    },
    {
      title: '具体意见',
      dataIndex: 'opinion',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
    },
    {
      title: '操作日期',
      dataIndex: 'operateDate',
    },
  ];

  const onFinish = (values: any) => {
    dispatch({
      type: 'riskCheck/saveRiskCheckInspect',
      payload: {
        id: data?.id,
        status: values.inspectResult === 'pass' ? 'inspected' : 'checked',
        inspector: currentUser?.userid,
        inspectDate: inspectDate.toISOString().slice(0, inspectDate.toISOString().indexOf('T')),
        ...values,
        modifyFlow: {
          flowStep: '企业验收',
          operateResult: values.inspectResult === 'pass' ? '通过' : '不通过',
          opinion: values.inspectOpinion,
          operator: currentUser?.userid,
          operateDate: inspectDate.toISOString().slice(0, inspectDate.toISOString().indexOf('T')),
        },
      },
    });
    router.goBack();
  };

  useEffect(() => {
    if (firstRender) {
      setData(location.state.record);
      setFirstRender(!firstRender);
      if (location.state.record.riskPicList) {
        dispatch({
          type: 'riskCheck/fetchPic',
          payload: { tokenList: location.state.record.riskPicList },
        });
      }
      if (location.state.record.modifyFileList) {
        dispatch({
          type: 'riskCheck/fetchFileNameList',
          payload: { tokenList: location.state.record.modifyFileList },
        });
      }
    }
  });

  useEffect(() => {
    if (picBase64List) {
      if (firstReceive) {
        setRiskPicBase64List(picBase64List);
        setFirstReceive(false);
        if (location.state.record.modifyPicList) {
          dispatch({
            type: 'riskCheck/fetchPic',
            payload: { tokenList: location.state.record.modifyPicList },
          });
        }
      } else {
        setModifyPicBase64List(picBase64List);
      }
    }
    return () => {
      dispatch({
        type: 'riskCheck/reset',
        payload: undefined,
        index: 'picBase64List',
      });
    };
  }, [picBase64List]);

  return (
    <PageHeaderWrapper>
      <Card>
        <Form onFinish={onFinish}>
          <Card title="已录入隐患信息" type="inner">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="隐患类别">
                  <span>{data?.riskType}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="风险源名称">
                  <span>{data?.riskSource}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="隐患等级">
                  <span>{data?.riskLevel}</span>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="存在隐患">
                  <span>{data?.riskDescription}</span>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="整改措施">
                  <span>{data?.modifyMeasure}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="整改时限">
                  <span>{data?.modifyTimeLimit}</span>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="隐患相关照片">
                  {riskPicBase64List?.map(item => (
                    <Card
                      key={item}
                      bodyStyle={{ padding: 5 }}
                      style={{
                        height: 214,
                        width: 214,
                        marginRight: 20,
                        display: 'inline-flex',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        style={{
                          position: 'absolute',
                          top: '50%',
                          transform: 'translate(0, -50%)',
                          padding: 4,
                        }}
                        width={200}
                        src={item}
                      />
                    </Card>
                  ))}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="排查人员">
                  <span>{data?.checker}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="排查时间">
                  <span>{data?.checkDate}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="整改责任人">
                  <span>{data?.modifyCharger}</span>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="整改信息" type="inner">
            <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} label="整改情况">
              <span>{data?.modifySituation}</span>
            </Form.Item>
            <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} label="整改文档">
              {fileNameList?.map(item => (
                <Button
                  key={item.token}
                  type="link"
                  onClick={() => {
                    dispatch({
                      type: 'riskCheck/downloadFile',
                      payload: { token: item.token },
                      fileName: item.name,
                    });
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Form.Item>
            <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} label="整改照片">
              {modifyPicBase64List?.map(item => (
                <Card
                  key={item}
                  bodyStyle={{ padding: 5 }}
                  style={{
                    height: 214,
                    width: 214,
                    marginRight: 20,
                    display: 'inline-flex',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    style={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translate(0, -50%)',
                      padding: 4,
                    }}
                    width={200}
                    src={item}
                  />
                </Card>
              ))}
            </Form.Item>
            <Form.Item label="整改人" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
              <span>{data?.modifier}</span>
            </Form.Item>
            <Form.Item label="整改日期" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
              <span>{data?.modifyDate}</span>
            </Form.Item>
          </Card>
          <br />
          <Card title="整改流程" type="inner">
            <Table
              columns={columns}
              dataSource={data?.modifyFlowList.map(item => {
                return { ...item, key: item.no };
              })}
            />
          </Card>
          <br />
          <Divider>请填写验收信息</Divider>
          <Card>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="验收结果" name="inspectResult">
                  <Radio.Group>
                    <Radio value="pass">合格</Radio>
                    <Radio value="dispass">不合格</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="验收意见" name="inspectOpinion">
                  <Input placeholder="请输入验收意见" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="验收人">
                  <span>{currentUser?.name}</span>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="验收日期">
                  <span>
                    {inspectDate.toISOString().slice(0, inspectDate.toISOString().indexOf('T'))}
                  </span>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={() => router.goBack()}>
              取消
            </Button>
          </Card>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = ({
  user,
  riskCheck,
  loading,
}: {
  user: UserModelState;
  riskCheck: RiskCheckModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}) => ({
  user,
  riskCheck,
  loading,
});
export default connect(mapStateToProps)(RiskManagePromise);
