import React, { useState } from 'react';
import router from 'umi/router';
import { Card, Row, Col, Select, Input, Form, Radio, Button, Upload, Modal } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface IProps {
  dispatch: any;
}

const BasicInfo: React.FC<IProps> = () => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList, setFileList] = useState<any>([]);

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form {...layout} name="basicForm" onFinish={onFinish}>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>企业基本信息</div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={21}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="entname"
                label="企业名称"
                rules={[{ required: true, message: '必须输入企业名称!' }]}
              >
                <Input placeholder="请输入企业名称" />
              </Form.Item>
            </Col>
            <Col span={21}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="reg_address"
                label="注册地址"
                rules={[{ required: true, message: '必须输入注册地址!' }]}
              >
                <Input placeholder="请输入注册地址" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="uniscid"
                label="统一社会信用代码"
                rules={[{ required: true, message: '必须输入统一社会信用代码!' }]}
              >
                <Input placeholder="请输入统一社会信用代码" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="estdate"
                label="成立时间"
                rules={[{ required: true, message: '必须输入成立时间!' }]}
              >
                <Input placeholder="请输入成立时间" />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item
                name="regcap"
                label="注册资金"
                rules={[{ required: true, message: '必须输入注册资金：!' }]}
              >
                <Input placeholder="请输入注册资金" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="annualSales"
                label="年销售额"
                rules={[{ required: true, message: '必须输入年销售额：!' }]}
              >
                <Input placeholder="请输入年销售额" />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item
                name="regorg"
                label="登记机关"
                rules={[{ required: true, message: '必须输入登记机关!' }]}
              >
                <Input placeholder="请输入登记机关" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="lerep"
                label="法定代表人"
                rules={[{ required: true, message: '必须输入法定代表人!' }]}
              >
                <Button onClick={() => router.push('/info/companyinfo/:id/legalperson')}>
                  点击输入法定代表人信息
                </Button>
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item
                name="lerep_tel"
                label="联系电话"
                rules={[{ required: true, message: '必须输入联系电话!' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="riskRecognize"
                label="风险隐患"
                rules={[{ required: true, message: '必须输入风险隐患!' }]}
              >
                <Input placeholder="请输入风险隐患" />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={21}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="opscope"
                label="经营范围"
                rules={[{ required: true, message: '必须输入经营范围!' }]}
              >
                <Input placeholder="请输入经营范围" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="staff_num"
                label="从业人员数量"
                rules={[{ required: true, message: '必须输入从业人员数量!' }]}
              >
                <Input placeholder="请输入从业人员数量" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="scale"
                label="规模情况"
                rules={[{ required: true, message: '必须输入规模情况!' }]}
              >
                <Input placeholder="请输入规模情况" />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item
                name="regstate"
                label="登记状态"
                rules={[{ required: true, message: '必须输入登记状态!' }]}
              >
                <Input placeholder="请输入登记状态" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="higher_up"
                label="行政隶属关系"
                rules={[{ required: true, message: '必须输入行政隶属关系!' }]}
              >
                <Input placeholder="请输入行政隶属关系" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>安全生产基本信息</div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="areaid" label="所属地区">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="industry_category" label="行业类别">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={21}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="oploc"
                label="生产经营地址"
              >
                <Input placeholder="请输入生产经营地址" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="superviseLevel" label="监管层级">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="superviseGrade" label="监管等级">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="safecheckType" label="安全检查种类">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="superviseType" label="监管分类">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="standLevelCode" label="标准化等级">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="honestygrade" label="诚信等级">
                <Select>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="key_ent" label="安全生产监管重点企业">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="large_scale" label="规模以上生产经营单位">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="hazardous_chemicals" label="危险化学品">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="limited_space" label="有限空间">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="combustible_dust" label="可燃性粉尘">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="metal_smelting" label="金属冶炼">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="special_equipment" label="特种设备">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="gas" label="燃气（餐饮）">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="pic" label="四色图上传">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : (
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
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }} justify="end">
            <Col style={{ marginRight: 20 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  router.goBack();
                }}
              >
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
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(BasicInfo);
