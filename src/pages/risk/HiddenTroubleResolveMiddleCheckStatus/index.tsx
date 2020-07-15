import React, { useState, useEffect } from 'react';
import { Card, Form, Upload, Modal, Row, Col, Button, Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
import { Dispatch } from 'redux';
import { RiskCheckEntity } from '@/models/entity';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
}

const HiddenTroubleResolveMiddleCheckStatus: React.FC<IProps> = props => {
  const { location } = props;

  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [data, setData] = useState<RiskCheckEntity>();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList, setFileList] = useState<any>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: '流程步骤',
      dataIndex: 'step',
    },
    {
      title: '验收结果',
      dataIndex: 'result',
    },
    {
      title: '验收意见',
      dataIndex: 'opinion',
    },
    {
      title: '验收人',
      dataIndex: 'person',
    },
    {
      title: '验收日期',
      dataIndex: 'date',
    },
  ];

  const dataSource = [
    {
      index: 1,
      step: '企业验收',
      result: '通过',
      opinion: '已完成整改',
      person: 'A安全管理员',
      date: '2020/4/3',
    },
    {
      index: 2,
      step: '中介验收',
      result: '通过',
      opinion: '已完成整改',
      person: '中介100',
      date: '2020/4/5',
    },
    {
      index: 3,
    },
  ];

  const uploadProps = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // eslint-disable-next-line no-shadow
    onChange({ file, fileList }: { file: any; fileList: any }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.pdf',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        uid: '2',
        name: 'yyy.pdf',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
    ],
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  // eslint-disable-next-line no-shadow
  const handleChange = ({ fileList }: any) => setFileList(fileList);

  useEffect(() => {
    if (firstRender) {
      setData(location.state.record);
      setFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Form>
          <Card title="企业信息" type="inner">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="企业名称">
                  <span>XX公司</span>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="经营地址">
                  <span>xxxxxxx</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="法定代表人">
                  <span>赵六</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="联系电话">
                  <span>13668667696</span>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <br />
          <Card title="已录入隐患信息" type="inner">
            <Card>
              <Row gutter={24}>
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
              </Row>
            </Card>
            <br />
            <Card title="隐患相关照片">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                disabled
              >
                {fileList.length >= 3 ? null : (
                  <div>
                    <PlusOutlined />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Card>
            <br />
            <Card>
              <Row gutter={24}>
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
          </Card>
          <br />
          <Card title="已录入整改情况信息" type="inner">
            <Card title="整改信息" type="inner">
              <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} label="整改情况">
                <span>{data?.modifySituation}</span>
              </Form.Item>
              <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} label="整改文档">
                <Upload {...uploadProps}>
                  {/* <Button disabled>
                    <UploadOutlined /> 点击上传
                  </Button> */}
                </Upload>
              </Form.Item>
              <Form.Item labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} label="整改照片">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 3 ? null : (
                    <div>
                      <PlusOutlined />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
              <Form.Item label="整改人" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
                <span>{data?.modifier}</span>
              </Form.Item>
              <Form.Item label="整改日期" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
                <span>{data?.modifyDate}</span>
              </Form.Item>
            </Card>
          </Card>
          <br />
          <Card title="验收流程" type="inner">
            <Table columns={columns} dataSource={dataSource} />
          </Card>
          <Card style={{ textAlign: 'right' }}>
            <Button onClick={() => router.goBack()}>返回</Button>
          </Card>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(HiddenTroubleResolveMiddleCheckStatus);
