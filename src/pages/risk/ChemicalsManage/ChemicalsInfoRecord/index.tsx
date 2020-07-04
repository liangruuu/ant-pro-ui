import React from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Button, Input, Radio, Checkbox, Upload } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TextArea from 'antd/lib/input/TextArea';
import { getAuthority } from '@/utils/authority';
import { UploadOutlined } from '@ant-design/icons';

interface IProps {
  dispatch: any;
}

const ChemicalsInfoRecord: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const plainOptions1 = ['甲类', '乙类', '丙类', '其他'];
  const plainOptions2 = ['易燃易爆', '有毒有害', '腐蚀氧化'];

  const uploadProps = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }: { file: any; fileList: any }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
  };

  const getDate = () => {
    const dateString = new Date().toISOString();
    return dateString.substr(0, dateString.indexOf('T'));
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.goBack();
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form form={form} onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="source" label="有独立危化品仓库">
                <Radio.Group>
                  <Radio>是</Radio>
                  <Radio>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="risknum" label="危化品仓库类别">
                <Checkbox.Group
                  options={plainOptions1}
                  // value={this.state.checkedList}
                  // onChange={this.onChange}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="risklevel" label="建立危化品使用台账">
                <Radio.Group>
                  <Radio>是</Radio>
                  <Radio>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="riskType" label="有危化品管理制度">
                <Radio.Group>
                  <Radio>是</Radio>
                  <Radio>否</Radio>
                </Radio.Group>
                s
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 21 }}
                name="Preventmethod"
                label="危化品使用情况"
              >
                <TextArea rows={4} placeholder="请输入危化品使用情况" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="charger" label="年使用量（吨）">
                <Input placeholder="请输入年使用量" />
              </Form.Item>
            </Col>
            <Col span={10} />
            <Col span={10}>
              <Form.Item name="charger" label="安评报告编号">
                <Input placeholder="请输入安评报告编号" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="charger" label="安评机构名称">
                <Input placeholder="请输入安评机构名称" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="att"
                label="上传附件"
              >
                <Upload {...uploadProps}>
                  <Button>
                    <UploadOutlined /> 点击上传
                  </Button>
                </Upload>
                ,
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="risknum" label="存在主要风险">
                <Checkbox.Group
                  options={plainOptions2}
                  // value={this.state.checkedList}
                  // onChange={this.onChange}
                />
              </Form.Item>
            </Col>
            <Col span={10} />
            <Col span={10}>
              <Form.Item name="charger" label="录入人员">
                <span>{getAuthority().toString()}</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="charger" label="录入日期">
                <span>{getDate()}</span>
              </Form.Item>
            </Col>
            <Col span={24}>
              <span>（每两个月录入一次，自动提醒）</span>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: 20 }} type="primary" htmlType="submit">
                保存
              </Button>
              <Button
                onClick={() => {
                  router.goBack();
                }}
              >
                取消
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ChemicalsInfoRecord);
