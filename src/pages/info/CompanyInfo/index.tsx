import React from 'react';
import router from 'umi/router';
import { Card, Row, Col, Select, Input, Form, Radio, Button } from 'antd';
const { Option } = Select;
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

interface IProps {
  dispatch: any;
}

const BasicInfo: React.FC<IProps> = props => {
  const { dispatch } = props;

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    router.replace({
      pathname: "/info/companylist",
      query: values
    })
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Form name="basicForm" onFinish={onFinish}>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              <div style={{ fontSize: "20px", fontWeight: 'bold' }}>企业基本信息</div>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="企业名称"
                rules={[{ required: true, message: '必须输入企业名称!' }]}
              >
                <Input
                  placeholder="请输入企业名称"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="详细地址"
                rules={[{ required: true, message: '必须输入详细地址!' }]}
              >
                <Input
                  placeholder="请输入详细地址"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="统一社会信用代码"
                rules={[{ required: true, message: '必须输入统一社会信用代码!' }]}
              >
                <Input
                  placeholder="请输入统一社会信用代码"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="成立时间"
                rules={[{ required: true, message: '必须输入成立时间!' }]}
              >
                <Input
                  placeholder="请输入成立时间"
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="注册资金"
                rules={[{ required: true, message: '必须输入注册资金：!' }]}
              >
                <Input
                  placeholder="请输入注册资金："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="年销售额"
                rules={[{ required: true, message: '必须输入年销售额：!' }]}
              >
                <Input
                  placeholder="请输入年销售额："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="行政区域"
                rules={[{ required: true, message: '必须输入行政区域!' }]}
              >
                <Input
                  placeholder="请输入行政区域："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="法定代表人"
                rules={[{ required: true, message: '必须输入法定代表人!' }]}
              >
                <Input
                  placeholder="请输入法定代表人："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="风险隐患"
                rules={[{ required: true, message: '必须输入风险隐患!' }]}
              >
                <Input
                  placeholder="请输入风险隐患："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="联系电话"
                rules={[{ required: true, message: '必须输入联系电话!' }]}
              >
                <Input
                  placeholder="请输入联系电话："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="经营范围"
                rules={[{ required: true, message: '必须输入经营范围!' }]}
              >
                <Input
                  placeholder="请输入经营范围："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="行业类别"
                rules={[{ required: true, message: '必须输入行业类别!' }]}
              >
                <Input
                  placeholder="请输入行业类别："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="规模情况"
                rules={[{ required: true, message: '必须输入规模情况!' }]}
              >
                <Input
                  placeholder="请输入规模情况："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="从业人员数量"
                rules={[{ required: true, message: '必须输入从业人员数量!' }]}
              >
                <Input
                  placeholder="请输入从业人员数量："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="经营状态"
                rules={[{ required: true, message: '必须输入经营状态!' }]}
              >
                <Input
                  placeholder="请输入经营状态："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              <div style={{ fontSize: "20px", fontWeight: 'bold' }}>安全生产基本信息</div>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={6} >
              <Form.Item
                name="name"
                label="所属地区"
              >
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                name="name"
                label="行业类别"
              >
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={10} >
              <Form.Item
                name="name"
                label="生产经营地址"
              >
                <Select style={{ width: 300 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={6} >
              <Form.Item
                name="name"
                label="监管层级"
              >
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                name="name"
                label="监管等级"
              >
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={14}>
            <Col span={7} >
              <Form.Item
                name="name"
                label="安全检查种类"
              >
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                name="name"
                label="监管分类"
              >
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={13}>
            <Col span={7} >
              <Form.Item
                name="name"
                label="标准化等级"
              >
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} >
              <Form.Item
                name="name"
                label="诚信等级"
              >
                <Select style={{ width: 200 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="企业主要负责人"
                rules={[{ required: true, message: '必须输入企业主要负责人!' }]}
              >
                <Input
                  placeholder="请输入企业主要负责人："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="主要负责人手机"
                rules={[{ required: true, message: '必须输入主要负责人手机!' }]}
              >
                <Input
                  placeholder="请输入主要负责人手机："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="安全负责人"
                rules={[{ required: true, message: '必须输入安全负责人!' }]}
              >
                <Input
                  placeholder="请输入安全负责人："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="安全负责人手机"
                rules={[{ required: true, message: '必须输入安全负责人手机!' }]}
              >
                <Input
                  placeholder="请输入安全负责人手机："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="安全负责人固定电话"
                rules={[{ required: true, message: '必须输入安全负责人固定电话!' }]}
              >
                <Input
                  placeholder="请输入安全负责人固定电话："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="风险隐患"
                rules={[{ required: true, message: '必须输入风险隐患!' }]}
              >
                <Input
                  placeholder="请输入风险隐患："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="name"
                label="社会化服务机构名称"
                rules={[{ required: true, message: '必须输入社会化服务机构名称!' }]}
              >
                <Input
                  placeholder="请输入社会化服务机构名称："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="name"
                label="保险公司名称"
                rules={[{ required: true, message: '必须输入保险公司名称!' }]}
              >
                <Input
                  placeholder="请输入保险公司名称："
                  style={{ width: 300 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item
                name="radio1"
                label="危化品企业"
                rules={[{ required: true, message: '必须输入危化品企业名称!' }]}
              >
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="radio2"
                label="社会化服务机构"
                rules={[{ required: true, message: '必须输入社会化服务机构名称!' }]}
              >
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item
                name="radio3"
                label="三场所三企业"
                rules={[{ required: true, message: '必须输入三场所三企业名称!' }]}
              >
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="radio4"
                label="安责险"
                rules={[{ required: true, message: '必须输入安责险名称!' }]}
              >
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              </Form.Item>
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
                router.replace({
                  pathname: "/info/companylist",
                })
              }}>取消</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  )
};
const mapStateToProps = ({ }: any) => ({});

export default connect(mapStateToProps)(BasicInfo);
