import React, { Dispatch, useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { AgencyModelState } from '@/models/agency';
import { Agency } from '@/models/entity';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
  agencyModel: AgencyModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const InsuranceOrganizationInfo: React.FC<IProps> = props => {
  const {
    dispatch,
    location,
    agencyModel: { agencyDetail },
  } = props;

  const [form] = Form.useForm();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [agencyOld, setAgencyOld] = useState<Agency>();

  const onFinish = (values: any) => {
    if (agencyOld != null) {
      dispatch({
        type: 'agencyModel/saveAgency',
        payload: {
          ...agencyOld,
          ...values,
        },
      });
    } else {
      dispatch({
        type: 'agencyModel/saveAgency',
        payload: {
          ...values,
          agencytype: 'insurance',
        },
      });
    }
    router.goBack();
  };

  useEffect(() => {
    if (agencyDetail != null) {
      form.setFieldsValue(agencyDetail);
      setAgencyOld(agencyDetail);
    }
    return () => {
      dispatch({
        type: 'agencyModel/clean',
        index: 'agencyDetail',
      });
    };
  }, [agencyDetail]);

  useEffect(() => {
    if (firstRender) {
      if (location.state != null && location.state.sid !== null) {
        dispatch({
          type: 'agencyModel/getAgencyById',
          payload: { sid: location.state.sid },
        });
      }
      setFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={onFinish}>
          <Row>
            <Col span={10}>
              <Form.Item
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
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="oploc"
                label="详细地址"
                rules={[{ required: true, message: '必须输入详细地址!' }]}
              >
                <Input placeholder="请输入详细地址" />
              </Form.Item>
            </Col>
            <Col span={20} style={{ marginTop: 10, textAlign: 'right' }}>
              <Button style={{ marginRight: 20 }} type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => router.goBack()}>取消</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({
  agencyModel,
  loading,
}: {
  agencyModel: AgencyModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  agencyModel,
  loading,
});
export default connect(mapStateToProps)(InsuranceOrganizationInfo);
