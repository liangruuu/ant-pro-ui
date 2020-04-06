import React, { useState } from 'react';
import { Card, Form, Select, Input, Upload, Modal, Row, Col, Button, message, Divider } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
import StandardFormRow from './components/StandardFormRow';

interface IProps {}

const RiskManagePromise: React.FC<IProps> = () => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList1, setFileList1] = useState<any>([
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
  const [fileList2, setFileList2] = useState<any>([]);

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

  const handleChange = ({ fileList }: any) => setFileList1(fileList);
  const handleChange2 = ({ fileList }: any) => setFileList2(fileList);

  return (
    <PageHeaderWrapper>
      <Card>
        <Form>
          <Card title="已录入隐患信息" type="inner">
            <Card>
              <StandardFormRow grid style={{ paddingBottom: 11 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="隐患类别">
                      <Select disabled defaultValue="type1">
                        <Select.Option value="type1">基础安全</Select.Option>
                        <Select.Option value="type2">其他1</Select.Option>
                        <Select.Option value="type3">其他2</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="隐患等级">
                      <Select disabled defaultValue="level1">
                        <Select.Option value="level1">重大隐患</Select.Option>
                        <Select.Option value="level2">普通隐患</Select.Option>
                        <Select.Option value="level3">其他隐患</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </StandardFormRow>
              <StandardFormRow grid style={{ paddingBottom: 11 }}>
                <Form.Item label="存在隐患">
                  <Input disabled defaultValue="火灾隐患" />
                </Form.Item>
              </StandardFormRow>
              <StandardFormRow grid last style={{ paddingBottom: 11 }}>
                <Form.Item label="整改措施">
                  <Input disabled defaultValue="清除堆放杂物" />
                </Form.Item>
              </StandardFormRow>
            </Card>
            <br />
            <Card title="隐患相关照片">
              <Upload
                listType="picture-card"
                fileList={fileList1}
                onPreview={handlePreview}
                onChange={handleChange}
                disabled
              >
                {fileList1.length >= 3 ? null : (
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
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item label="整改时限">
                    <Select disabled defaultValue={5}>
                      {[
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                      ].map(item => (
                        <Select.Option value={item}>{item}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="排查人员">
                    <Input disabled defaultValue="张三" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="排查时间">
                    <Input disabled defaultValue="2020/2/20" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="整改责任人">
                    <Input disabled defaultValue="李四" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Card>
          <br />
          <Divider>请填写整改信息</Divider>
          <Card title="上传整改情况相关照片（最大三张）">
            <Upload
              listType="picture-card"
              fileList={fileList2}
              onPreview={handlePreview}
              onChange={handleChange2}
            >
              {fileList2.length >= 3 ? null : (
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="整改人（当前用户）">
                  <Input disabled defaultValue="王五" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="整改日期（当前日期）">
                  <Input disabled defaultValue="2020/3/27" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={() => {
                message.success('保存成功');
                router.replace('/risk/tbdhiddentroublelist');
              }}
            >
              保存
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={() => router.replace('/risk/tbdhiddentroublelist')}
            >
              取消
            </Button>
          </Card>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
