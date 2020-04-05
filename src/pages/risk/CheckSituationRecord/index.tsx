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
                <Form.Item label="检查时间">
                  <DatePicker showTime />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="检察人员">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow >
          <StandardFormRow grid style={{ paddingBottom: 11 }}>
            <Form.Item label="检察场所">
              <Input />
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow grid last style={{ paddingBottom: 11 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="检查表">
                  <Select>
                    <Select.Option value="table1">表1</Select.Option>
                    <Select.Option value="table2">表2</Select.Option>
                    <Select.Option value="table3">表3</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="检查类型">
                  <Select>
                    <Select.Option value="type1">类型1</Select.Option>
                    <Select.Option value="type2">类型2</Select.Option>
                    <Select.Option value="type3">类型3</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Card >
        <br />
        <Card style={{ textAlign: "right" }} title="检查清单">
          <Form.Item label="1.事故隐患排查治理情况应当如实记录，并向从业人员通报。">
            <Radio.Group>
              <Radio value="pass">通过</Radio>
              <Radio value="dispass">不通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="2、室外埋设，上面应有保护层；电缆沟应有防火、排水设施。">
            <Radio.Group>
              <Radio value="pass">通过</Radio>
              <Radio value="dispass">不通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="3、架空绝缘导线各种安全距离应符合要求。">
            <Radio.Group>
              <Radio value="pass">通过</Radio>
              <Radio value="dispass">不通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="4、正常环境的屋内场所除建筑物顶棚及地沟内外，可采用直敷布线，当导线垂直敷设时，距离地面低于1.8m段的导线，应用导管保护。在建筑物闷顶内有可燃物时，应采用金属导管、金属槽盒布线">
            <Radio.Group>
              <Radio value="pass">通过</Radio>
              <Radio value="dispass">不通过</Radio>
            </Radio.Group>
          </Form.Item>
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
        <Card style={{ textAlign: "right" }}>
          <Button type="primary" onClick={() => { message.success("保存成功"); router.replace('/risk/tbdmission'); }}>保存</Button>
          <Button style={{marginLeft: "10px"}} onClick={() => router.replace('/risk/tbdmission')}>取消</Button>
        </Card>
      </Form >
    </PageHeaderWrapper >
  )
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(RiskManagePromise);
