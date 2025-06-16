import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  Table,
  Tag,
  Statistic,
  Row,
  Col,
  Typography,
  Tabs,
  Alert,
  Progress,
  Space,
} from "antd";
import {
  HeartOutlined,
  TrophyOutlined,
  FallOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  LineChartOutlined,
  ExclamationCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const Route = createFileRoute("/(app)/strategy-health")({
  component: RouteComponent,
});

// Mock data for strategy KPIs
const strategyKPIs = [
  {
    strategy: "Momentum Alpha",
    sharpe: 1.85,
    winRate: 68.4,
    maxDrawdown: 12.8,
    avgTimeInMarket: 8.5,
    cagr: 18.6,
    calmar: 1.45,
    sortino: 2.12,
    health: "Excellent",
    trend: "improving",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    strategy: "Mean Reversion Pro",
    sharpe: 1.42,
    winRate: 62.1,
    maxDrawdown: 15.2,
    avgTimeInMarket: 12.3,
    cagr: 14.8,
    calmar: 0.97,
    sortino: 1.68,
    health: "Good",
    trend: "stable",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    strategy: "Trend Follower",
    sharpe: 1.18,
    winRate: 55.7,
    maxDrawdown: 22.4,
    avgTimeInMarket: 18.7,
    cagr: 16.2,
    calmar: 0.72,
    sortino: 1.35,
    health: "Fair",
    trend: "declining",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    strategy: "Volatility Arbitrage",
    sharpe: 2.15,
    winRate: 71.8,
    maxDrawdown: 8.9,
    avgTimeInMarket: 6.2,
    cagr: 12.4,
    calmar: 1.39,
    sortino: 2.85,
    health: "Excellent",
    trend: "improving",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    strategy: "Sector Rotation",
    sharpe: 0.95,
    winRate: 48.3,
    maxDrawdown: 28.6,
    avgTimeInMarket: 25.4,
    cagr: 11.7,
    calmar: 0.41,
    sortino: 1.12,
    health: "Poor",
    trend: "declining",
    lastUpdate: "2024-02-02 15:45:00",
  },
];

// Mock data for degradation alerts
const degradationAlerts = [
  {
    id: "ALERT-001",
    strategy: "Trend Follower",
    type: "Performance Degradation",
    severity: "High",
    message: "Sharpe ratio declined from 1.45 to 1.18 over last 30 days",
    trigger: "Sharpe ratio < 1.2",
    timestamp: "2024-02-02 14:32:18",
    status: "Active",
    recommendation:
      "Review trend detection parameters and market regime filters",
  },
  {
    id: "ALERT-002",
    strategy: "Sector Rotation",
    type: "Win Rate Decline",
    severity: "Critical",
    message: "Win rate dropped below 50% threshold (current: 48.3%)",
    trigger: "Win rate < 50%",
    timestamp: "2024-02-02 13:15:42",
    status: "Active",
    recommendation: "Reassess sector momentum indicators and rotation timing",
  },
  {
    id: "ALERT-003",
    strategy: "Mean Reversion Pro",
    type: "Drawdown Warning",
    severity: "Medium",
    message: "Current drawdown approaching 15% threshold",
    trigger: "Drawdown > 12%",
    timestamp: "2024-02-02 11:28:55",
    status: "Monitoring",
    recommendation:
      "Consider reducing position sizes or implementing stop-loss",
  },
  {
    id: "ALERT-004",
    strategy: "Momentum Alpha",
    type: "Market Regime Change",
    severity: "Low",
    message:
      "Strategy performance may be affected by current low volatility regime",
    trigger: "VIX < 15 for 5+ days",
    timestamp: "2024-02-01 16:45:12",
    status: "Informational",
    recommendation: "Monitor momentum signals in low volatility environment",
  },
];

// Mock data for strategy comparison
const strategyComparison = [
  {
    metric: "Sharpe Ratio",
    momentumAlpha: 1.85,
    meanReversion: 1.42,
    trendFollower: 1.18,
    volatilityArb: 2.15,
    sectorRotation: 0.95,
    benchmark: 1.2,
  },
  {
    metric: "CAGR (%)",
    momentumAlpha: 18.6,
    meanReversion: 14.8,
    trendFollower: 16.2,
    volatilityArb: 12.4,
    sectorRotation: 11.7,
    benchmark: 12.0,
  },
  {
    metric: "Max Drawdown (%)",
    momentumAlpha: 12.8,
    meanReversion: 15.2,
    trendFollower: 22.4,
    volatilityArb: 8.9,
    sectorRotation: 28.6,
    benchmark: 18.5,
  },
  {
    metric: "Win Rate (%)",
    momentumAlpha: 68.4,
    meanReversion: 62.1,
    trendFollower: 55.7,
    volatilityArb: 71.8,
    sectorRotation: 48.3,
    benchmark: 58.0,
  },
  {
    metric: "Calmar Ratio",
    momentumAlpha: 1.45,
    meanReversion: 0.97,
    trendFollower: 0.72,
    volatilityArb: 1.39,
    sectorRotation: 0.41,
    benchmark: 0.65,
  },
];

function RouteComponent() {
  const kpiColumns = [
    {
      title: "Estrategia",
      dataIndex: "strategy",
      key: "strategy",
      render: (strategy: string) => <Text strong>{strategy}</Text>,
    },
    {
      title: "Sharpe",
      dataIndex: "sharpe",
      key: "sharpe",
      render: (sharpe: number) => (
        <Text
          style={{
            color:
              sharpe >= 1.5 ? "#3f8600" : sharpe >= 1 ? "#faad14" : "#cf1322",
          }}
        >
          {sharpe.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Win Rate",
      dataIndex: "winRate",
      key: "winRate",
      render: (rate: number) => (
        <Text
          style={{
            color: rate >= 60 ? "#3f8600" : rate >= 50 ? "#faad14" : "#cf1322",
          }}
        >
          {rate.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Max Drawdown",
      dataIndex: "maxDrawdown",
      key: "maxDrawdown",
      render: (dd: number) => (
        <Text
          style={{
            color: dd <= 15 ? "#3f8600" : dd <= 25 ? "#faad14" : "#cf1322",
          }}
        >
          -{dd.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Tiempo en Mercado",
      dataIndex: "avgTimeInMarket",
      key: "avgTimeInMarket",
      render: (time: number) => `${time.toFixed(1)} días`,
    },
    {
      title: "CAGR",
      dataIndex: "cagr",
      key: "cagr",
      render: (cagr: number) => (
        <Text
          style={{
            color: cagr >= 15 ? "#3f8600" : cagr >= 10 ? "#faad14" : "#cf1322",
          }}
        >
          {cagr.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Calmar",
      dataIndex: "calmar",
      key: "calmar",
      render: (calmar: number) => (
        <Text
          style={{
            color:
              calmar >= 1 ? "#3f8600" : calmar >= 0.5 ? "#faad14" : "#cf1322",
          }}
        >
          {calmar.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Sortino",
      dataIndex: "sortino",
      key: "sortino",
      render: (sortino: number) => (
        <Text
          style={{
            color:
              sortino >= 1.5 ? "#3f8600" : sortino >= 1 ? "#faad14" : "#cf1322",
          }}
        >
          {sortino.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Salud",
      dataIndex: "health",
      key: "health",
      render: (health: string) => {
        const config = {
          Excellent: { color: "success", icon: <CheckCircleOutlined /> },
          Good: { color: "processing", icon: <HeartOutlined /> },
          Fair: { color: "warning", icon: <WarningOutlined /> },
          Poor: { color: "error", icon: <ExclamationCircleOutlined /> },
        };
        const { color, icon } = config[health as keyof typeof config];
        return (
          <Tag color={color} icon={icon}>
            {health}
          </Tag>
        );
      },
    },
    {
      title: "Tendencia",
      dataIndex: "trend",
      key: "trend",
      render: (trend: string) => {
        const config = {
          improving: { color: "green", icon: <RiseOutlined /> },
          stable: { color: "blue", icon: <BarChartOutlined /> },
          declining: { color: "red", icon: <FallOutlined /> },
        };
        const { color, icon } = config[trend as keyof typeof config];
        return (
          <Tag color={color} icon={icon}>
            {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </Tag>
        );
      },
    },
  ];

  const alertColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Estrategia",
      dataIndex: "strategy",
      key: "strategy",
      render: (strategy: string) => <Text strong>{strategy}</Text>,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Severidad",
      dataIndex: "severity",
      key: "severity",
      render: (severity: string) => {
        const colorMap: Record<string, string> = {
          Critical: "red",
          High: "orange",
          Medium: "yellow",
          Low: "green",
        };
        return <Tag color={colorMap[severity]}>{severity}</Tag>;
      },
    },
    {
      title: "Mensaje",
      dataIndex: "message",
      key: "message",
      render: (message: string) => <Text>{message}</Text>,
    },
    {
      title: "Trigger",
      dataIndex: "trigger",
      key: "trigger",
      render: (trigger: string) => <Text type="secondary">{trigger}</Text>,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const config = {
          Active: { color: "error", icon: <ExclamationCircleOutlined /> },
          Monitoring: { color: "warning", icon: <WarningOutlined /> },
          Informational: { color: "processing", icon: <CheckCircleOutlined /> },
          Resolved: { color: "success", icon: <CheckCircleOutlined /> },
        };
        const { color, icon } = config[status as keyof typeof config];
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Recomendación",
      dataIndex: "recommendation",
      key: "recommendation",
      render: (rec: string) => <Text>{rec}</Text>,
    },
  ];

  const comparisonColumns = [
    {
      title: "Métrica",
      dataIndex: "metric",
      key: "metric",
      render: (metric: string) => <Text strong>{metric}</Text>,
    },
    {
      title: "Momentum Alpha",
      dataIndex: "momentumAlpha",
      key: "momentumAlpha",
      render: (value: number, record: any) => (
        <Text
          style={{ color: value > record.benchmark ? "#3f8600" : "#cf1322" }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Mean Reversion",
      dataIndex: "meanReversion",
      key: "meanReversion",
      render: (value: number, record: any) => (
        <Text
          style={{ color: value > record.benchmark ? "#3f8600" : "#cf1322" }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Trend Follower",
      dataIndex: "trendFollower",
      key: "trendFollower",
      render: (value: number, record: any) => (
        <Text
          style={{ color: value > record.benchmark ? "#3f8600" : "#cf1322" }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Volatility Arb",
      dataIndex: "volatilityArb",
      key: "volatilityArb",
      render: (value: number, record: any) => (
        <Text
          style={{ color: value > record.benchmark ? "#3f8600" : "#cf1322" }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Sector Rotation",
      dataIndex: "sectorRotation",
      key: "sectorRotation",
      render: (value: number, record: any) => (
        <Text
          style={{ color: value > record.benchmark ? "#3f8600" : "#cf1322" }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Benchmark",
      dataIndex: "benchmark",
      key: "benchmark",
      render: (value: number) => (
        <Text style={{ fontWeight: "bold" }}>{value}</Text>
      ),
    },
  ];

  const excellentStrategies = strategyKPIs.filter(
    (s) => s.health === "Excellent"
  ).length;
  const poorStrategies = strategyKPIs.filter((s) => s.health === "Poor").length;
  const activeAlerts = degradationAlerts.filter(
    (alert) => alert.status === "Active"
  ).length;
  const avgSharpe =
    strategyKPIs.reduce((sum, s) => sum + s.sharpe, 0) / strategyKPIs.length;

  return (
    <div
      style={{
        padding: "24px",
        marginTop: "84px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 84px)",
      }}
    >
      <Title level={2}>Strategy Health Monitor</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Estrategias Excelentes"
              value={excellentStrategies}
              suffix={`/${strategyKPIs.length}`}
              valueStyle={{ color: "#3f8600" }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Estrategias Problemáticas"
              value={poorStrategies}
              valueStyle={{ color: "#cf1322" }}
              prefix={<FallOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Alertas Activas"
              value={activeAlerts}
              valueStyle={{ color: activeAlerts > 0 ? "#cf1322" : "#3f8600" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sharpe Promedio"
              value={avgSharpe}
              precision={2}
              valueStyle={{ color: avgSharpe >= 1.5 ? "#3f8600" : "#cf1322" }}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="KPIs de Estrategias" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="KPIs de cada Estrategia"
                description="Métricas clave de rendimiento: Sharpe, win rate, drawdown, tiempo promedio en mercado."
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="KPIs de Estrategias" extra={<HeartOutlined />}>
                <Table
                  columns={kpiColumns}
                  dataSource={strategyKPIs}
                  rowKey="strategy"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Alertas de Degradación" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Alertas de Degradación"
                description="Señales de que una estrategia está perdiendo efectividad y requiere atención."
                type="warning"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Alertas de Degradación" extra={<WarningOutlined />}>
                <Table
                  columns={alertColumns}
                  dataSource={degradationAlerts}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Comparador de Estrategias" key="3">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Comparador de Estrategias"
                description="Benchmarking entre modelos activos para identificar las mejores estrategias."
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card
                title="Comparación de Estrategias"
                extra={<BarChartOutlined />}
              >
                <Table
                  columns={comparisonColumns}
                  dataSource={strategyComparison}
                  rowKey="metric"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Salud General" key="4">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Distribución de Salud">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <Text>Excelente ({excellentStrategies})</Text>
                    <Progress
                      percent={
                        (excellentStrategies / strategyKPIs.length) * 100
                      }
                      strokeColor="#52c41a"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <Text>
                      Buena (
                      {strategyKPIs.filter((s) => s.health === "Good").length})
                    </Text>
                    <Progress
                      percent={
                        (strategyKPIs.filter((s) => s.health === "Good")
                          .length /
                          strategyKPIs.length) *
                        100
                      }
                      strokeColor="#1890ff"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <Text>
                      Regular (
                      {strategyKPIs.filter((s) => s.health === "Fair").length})
                    </Text>
                    <Progress
                      percent={
                        (strategyKPIs.filter((s) => s.health === "Fair")
                          .length /
                          strategyKPIs.length) *
                        100
                      }
                      strokeColor="#faad14"
                      showInfo={false}
                    />
                  </div>
                  <div>
                    <Text>Pobre ({poorStrategies})</Text>
                    <Progress
                      percent={(poorStrategies / strategyKPIs.length) * 100}
                      strokeColor="#ff4d4f"
                      showInfo={false}
                    />
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Resumen de Alertas">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="Críticas"
                      value={
                        degradationAlerts.filter(
                          (a) => a.severity === "Critical"
                        ).length
                      }
                      valueStyle={{ color: "#cf1322" }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Altas"
                      value={
                        degradationAlerts.filter((a) => a.severity === "High")
                          .length
                      }
                      valueStyle={{ color: "#faad14" }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Medias"
                      value={
                        degradationAlerts.filter((a) => a.severity === "Medium")
                          .length
                      }
                      valueStyle={{ color: "#1890ff" }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Bajas"
                      value={
                        degradationAlerts.filter((a) => a.severity === "Low")
                          .length
                      }
                      valueStyle={{ color: "#3f8600" }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}
