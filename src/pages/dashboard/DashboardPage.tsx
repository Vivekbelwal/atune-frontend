import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Typography,
  Tag,
  Progress,
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  DollarOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../../store';
import { selectUser } from '../../store/slices/authSlice';

const { Title } = Typography;

const DashboardPage = () => {
  const user = useAppSelector(selectUser);

  // Sample data for statistics
  const stats = [
    {
      title: 'Total Users',
      value: 1234,
      icon: <UserOutlined />,
      change: 12,
      isPositive: true,
    },
    {
      title: 'Revenue',
      value: '$12,345',
      icon: <DollarOutlined />,
      change: 8,
      isPositive: true,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: <LineChartOutlined />,
      change: 0.5,
      isPositive: false,
    },
    {
      title: 'Active Sessions',
      value: 432,
      icon: <ThunderboltOutlined />,
      change: 24,
      isPositive: true,
    },
  ];

  // Sample data for recent activities
  const activities = [
    {
      key: '1',
      activity: 'New user registered',
      time: '2 hours ago',
      status: 'success',
    },
    {
      key: '2',
      activity: 'Payment processed',
      time: '4 hours ago',
      status: 'success',
    },
    {
      key: '3',
      activity: 'Order cancelled',
      time: '5 hours ago',
      status: 'error',
    },
    {
      key: '4',
      activity: 'New comment received',
      time: '8 hours ago',
      status: 'warning',
    },
    {
      key: '5',
      activity: 'Server maintenance completed',
      time: '1 day ago',
      status: 'success',
    },
  ];

  // Sample data for tasks
  const tasks = [
    {
      key: '1',
      task: 'Review new features',
      priority: 'High',
      progress: 70,
    },
    {
      key: '2',
      task: 'Prepare monthly report',
      priority: 'Medium',
      progress: 30,
    },
    {
      key: '3',
      task: 'Update documentation',
      priority: 'Low',
      progress: 100,
    },
    {
      key: '4',
      task: 'Client meeting preparation',
      priority: 'High',
      progress: 50,
    },
  ];

  const activityColumns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'error') color = 'red';
        if (status === 'warning') color = 'orange';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const taskColumns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = 'green';
        if (priority === 'High') color = 'red';
        if (priority === 'Medium') color = 'orange';
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4}>Dashboard</Title>
        <p>Welcome back, {user?.name || 'User'}!</p>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<span style={{ marginRight: 8 }}>{stat.icon}</span>}
                suffix={
                  <span
                    style={{
                      fontSize: 14,
                      color: stat.isPositive ? '#3f8600' : '#cf1322',
                    }}
                  >
                    {stat.isPositive ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}
                    {stat.change}%
                  </span>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Activities">
            <Table
              dataSource={activities}
              columns={activityColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Tasks">
            <Table
              dataSource={tasks}
              columns={taskColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
