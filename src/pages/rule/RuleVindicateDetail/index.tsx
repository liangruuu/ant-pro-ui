import React from 'react';
import { Card, Form, Input, Row, Col, Button, message, Upload } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import TextArea from 'antd/lib/input/TextArea';
import { getAuthority } from '@/utils/authority';
import { UploadOutlined } from '@ant-design/icons';

interface IProps {}

const RuleVindicateDetail: React.FC<IProps> = () => {
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

  return (
    <PageHeaderWrapper
      onBack={() => {
        router.goBack();
      }}
    >
      <Card>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item
                name="cdRuleType"
                label="制度类别"
                rules={[{ required: true, message: '必须输入制度类别!' }]}
              >
                <Input placeholder="请输入制度类别" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="cdExeCycle"
                label="执行周期"
                rules={[{ required: true, message: '必须输入执行周期!' }]}
              >
                <Input placeholder="请输入执行周期" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="ruelDesc"
                label="制度描述"
                rules={[{ required: true, message: '必须输入制度描述!' }]}
              >
                <TextArea rows={4} placeholder="请输入制度描述" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="att"
                label="上传附件"
                rules={[{ required: true, message: '必须输入安全培训记录!' }]}
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
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="uploader"
                label="上传人"
              >
                <span>{getAuthority().toString()}</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="uploaddate"
                label="上传日期"
              >
                <span>{getDate()}</span>
              </Form.Item>
            </Col>

            <Col span={20} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={() => {
                  message.success('保存成功');
                  router.goBack();
                }}
              >
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

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RuleVindicateDetail);
