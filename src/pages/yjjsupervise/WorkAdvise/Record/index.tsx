import React from 'react';
import router from 'umi/router';
import { Card, Form, Table, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface IProps {
  dispatch: any;
  histolocationry: any;
}

const WorkAdvise: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '序号',
      dataIndex: 'no',
    },
    {
      title: '风险类型',
      dataIndex: 'type',
    },
    {
      title: '整改措施',
      dataIndex: 'method',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '生成时间',
      dataIndex: 'time',
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          className="ant-advanced-search-form"
        >
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item label="企业名称">
                <span>浙江飞帆纺织股份信息有限公司</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="地址">
                <span>嘉兴市桐乡市</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="安全员" name="security">
                <Input placeholder="请输入安全员" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="电话" name="tele">
                <Input placeholder="请输入电话" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <span>以下事项未进行有效整改，建议在7天内进行整改，逾期将对你单位进行约谈。</span>
            </Col>
            <Col span={24}>
              <Table columns={columns} />
            </Col>
            <Col span={24} style={{ textAlign: 'right', marginTop: 30 }}>
              <Button
                type="primary"
                style={{ margin: '0 16px' }}
                onClick={() => {
                  router.goBack();
                }}
              >
                保存
              </Button>
              <Button
                onClick={() => {
                  router.goBack();
                }}
              >
                返回
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(WorkAdvise);
