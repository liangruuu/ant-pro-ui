import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button, DatePicker, Select } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { CdAdminOrgModelState } from '@/models/cd_admin_org';
import { CdRegStateModelState } from '@/models/cd_reg_state';
import { Dispatch } from 'redux';
import { Ent } from '@/models/entity';
import { EntModelState } from '@/models/ent';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
  entModel: EntModelState;
  cdAdminOrg: CdAdminOrgModelState;
  cdRegState: CdRegStateModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const ProxyInfo: React.FC<IProps> = props => {
  const {
    dispatch,
    location,
    entModel: { entDetail },
    cdAdminOrg: { cdAdminOrgList },
    cdRegState: { cdRegStateList },
    loading,
  } = props;

  const [form] = Form.useForm();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [entOld, setEntOld] = useState<Ent>();

  const onFinish = (values: any) => {
    if (entOld != null) {
      dispatch({
        type: 'entModel/saveEnt',
        payload: {
          ...entOld,
          ...values,
        },
      });
    } else {
      dispatch({
        type: 'entModel/saveEnt',
        payload: {
          ...values,
          entType: 'proxy',
        },
      });
    }
    router.goBack();
  };

  useEffect(() => {
    if (entDetail != null) {
      form.setFieldsValue(entDetail);
      setEntOld(entDetail);
    }
    return () => {
      dispatch({
        type: 'entModel/clean',
        index: 'entDetail',
      });
    };
  }, [entDetail]);

  useEffect(() => {
    if (firstRender) {
      if (location.state != null && location.state.sid != null) {
        dispatch({
          type: 'entModel/getEntById',
          payload: { sid: location.state.sid },
        });
      }
      dispatch({
        type: 'cdAdminOrg/fetchCdAdminOrg',
      });
      dispatch({
        type: 'cdRegState/fetchCdRegState',
      });
      setFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={onFinish}>
          <Row>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="entname"
                label="企业名称"
                rules={[{ required: true, message: '必须输入企业名称!' }]}
              >
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="uniscid"
                label="统一社会信用代码"
                rules={[{ required: true, message: '必须输入统一社会信用代码!' }]}
              >
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="estdate"
                label="成立时间"
                rules={[{ required: true, message: '必须输入成立时间!' }]}
              >
                <DatePicker placeholder="请选择成立时间" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="regcap" label="注册资金">
                <Input placeholder="请输入注册资金" type="number" suffix="万元" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="qualify" label="资质">
                <Input placeholder="请输入资质" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="regorg" label="行政区域">
                <Select
                  placeholder="请选择行政区域"
                  loading={loading.effects['cdAdminOrg/fetchCdAdminOrg']}
                >
                  {cdAdminOrgList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="regstate" label="经营状态">
                <Select
                  placeholder="请选择经营状态"
                  loading={loading.effects['cdRegState/fetchCdRegState']}
                >
                  {cdRegStateList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="staffNum" label="从业人员数量">
                <Input placeholder="请输入从业人员数量" type="number" suffix="人" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="opscope"
                label="经营范围"
              >
                <Input placeholder="请输入经营范围" />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }} justify="end">
            <Col style={{ marginRight: 20 }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Col>
            <Col>
              <Button onClick={() => router.goBack()}>取消</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({
  entModel,
  cdAdminOrg,
  cdRegState,
  loading,
}: {
  entModel: EntModelState;
  cdAdminOrg: CdAdminOrgModelState;
  cdRegState: CdRegStateModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  entModel,
  cdAdminOrg,
  cdRegState,
  loading,
});
export default connect(mapStateToProps)(ProxyInfo);
