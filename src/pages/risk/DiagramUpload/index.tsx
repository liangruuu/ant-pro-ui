import React, { useEffect, useState } from 'react';
import router from 'umi/router';
import { Card, Form, Row, Col, Button, Input, Table, Upload, message } from 'antd';
const { Dragger } = Upload;
const { TextArea } = Input;
import 'antd/dist/antd.css';
import { InboxOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
}

const DiagramUpload: React.FC<IProps> = props => {
  const { dispatch } = props;

  const [form] = Form.useForm();

  const param = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
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
      key: 'name',
    }, {
      title: '图示说明',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '上传日期',
      dataIndex: 'updatedate',
      key: 'updatedate',
    }, {
      title: '图示链接',
      dataIndex: 'link',
      key: 'link',
    }, {
      title: '审核结果',
      dataIndex: 'result',
      key: 'result',
    }, {
      title: '审核日期',
      dataIndex: 'checkdate',
      key: 'checkdate',
    }, {
      title: '审核意见',
      dataIndex: 'opinion',
      key: 'opinion',
    }, {
      title: '审核人',
      dataIndex: 'staff',
      key: 'staff',
    }
  ]


  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: "/info/insurancelist",
      query: values
    })
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form name="basicForm" onFinish={onFinish} >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="code"
                label="企业名称"
              >
                <label>xxxxxx</label>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="date"
                label="法定代表人"
              >
                <label>法定代表人</label>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={10}>
              <div style={{ fontSize: "20px", fontWeight: 'bold' }}>企业安全生产风险管控四色图列表</div>
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
            <div style={{ fontSize: "20px", fontWeight: 'bold' }}>企业安全生产风险管控四色图上传</div>
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
        <Row
          style={{ marginTop: 10 }}
          justify="end">
          <Col style={{ marginRight: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
            >保存</Button>
          </Col>
          <Col>
            <Button onClick={() => {
              console.dir(form);
            }}>取消</Button>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(DiagramUpload);
