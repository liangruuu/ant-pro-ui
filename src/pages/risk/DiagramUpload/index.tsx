import React from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Button, Input, Table, Upload, message } from 'antd';
import 'antd/dist/antd.css';
import { InboxOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { Dragger } = Upload;

interface IProps {
  dispatch: any;
}

const DiagramUpload: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const param = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
  };

  const columns = [
    {
      title: '图示名称',
      dataIndex: 'name',
    },
    {
      title: '图示说明',
      dataIndex: 'description',
    },
    {
      title: '上传日期',
      dataIndex: 'updatedate',
    },
    {
      title: '图示链接',
      dataIndex: 'link',
    },
    {
      title: '审核结果',
      dataIndex: 'result',
    },
    {
      title: '审核日期',
      dataIndex: 'checkdate',
    },
    {
      title: '审核意见',
      dataIndex: 'opinion',
    },
    {
      title: '审核人',
      dataIndex: 'staff',
    },
    {
      title: '企业确认意见',
      dataIndex: 'staff',
    },
    {
      title: '确认状态',
      dataIndex: 'status',
    },
    {
      title: '确认状态',
      dataIndex: 'status',
    },
  ];

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: '/info/insurancelist',
      query: values,
    });
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form form={form} name="basicForm" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="code" label="企业名称">
                <span>AAAAA</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="date" label="法定代表人">
                <span>法定代表人</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={10}>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                企业安全生产风险管控四色图列表
              </div>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span={24}>
            <Table columns={columns} />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={10}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              企业安全生产风险管控四色图上传
            </div>
          </Col>
        </Row>
        <Form>
          <Row gutter={24}>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="date"
                label="图示名称"
              >
                <Input placeholder="请输入图示名称" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="date"
                label="图示说明"
              >
                <Input placeholder="请输入图示说明" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="date"
                label="审核人"
              >
                <Input placeholder="请输入审核人" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="date"
                label="审核日期"
              >
                <Input placeholder="请输入审核日期" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                name="date"
                label="审核意见"
              >
                <Input placeholder="请输入审核意见" />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 70 }}>
            <Col span={24}>
              <Dragger {...param}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击上传图片</p>
              </Dragger>
            </Col>
          </Row>
        </Form>
        <Row style={{ marginTop: 10 }} justify="end">
          <Col style={{ marginRight: 20 }}>
            <Button type="primary" htmlType="submit" onClick={() => router.goBack()}>
              保存
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                router.goBack();
              }}
            >
              取消
            </Button>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(DiagramUpload);
