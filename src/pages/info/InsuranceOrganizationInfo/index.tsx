import React, { Dispatch, useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Ent } from '@/models/entity';
import { EntModelState } from '@/models/ent';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
  entModel: EntModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const InsuranceOrganizationInfo: React.FC<IProps> = props => {
  const {
    dispatch,
    location,
    entModel: { entDetail },
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
          entType: 'insurance',
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
      if (location.state != null && location.state.sid !== null) {
        dispatch({
          type: 'entModel/getEntById',
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
  entModel,
  loading,
}: {
  entModel: EntModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  entModel,
  loading,
});
export default connect(mapStateToProps)(InsuranceOrganizationInfo);
