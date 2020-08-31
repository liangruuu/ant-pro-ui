import React, { useState, useEffect } from 'react';
import router from 'umi/router';
import {
  Card,
  Row,
  Col,
  Select,
  Input,
  Form,
  Radio,
  Button,
  Upload,
  Modal,
  DatePicker,
  TreeSelect,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';
import { Dispatch } from 'redux';
import { CdAdminOrgModelState } from '@/models/cd_admin_org';
import { CdRegStateModelState } from '@/models/cd_reg_state';
import { CdScaleModelState } from '@/models/cd_scale';
import { CdSuperviseGradeModelState } from '@/models/cd_supervise_grade';
import { CdSuperviseLevelModelState } from '@/models/cd_supervise_level';
import { CdHonestyModelState } from '@/models/cd_honesty';
import { CdSafeCheckModelState } from '@/models/cd_safe_check';
import { CdStandLevelModelState } from '@/models/cd_stand_level';
import { CdAreaModelState } from '@/models/cd_area';
import { CdIndustryModelState } from '@/models/cd_industry';
import TextArea from 'antd/lib/input/TextArea';
import { EntModelState } from '@/models/ent';
import { Ent } from '@/models/entity';

interface IProps {
  dispatch: Dispatch<any>;
  location: any;
  entModel: EntModelState;
  cdAdminOrg: CdAdminOrgModelState;
  cdRegState: CdRegStateModelState;
  cdScale: CdScaleModelState;
  cdSuperviseGrade: CdSuperviseGradeModelState;
  cdSuperviseLevel: CdSuperviseLevelModelState;
  cdHonesty: CdHonestyModelState;
  cdSafeCheck: CdSafeCheckModelState;
  cdStandLevel: CdStandLevelModelState;
  cdArea: CdAreaModelState;
  cdIndustry: CdIndustryModelState;
  loading: {
    models: { [key: string]: boolean };
    effects: { [key: string]: boolean };
  };
}

const CompanyInfo: React.FC<IProps> = props => {
  const {
    dispatch,
    location,
    entModel: { entDetail },
    cdAdminOrg: { cdAdminOrgList },
    cdRegState: { cdRegStateList },
    cdScale: { cdScaleList },
    cdSuperviseGrade: { cdSuperviseGradeList },
    cdSuperviseLevel: { cdSuperviseLevelList },
    cdHonesty: { cdHonestyList },
    cdSafeCheck: { cdSafeCheckList },
    cdStandLevel: { cdStandLevelList },
    cdArea: { cdAreaTree },
    cdIndustry: { cdIndustryTree, cdSuperviseTypeTree },
    loading,
  } = props;

  const [form] = Form.useForm();

  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileList, setFileList] = useState<any>([]);
  const [entOld, setEntOld] = useState<Ent>();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
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
    if (entOld != null) {
      dispatch({
        type: 'entModel/saveEnt',
        payload: {
          ...entOld,
          ...values,
        },
      });
    } else {
      dispatch({
        type: 'entModel/saveEnt',
        payload: {
          ...values,
          entType: 'ent',
        },
      });
    }
    router.goBack();
  };

  useEffect(() => {
    if (entDetail != null) {
      form.setFieldsValue(entDetail);
      setEntOld(entDetail);
    }
    return () => {
      dispatch({
        type: 'entModel/set',
        payload: undefined,
        index: 'entDetail',
      });
    };
  }, [entDetail]);

  useEffect(() => {
    if (firstRender) {
      if (location.state != null && location.state.sid != null) {
        dispatch({
          type: 'entModel/getEntById',
          payload: { sid: location.state.sid },
        });
      }
      dispatch({
        type: 'cdAdminOrg/fetchCdAdminOrg',
      });
      dispatch({
        type: 'cdRegState/fetchCdRegState',
      });
      dispatch({
        type: 'cdScale/fetchCdScale',
      });
      dispatch({
        type: 'cdSuperviseGrade/fetchCdSuperviseGrade',
      });
      dispatch({
        type: 'cdSuperviseLevel/fetchCdSuperviseLevel',
      });
      dispatch({
        type: 'cdHonesty/fetchCdHonesty',
      });
      dispatch({
        type: 'cdSafeCheck/fetchCdSafeCheck',
      });
      dispatch({
        type: 'cdStandLevel/fetchCdStandLevel',
      });
      dispatch({
        type: 'cdArea/fetchCdArea',
        payload: {
          rootId: '330483000000',
        },
      });
      dispatch({
        type: 'cdIndustry/fetchCdIndustry',
      });
      dispatch({
        type: 'cdIndustry/fetchSuperviseTypeTree',
      });
      setFirstRender(!firstRender);
    }
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <Form {...layout} name="basicForm" onFinish={onFinish} form={form}>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>企业基本信息</div>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
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
                rules={[{ required: true, message: '必须选择成立时间!' }]}
              >
                <DatePicker placeholder="请选择成立时间" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="regAddress"
                label="注册地址"
                rules={[{ required: true, message: '必须输入注册地址!' }]}
              >
                <Input placeholder="请输入注册地址" />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="regcap" label="注册资金">
                <Input placeholder="请输入注册资金" type="number" suffix="万元" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="annualSales" label="年销售额">
                <Input placeholder="请输入年销售额" type="number" suffix="万元" />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="regorg" label="登记机关">
                <Select
                  placeholder="请选择登记机关"
                  loading={loading.effects['cdAdminOrg/fetchCdAdminOrg']}
                >
                  {cdAdminOrgList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="regstate" label="登记状态">
                <Select
                  placeholder="请选择登记状态"
                  loading={loading.effects['cdRegState/fetchCdRegState']}
                >
                  {cdRegStateList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="higheUp" label="行政隶属关系">
                <Input placeholder="请输入行政隶属关系" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="scale" label="规模情况">
                <Select
                  placeholder="请选择规模情况"
                  loading={loading.effects['cdScale/fetchCdScale']}
                >
                  {cdScaleList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="staffNum" label="从业人员数量">
                <Input placeholder="请输入从业人员数量" type="number" suffix="人" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="riskRecognize" label="风险隐患">
                <Input placeholder="请输入风险隐患" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="opscope"
                label="经营范围"
              >
                <TextArea rows={4} placeholder="请输入经营范围" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={6}>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>安全生产基本信息</div>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name="areaid" label="所属地区">
                <TreeSelect
                  loading={loading.effects['cdArea/fetchCdArea']}
                  allowClear
                  showSearch
                  placeholder="选择所属地区"
                  treeData={cdAreaTree}
                  treeNodeFilterProp="title"
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="industryCategory" label="行业类别">
                <TreeSelect
                  loading={loading.effects['cdIndustry/fetchCdIndustry']}
                  allowClear
                  showSearch
                  placeholder="选择行业类别"
                  treeData={cdIndustryTree}
                  treeNodeFilterProp="title"
                />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={20}>
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
                <Select
                  placeholder="请选择监管层级"
                  loading={loading.effects['cdSuperviseLevel/fetchCdSuperviseLevel']}
                >
                  {cdSuperviseLevelList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="superviseGrade" label="监管等级">
                <Select
                  placeholder="请选择监管等级"
                  loading={loading.effects['cdSuperviseGrade/fetchCdSuperviseGrade']}
                >
                  {cdSuperviseGradeList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="safecheckType" label="安全检查种类">
                <Select
                  placeholder="请选择安全检查种类"
                  loading={loading.effects['cdSafeCheck/fetchCdSafeCheck']}
                >
                  {cdSafeCheckList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="superviseType" label="监管分类">
                <TreeSelect
                  loading={loading.effects['cdIndustry/fetchSuperviseTypeTree']}
                  allowClear
                  showSearch
                  placeholder="选择监管分类"
                  treeData={cdSuperviseTypeTree}
                  treeNodeFilterProp="title"
                />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="standLevelCode" label="标准化等级">
                <Select
                  placeholder="请选择标准化等级"
                  loading={loading.effects['cdStandLevel/fetchCdStandLevel']}
                >
                  {cdStandLevelList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="honestygrade" label="诚信等级">
                <Select
                  placeholder="请选择诚信等级"
                  loading={loading.effects['cdHonesty/fetchCdHonesty']}
                >
                  {cdHonestyList?.map(item => (
                    <Select.Option value={item.sid}>{item.content}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="keyEnt" label="安全生产监管重点企业">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="largeScale" label="规模以上生产经营单位">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="hazardousChemicals" label="危险化学品">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="limitedSpace" label="有限空间">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="combustibleDust" label="可燃性粉尘">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="metalSmelting" label="金属冶炼">
                <Radio.Group>
                  <Radio value={1}>有</Radio>
                  <Radio value={0}>无</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="specialEquipment" label="特种设备">
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
              <Button type="primary" htmlType="submit">
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

const mapStateToProps = () => ({
  entModel,
  cdAdminOrg,
  cdRegState,
  cdScale,
  cdSuperviseGrade,
  cdSuperviseLevel,
  cdHonesty,
  cdSafeCheck,
  cdStandLevel,
  cdArea,
  cdIndustry,
  loading,
}: {
  entModel: EntModelState;
  cdAdminOrg: CdAdminOrgModelState;
  cdRegState: CdRegStateModelState;
  cdScale: CdScaleModelState;
  cdSuperviseGrade: CdSuperviseGradeModelState;
  cdSuperviseLevel: CdSuperviseLevelModelState;
  cdHonesty: CdHonestyModelState;
  cdSafeCheck: CdSafeCheckModelState;
  cdStandLevel: CdStandLevelModelState;
  cdArea: CdAreaModelState;
  cdIndustry: CdIndustryModelState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  entModel,
  cdAdminOrg,
  cdRegState,
  cdScale,
  cdSuperviseGrade,
  cdSuperviseLevel,
  cdHonesty,
  cdSafeCheck,
  cdStandLevel,
  cdArea,
  cdIndustry,
  loading,
});
export default connect(mapStateToProps)(CompanyInfo);
