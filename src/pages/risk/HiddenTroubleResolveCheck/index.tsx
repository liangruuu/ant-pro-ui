import React, { useState } from 'react';
import { Card, Form, Select, Input, Radio, Upload, Modal, Row, Col, DatePicker, Button, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { router } from 'umi';
import StandardFormRow from './components/StandardFormRow';

interface IProps {
}

const RiskManagePromise: React.FC<IProps> = props => {
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

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }: any) => setFileList(fileList);

  return (
    <PageHeaderWrapper>
      <Form>
        <Card>
          <StandardFormRow grid style={{ paddingBottom: 11 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="隐患类别">
                  <Select disabled defaultValue="type1">
                    <Select.Option value="type1">类别1</Select.Option>
                    <Select.Option value="type2">类别2</Select.Option>
                    <Select.Option value="type3">类别3</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="隐患等级">
                  <Select disabled defaultValue="level1">
                    <Select.Option value="level1">level1</Select.Option>
                    <Select.Option value="level2">level2</Select.Option>
                    <Select.Option value="level3">level3</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow >
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
        </Card >
        <br />
        <Card title="上传照片">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            disabled
          >
            {fileList.length >= 3 ? null
              : <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>}
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(
                    item => <Select.Option value={item}>{item}</Select.Option>
                  )}
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
        <br />
        <Card title="上传照片">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 3 ? null
              : <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Card>
        <br />
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="整改人">
                <Input disabled defaultValue="王五" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="整改日期">
                <Input disabled defaultValue="2020/3/27" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <br />
        <Card>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="验收结果">
                <Select>
                  <Select.Option value="pass">合格</Select.Option>
                  <Select.Option value="dispass">不合格</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="验收意见">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="验收人">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="验收日期">
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card style={{ textAlign: "right" }}>
          <Button type="primary" onClick={() => { message.success("保存成功"); router.replace('/risk/hiddentrouberesolvechecklist'); }}>保存</Button>
          <Button style={{ marginLeft: "10px" }} onClick={() => router.replace('/risk/hiddentrouberesolvechecklist')}>取消</Button>
        </Card>
      </Form >
    </PageHeaderWrapper >
  )
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
