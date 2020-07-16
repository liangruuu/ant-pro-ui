import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Row, Col, Button, message, Select } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import TextArea from 'antd/lib/input/TextArea';
import { Dispatch } from 'redux';
import { CdEntPersonTypeModelState } from '@/models/cd_ent_person_type';

interface IProps {
  dispatch: Dispatch<any>;
  cdEntPersonType: CdEntPersonTypeModelState;
}

const SecurityManagerDetail: React.FC<IProps> = props => {
  const {
    dispatch,
    cdEntPersonType: { cdEntPersonTypeList },
  } = props;

  const [form] = Form.useForm();
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const onFinish = (values: any) => {
    dispatch({
      type: 'userModel/saveUser',
      payload: { ...values },
    });
    message.success('保存成功');
    router.goBack();
  };

  useEffect(() => {
    if (firstRender) {
      dispatch({
        type: 'cdEntPersonType/fetchCdEntPersonType',
      });
      setFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper
      onBack={() => {
        router.goBack();
      }}
    >
      <Card>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: '必须输入姓名!' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="sex"
                label="性别"
                rules={[{ required: true, message: '必须输入性别!' }]}
              >
                <Input placeholder="请输入性别" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="idNumber"
                label="身份证号"
                rules={[{ required: true, message: '必须输入身份证号!' }]}
              >
                <Input placeholder="请输入身份证号" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="tele"
                label="手机号码"
                rules={[{ required: true, message: '必须输入手机号码!' }]}
              >
                <Input placeholder="请输入手机号码" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="position" label="职务">
                <Input placeholder="请输入职务" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="persontype"
                label="人员类别"
                rules={[{ required: true, message: '必须输入人员类别!' }]}
              >
                <Select placeholder="请选择人员类别">
                  {cdEntPersonTypeList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                  {/* <Select.Option value={100}>应急局人员</Select.Option>
                  <Select.Option value={200}>企业人员</Select.Option>
                  <Select.Option value={210}>法定代表人（企业负责人）</Select.Option>
                  <Select.Option value={220}>安全负责人</Select.Option>
                  <Select.Option value={230}>安全管理员</Select.Option>
                  <Select.Option value={290}>企业联络人员</Select.Option>
                  <Select.Option value={300}>中介人员（保险公司）</Select.Option>
                  <Select.Option value={310}>业务员</Select.Option>
                  <Select.Option value={390}>联络员</Select.Option>
                  <Select.Option value={400}>第三方人员</Select.Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="address"
                label="住址"
              >
                <Input placeholder="请输入住址" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="certificateNumber" label="证书编号">
                <Input placeholder="请输入证书编号" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="issueUnit" label="发证单位">
                <Input placeholder="请输入发证单位" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="issueDate" label="发证日期">
                <Input placeholder="请输入发证日期" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="expireDate" label="失效日期">
                <Input placeholder="请输入失效日期" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="safetyTraining"
                label="安全培训记录"
              >
                <TextArea rows={4} placeholder="请输入安全培训记录" />
              </Form.Item>
            </Col>
            <Col span={20} style={{ textAlign: 'right' }}>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
              <Button style={{ marginLeft: '10px' }} onClick={() => router.goBack()}>
                取消
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({
  cdEntPersonType,
  loading,
}: {
  cdEntPersonType: CdEntPersonTypeModelState;
  loading: { models: { [key: string]: boolean } };
}) => ({
  cdEntPersonType,
  loading: loading.models.CdEntPersonType,
});
export default connect(mapStateToProps)(SecurityManagerDetail);
