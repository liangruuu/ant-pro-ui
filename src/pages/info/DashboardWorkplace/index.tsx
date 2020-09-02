import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import React, { Component, Dispatch } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { BankOutlined } from '@ant-design/icons';
import Radar from './components/Radar';
import { ModalState } from './model';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { ActivitiesType, NoticeType, RadarDataType } from './data.d';
import { UserModelState, CurrentUser } from '@/models/user';



interface DashboardWorkplaceProps {
  user: UserModelState;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  dispatch: Dispatch<any>;
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

const PageHeaderContent: React.FC<{ currentUser: CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser?.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser?.name}
          ，祝你开心每一天！
        </div>
        <div>
          {/* {currentUser?.title} |{currentUser?.group} */}
          {currentUser?.userInfo?.title?.map(item => (`${item} | `))}<BankOutlined /> {currentUser?.userInfo?.entName}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="项目数" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="团队内排名" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223} />
    </div>
  </div>
);

class DashboardWorkplace extends Component<DashboardWorkplaceProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'infoAndDashboardWorkplace/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'infoAndDashboardWorkplace/clear',
    });
  }

  renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const {
      user: { currentUser },
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
      radarData,
    } = this.props;

    const links = [
      {
        title: '企业列表',
        href: '/info/companylist',
        role: '应急局人员'
      },
      {
        title: '企业基本信息',
        href: {
          pathname: '/info/companyinfo',
          state: { entId: currentUser?.userInfo?.entid },
        },
        role: '企业联络员'
      },
      {
        title: '人员管理',
        href: {
          pathname: '/info/securitymanager',
          state: { entId: currentUser?.userInfo?.entid },
        },
        role: '企业联络员'
      },
      {
        title: '安全风险管控承诺',
        href: '/risk/dailyriskmanagepromise',
        role: '法定代表人（企业负责人）'
      },
      {
        title: '安全风险清单',
        href: '/risk/securityrisklist',
        role: '安全负责人'
      },
      {
        title: '隐患排查登记',
        href: '/risk/hiddentroubleshootsituationrecord',
        role: '安全管理员'
      },
    ];

    if (!currentUser || !currentUser.userid) {
      return null;
    }
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        // extraContent={<ExtraContent />}
      >
        <Row gutter={24}>
          {/* <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {projectNotice.map((item) => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List<ActivitiesType>
                loading={activitiesLoading}
                renderItem={(item) => this.renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col> */}
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => { }} links={links} linkElement={Link} currentUser={currentUser} />
            </Card>
            {/* <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {projectNotice.map((item) => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card> */}
          </Col> 
        </Row>
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = () => ({
  user,
  infoAndDashboardWorkplace: {
    projectNotice,
    activities,
    radarData
  },
  loading,
}: {
  user: UserModelState;
  infoAndDashboardWorkplace: ModalState;
  loading: { models: { [key: string]: boolean }; effects: { [key: string]: boolean } };
}) => ({
  user,
  projectNotice,
  activities,
  radarData,
  currentUserLoading: loading.effects['infoAndDashboardWorkplace/fetchUserCurrent'],
  projectLoading: loading.effects['infoAndDashboardWorkplace/fetchProjectNotice'],
  activitiesLoading: loading.effects['infoAndDashboardWorkplace/fetchActivitiesList'],
})
export default connect(mapStateToProps)(DashboardWorkplace);
