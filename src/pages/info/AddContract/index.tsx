import React, { Dispatch, useState, useEffect } from 'react';
import router from 'umi/router';
import { Card, Form, Input, Row, Col, Button, Upload, DatePicker, Select, InputNumber } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';
import { AgencycontractModelState } from '@/models/agencycontract';
import { Agencycontract, Ent } from '@/models/entity';
import { getAuthority } from '@/utils/authority';
import { EntModelState } from '@/models/ent';
import moment from 'moment';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
  entModel: EntModelState;
  agencycontractModel: AgencycontractModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const AddContract: React.FC<IProps> = props => {
  const {
    dispatch,
    location,
    entModel: { entList },
    loading,
  } = props;

  const [form] = Form.useForm();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [entInfo, setEntInfo] = useState<Ent>();
  const [agencycontractOld, setAgencycontractOld] = useState<Agencycontract>();

  const getDate = () => {
    const dateString = new Date().toISOString();
    return dateString.substr(0, dateString.indexOf('T'));
  };

  const onFinish = (values: any) => {
    if (agencycontractOld != null) {
      dispatch({
        type: 'agencycontractModel/saveAgencycontract',
        payload: {
          ...agencycontractOld,
          ...values,
        },
      });
    } else {
      dispatch({
        type: 'agencycontractModel/saveAgencycontract',
        payload: {
          ...values,
          uploader: getAuthority().toString(),
          uploaddate: getDate(),
          agencyid: entInfo?.sid,
        },
      });
    }
    router.goBack();
  };

  useEffect(() => {
    if (firstRender) {
      setEntInfo(location.state.ent);
      if (location.state != null && location.state.agencycontract != null) {
        setAgencycontractOld(location.state.agencycontract);
        form.setFieldsValue({
          ...location.state.agencycontract,
          constart: moment(location.state.agencycontract.constart, 'YYYY-MM-DD '),
          conend: moment(location.state.agencycontract.conend, 'YYYY-MM-DD '),
        });
      }
      dispatch({
        type: 'entModel/getAllEntList',
        payload: {
          ent: { entType: 'ent' },
        },
      });
      setFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Row>
            <Col span={10}>
              <Form.Item
                name="conname"
                label="合同名称"
                rules={[{ required: true, message: '必须输入合同名称!' }]}
              >
                <Input placeholder="请输入合同期起" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="entid"
                label="合同乙方"
                rules={[{ required: true, message: '必须选择合同乙方!' }]}
              >
                <Select
                  loading={loading.effects['entModel/getAllEntList']}
                  showSearch
                  placeholder="请选择合同乙方"
                  optionFilterProp="children"
                >
                  {entList?.map(item => (
                    <Select.Option value={item.sid}>{item.entname}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="constart"
                label="合同期起"
                rules={[{ required: true, message: '必须选择合同期起!' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="请选择合同期起" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="conend"
                label="合同期至"
                rules={[{ required: true, message: '必须选择合同期至!' }]}
              >
                <DatePicker style={{ width: '100%' }} placeholder="请选择合同期至" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="conamount"
                label="合同金额"
                rules={[{ required: true, message: '必须输入合同金额!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  // eslint-disable-next-line no-useless-escape
                  parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="docurl" label="合同文本上传(pdf格式)">
                <Upload
                  onChange={({ file, fileList }) => {
                    if (file.status !== 'uploading') {
                      console.log(file, fileList);
                    }
                  }}
                >
                  <Button>
                    <UploadOutlined /> 点击上传
                  </Button>
                </Upload>
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
  agencycontractModel,
  loading,
}: {
  entModel: EntModelState;
  agencycontractModel: AgencycontractModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}) => ({
  entModel,
  agencycontractModel,
  loading,
});
export default connect(mapStateToProps)(AddContract);
