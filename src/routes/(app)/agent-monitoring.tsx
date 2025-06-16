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
  Space,
} from "antd";
import {
  RobotOutlined,
  LineChartOutlined,
  BulbOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  EyeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export const Route = createFileRoute("/(app)/agent-monitoring")({
  component: RouteComponent,
});

// Mock data for agent insights
const agentInsights = [
  {
    id: "INS-001",
    agent: "Alpha Seeker",
    timestamp: "2024-02-02 15:32:18",
    type: "Alert",
    message: "Detected unusual volatility in tech sector",
    confidence: 87,
    impact: "Medium",
    status: "Active",
    actions: ["Reduce exposure", "Hedge positions"],
  },
  {
    id: "INS-002",
    agent: "Trend Follower",
    timestamp: "2024-02-02 15:28:45",
    type: "Insight",
    message: "Emerging bullish pattern in healthcare stocks",
    confidence: 76,
    impact: "High",
    status: "Active",
    actions: ["Increase allocation", "Target specific stocks"],
  },
  {
    id: "INS-003",
    agent: "Risk Guardian",
    timestamp: "2024-02-02 15:25:12",
    type: "Warning",
    message: "Portfolio correlation with S&P increasing above threshold",
    confidence: 92,
    impact: "High",
    status: "Active",
    actions: ["Diversify holdings", "Review correlations"],
  },
  {
    id: "INS-004",
    agent: "Macro Analyzer",
    timestamp: "2024-02-02 15:20:33",
    type: "Insight",
    message: "Fed policy shift likely to impact fixed income",
    confidence: 81,
    impact: "Medium",
    status: "Active",
    actions: ["Adjust duration", "Review yield curve exposure"],
  },
  {
    id: "INS-005",
    agent: "Liquidity Monitor",
    timestamp: "2024-02-02 15:15:22",
    type: "Alert",
    message: "Reduced liquidity detected in small cap positions",
    confidence: 89,
    impact: "Medium",
    status: "Active",
    actions: ["Review position sizing", "Prepare exit strategies"],
  },
];

// Mock data for agent metrics
const agentMetrics = [
  {
    agent: "Alpha Seeker",
    accuracy: 78.4,
    signals: 145,
    successRate: 68.2,
    avgReturn: 2.1,
    status: "Healthy",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    agent: "Trend Follower",
    accuracy: 72.1,
    signals: 98,
    successRate: 65.3,
    avgReturn: 1.8,
    status: "Healthy",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    agent: "Risk Guardian",
    accuracy: 91.5,
    signals: 62,
    successRate: 88.7,
    avgReturn: 0.5,
    status: "Healthy",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    agent: "Macro Analyzer",
    accuracy: 68.9,
    signals: 37,
    successRate: 59.4,
    avgReturn: 1.2,
    status: "Needs Attention",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    agent: "Liquidity Monitor",
    accuracy: 85.3,
    signals: 74,
    successRate: 79.7,
    avgReturn: 0.8,
    status: "Healthy",
    lastUpdate: "2024-02-02 15:45:00",
  },
];

// Mock data for decision audit trail
const decisionAuditTrail = [
  {
    id: "DEC-001",
    agent: "Alpha Seeker",
    timestamp: "2024-02-02 15:30:12",
    decision: "Buy AAPL",
    reasoning: [
      "Price momentum positive",
      "Earnings beat expectations",
      "Sector strength confirmed",
      "Volatility within acceptable range",
    ],
    confidence: 87,
    outcome: "Successful",
    return: 2.4,
  },
  {
    id: "DEC-002",
    agent: "Trend Follower",
    timestamp: "2024-02-02 15:25:45",
    decision: "Sell XOM",
    reasoning: [
      "Trend reversal detected",
      "Moving average crossover",
      "Volume confirmation",
      "Sector rotation observed",
    ],
    confidence: 76,
    outcome: "Successful",
    return: 1.8,
  },
  {
    id: "DEC-003",
    agent: "Risk Guardian",
    timestamp: "2024-02-02 15:20:33",
    decision: "Hedge Tech Exposure",
    reasoning: [
      "Sector concentration exceeding threshold",
      "Correlation with market increasing",
      "Volatility rising in key holdings",
      "Risk metrics deteriorating",
    ],
    confidence: 92,
    outcome: "Pending",
    return: null,
  },
  {
    id: "DEC-004",
    agent: "Macro Analyzer",
    timestamp: "2024-02-02 15:15:22",
    decision: "Reduce Duration",
    reasoning: [
      "Yield curve steepening",
      "Inflation expectations rising",
      "Fed policy shift anticipated",
      "Historical pattern recognition",
    ],
    confidence: 81,
    outcome: "Unsuccessful",
    return: -0.7,
  },
  {
    id: "DEC-005",
    agent: "Liquidity Monitor",
    timestamp: "2024-02-02 15:10:18",
    decision: "Adjust Position Sizing",
    reasoning: [
      "Liquidity metrics deteriorating",
      "Bid-ask spreads widening",
      "Market depth decreasing",
      "Historical liquidity pattern analysis",
    ],
    confidence: 89,
    outcome: "Successful",
    return: 0.5,
  },
];

function RouteComponent() {
  const insightColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Agente",
      dataIndex: "agent",
      key: "agent",
      render: (agent: string) => (
        <Space>
          <RobotOutlined />
          <Text>{agent}</Text>
        </Space>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (time: string) => <Text type="secondary">{time}</Text>,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const config = {
          Alert: { color: "error", icon: <WarningOutlined /> },
          Insight: { color: "success", icon: <BulbOutlined /> },
          Warning: { color: "warning", icon: <InfoCircleOutlined /> },
        };
        const { color, icon } = config[type as keyof typeof config];
        return (
          <Tag color={color} icon={icon}>
            {type}
          </Tag>
        );
      },
    },
    {
      title: "Mensaje",
      dataIndex: "message",
      key: "message",
      render: (message: string) => <Text>{message}</Text>,
    },
    {
      title: "Confianza",
      dataIndex: "confidence",
      key: "confidence",
      render: (confidence: number) => (
        <Text
          style={{
            color:
              confidence >= 80
                ? "#3f8600"
                : confidence >= 60
                  ? "#faad14"
                  : "#cf1322",
          }}
        >
          {confidence}%
        </Text>
      ),
    },
    {
      title: "Impacto",
      dataIndex: "impact",
      key: "impact",
      render: (impact: string) => {
        const color =
          impact === "High" ? "red" : impact === "Medium" ? "orange" : "green";
        return <Tag color={color}>{impact}</Tag>;
      },
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (actions: string[]) => (
        <Space direction="vertical" size="small">
          {actions.map((action, index) => (
            <Text key={index} type="secondary">
              • {action}
            </Text>
          ))}
        </Space>
      ),
    },
  ];

  const metricsColumns = [
    {
      title: "Agente",
      dataIndex: "agent",
      key: "agent",
      render: (agent: string) => (
        <Space>
          <RobotOutlined />
          <Text strong>{agent}</Text>
        </Space>
      ),
    },
    {
      title: "Precisión",
      dataIndex: "accuracy",
      key: "accuracy",
      render: (accuracy: number) => (
        <Text
          style={{
            color:
              accuracy >= 80
                ? "#3f8600"
                : accuracy >= 60
                  ? "#faad14"
                  : "#cf1322",
          }}
        >
          {accuracy.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Señales",
      dataIndex: "signals",
      key: "signals",
      render: (signals: number) => signals,
    },
    {
      title: "Tasa de Éxito",
      dataIndex: "successRate",
      key: "successRate",
      render: (rate: number) => (
        <Text
          style={{
            color: rate >= 80 ? "#3f8600" : rate >= 60 ? "#faad14" : "#cf1322",
          }}
        >
          {rate.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Retorno Promedio",
      dataIndex: "avgReturn",
      key: "avgReturn",
      render: (ret: number) => (
        <Text style={{ color: ret >= 0 ? "#3f8600" : "#cf1322" }}>
          {ret >= 0 ? "+" : ""}
          {ret.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Healthy"
            ? "green"
            : status === "Needs Attention"
              ? "orange"
              : "red";
        const icon =
          status === "Healthy" ? <CheckCircleOutlined /> : <WarningOutlined />;
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Última Actualización",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      render: (time: string) => <Text type="secondary">{time}</Text>,
    },
  ];

  const auditColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Agente",
      dataIndex: "agent",
      key: "agent",
      render: (agent: string) => (
        <Space>
          <RobotOutlined />
          <Text>{agent}</Text>
        </Space>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (time: string) => <Text type="secondary">{time}</Text>,
    },
    {
      title: "Decisión",
      dataIndex: "decision",
      key: "decision",
      render: (decision: string) => <Text strong>{decision}</Text>,
    },
    {
      title: "Razonamiento",
      dataIndex: "reasoning",
      key: "reasoning",
      render: (reasoning: string[]) => (
        <Space direction="vertical" size="small">
          {reasoning.map((reason, index) => (
            <Text key={index} type="secondary">
              • {reason}
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Confianza",
      dataIndex: "confidence",
      key: "confidence",
      render: (confidence: number) => (
        <Text
          style={{
            color:
              confidence >= 80
                ? "#3f8600"
                : confidence >= 60
                  ? "#faad14"
                  : "#cf1322",
          }}
        >
          {confidence}%
        </Text>
      ),
    },
    {
      title: "Resultado",
      dataIndex: "outcome",
      key: "outcome",
      render: (outcome: string) => {
        const config = {
          Successful: { color: "success", icon: <CheckCircleOutlined /> },
          Unsuccessful: { color: "error", icon: <CloseCircleOutlined /> },
          Pending: { color: "processing", icon: <HistoryOutlined /> },
        };
        const { color, icon } = config[outcome as keyof typeof config] || {
          color: "default",
          icon: <HistoryOutlined />,
        };
        return (
          <Tag color={color} icon={icon}>
            {outcome}
          </Tag>
        );
      },
    },
    {
      title: "Retorno",
      dataIndex: "return",
      key: "return",
      render: (ret: number | null) =>
        ret === null ? (
          <Text type="secondary">Pendiente</Text>
        ) : (
          <Text style={{ color: ret >= 0 ? "#3f8600" : "#cf1322" }}>
            {ret >= 0 ? "+" : ""}
            {ret.toFixed(1)}%
          </Text>
        ),
    },
  ];

  const totalInsights = agentInsights.length;
  const highImpactInsights = agentInsights.filter(
    (insight) => insight.impact === "High"
  ).length;
  const avgAccuracy = Math.round(
    agentMetrics.reduce((sum, agent) => sum + agent.accuracy, 0) /
      agentMetrics.length
  );
  const successfulDecisions = decisionAuditTrail.filter(
    (decision) => decision.outcome === "Successful"
  ).length;

  return (
    <div
      style={{
        padding: "24px",
        marginTop: "84px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 84px)",
      }}
    >
      <Title level={2}>Agent Behavior Monitoring</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Insights Totales"
              value={totalInsights}
              valueStyle={{ color: "#1890ff" }}
              prefix={<BulbOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Insights de Alto Impacto"
              value={highImpactInsights}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ThunderboltOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Precisión Promedio"
              value={avgAccuracy}
              suffix="%"
              valueStyle={{ color: avgAccuracy >= 80 ? "#3f8600" : "#cf1322" }}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Decisiones Exitosas"
              value={successfulDecisions}
              suffix={`/${decisionAuditTrail.length}`}
              valueStyle={{ color: "#3f8600" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Cartas de Agentes" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Insights y Alertas Recientes"
                description="Monitoreo en tiempo real de los insights y alertas generados por los agentes de trading."
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Insights de Agentes" extra={<BulbOutlined />}>
                <Table
                  columns={insightColumns}
                  dataSource={agentInsights}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Métricas de Agentes" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Métricas de Rendimiento"
                description="Estadísticas de rendimiento y precisión de los agentes de trading."
                type="warning"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Métricas de Agentes" extra={<LineChartOutlined />}>
                <Table
                  columns={metricsColumns}
                  dataSource={agentMetrics}
                  rowKey="agent"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Audit Trail de Decisiones" key="3">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Lógica de Decisión"
                description="Registro detallado de las decisiones tomadas por los agentes y su razonamiento."
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card
                title="Audit Trail de Decisiones"
                extra={<HistoryOutlined />}
              >
                <Table
                  columns={auditColumns}
                  dataSource={decisionAuditTrail}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}
