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
  Timeline,
  Badge,
} from "antd";
import {
  FileTextOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  WarningOutlined,
  RiseOutlined,
  FallOutlined,
  ExclamationOutlined,
  SketchCircleFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const Route = createFileRoute("/(app)/risk-center")({
  component: RouteComponent,
});

// Mock data for general risk indicators
const riskIndicators = [
  {
    indicator: "VIX",
    current: 18.45,
    previous: 16.32,
    change: 2.13,
    status: "elevated",
    threshold: 20.0,
    description: "CBOE Volatility Index",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    indicator: "MOVE Index",
    current: 112.8,
    previous: 108.4,
    change: 4.4,
    status: "normal",
    threshold: 120.0,
    description: "Bond Volatility Index",
    lastUpdate: "2024-02-02 15:45:00",
  },
  {
    indicator: "Credit Spreads (IG)",
    current: 95.2,
    previous: 92.1,
    change: 3.1,
    status: "normal",
    threshold: 150.0,
    description: "Investment Grade Credit Spreads",
    lastUpdate: "2024-02-02 15:30:00",
  },
  {
    indicator: "Credit Spreads (HY)",
    current: 385.7,
    previous: 378.9,
    change: 6.8,
    status: "elevated",
    threshold: 500.0,
    description: "High Yield Credit Spreads",
    lastUpdate: "2024-02-02 15:30:00",
  },
  {
    indicator: "USD Index (DXY)",
    current: 103.45,
    previous: 102.87,
    change: 0.58,
    status: "normal",
    threshold: 110.0,
    description: "US Dollar Strength Index",
    lastUpdate: "2024-02-02 15:45:00",
  },
];

// Mock data for order audit trail
const orderAuditTrail = [
  {
    id: "ORD-2024-001547",
    timestamp: "2024-02-02 15:42:33",
    symbol: "AAPL",
    action: "BUY",
    quantity: 500,
    price: 189.25,
    algorithm: "TWAP",
    decision: "Risk limits passed",
    compliance: "Approved",
    user: "algo_trader_01",
    riskScore: 2.3,
    status: "Executed",
  },
  {
    id: "ORD-2024-001548",
    timestamp: "2024-02-02 15:41:15",
    symbol: "TSLA",
    action: "SELL",
    quantity: 200,
    price: 245.8,
    algorithm: "VWAP",
    decision: "Position limit check",
    compliance: "Approved",
    user: "algo_trader_02",
    riskScore: 3.7,
    status: "Executed",
  },
  {
    id: "ORD-2024-001549",
    timestamp: "2024-02-02 15:40:22",
    symbol: "NVDA",
    action: "BUY",
    quantity: 100,
    price: 520.15,
    algorithm: "Implementation Shortfall",
    decision: "Concentration risk warning",
    compliance: "Flagged",
    user: "algo_trader_01",
    riskScore: 6.8,
    status: "Pending Review",
  },
  {
    id: "ORD-2024-001550",
    timestamp: "2024-02-02 15:39:45",
    symbol: "MSFT",
    action: "BUY",
    quantity: 300,
    price: 380.9,
    algorithm: "TWAP",
    decision: "Liquidity check passed",
    compliance: "Approved",
    user: "algo_trader_03",
    riskScore: 1.9,
    status: "Executed",
  },
  {
    id: "ORD-2024-001551",
    timestamp: "2024-02-02 15:38:12",
    symbol: "GOOGL",
    action: "SELL",
    quantity: 150,
    price: 142.75,
    algorithm: "POV",
    decision: "Market impact analysis",
    compliance: "Approved",
    user: "algo_trader_02",
    riskScore: 2.8,
    status: "Executed",
  },
];

// Mock data for compliance monitoring
const complianceChecks = [
  {
    rule: "Position Concentration Limit",
    description: "Single position cannot exceed 5% of portfolio",
    status: "Compliant",
    current: "4.2%",
    limit: "5.0%",
    violations: 0,
    lastCheck: "2024-02-02 15:45:00",
  },
  {
    rule: "Sector Concentration Limit",
    description: "Technology sector exposure limit",
    status: "Warning",
    current: "48.7%",
    limit: "50.0%",
    violations: 0,
    lastCheck: "2024-02-02 15:45:00",
  },
  {
    rule: "Daily Trading Volume",
    description: "Maximum daily trading volume limit",
    status: "Compliant",
    current: "$2.4M",
    limit: "$5.0M",
    violations: 0,
    lastCheck: "2024-02-02 15:45:00",
  },
  {
    rule: "VaR Limit (95%)",
    description: "Portfolio Value at Risk limit",
    status: "Violation",
    current: "2.8%",
    limit: "2.5%",
    violations: 1,
    lastCheck: "2024-02-02 15:45:00",
  },
  {
    rule: "Leverage Ratio",
    description: "Maximum portfolio leverage",
    status: "Compliant",
    current: "1.8x",
    limit: "2.0x",
    violations: 0,
    lastCheck: "2024-02-02 15:45:00",
  },
  {
    rule: "Liquidity Coverage",
    description: "Minimum liquid assets requirement",
    status: "Compliant",
    current: "15.2%",
    limit: "10.0%",
    violations: 0,
    lastCheck: "2024-02-02 15:45:00",
  },
];

// Mock data for regulatory compliance
const regulatoryCompliance = [
  {
    regulation: "MiFID II",
    requirement: "Best Execution Reporting",
    status: "Compliant",
    nextReview: "2024-02-15",
    responsible: "Compliance Team",
  },
  {
    regulation: "Dodd-Frank",
    requirement: "Volcker Rule Compliance",
    status: "Compliant",
    nextReview: "2024-02-10",
    responsible: "Risk Management",
  },
  {
    regulation: "EMIR",
    requirement: "Trade Reporting",
    status: "Pending",
    nextReview: "2024-02-05",
    responsible: "Operations Team",
  },
  {
    regulation: "Basel III",
    requirement: "Capital Adequacy",
    status: "Compliant",
    nextReview: "2024-03-01",
    responsible: "Risk Management",
  },
];

function RouteComponent() {
  const riskColumns = [
    {
      title: "Indicador",
      dataIndex: "indicator",
      key: "indicator",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Valor Actual",
      dataIndex: "current",
      key: "current",
      render: (value: number) => value.toFixed(2),
    },
    {
      title: "Anterior",
      dataIndex: "previous",
      key: "previous",
      render: (value: number) => value.toFixed(2),
    },
    {
      title: "Cambio",
      dataIndex: "change",
      key: "change",
      render: (change: number) => (
        <Text style={{ color: change >= 0 ? "#cf1322" : "#3f8600" }}>
          {change >= 0 ? <RiseOutlined /> : <FallOutlined />}
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          normal: "green",
          elevated: "orange",
          critical: "red",
        };
        return (
          <Tag color={colorMap[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: "Umbral",
      dataIndex: "threshold",
      key: "threshold",
      render: (value: number) => value.toFixed(2),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
  ];

  const auditColumns = [
    {
      title: "ID Orden",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (time: string) => <Text type="secondary">{time}</Text>,
    },
    {
      title: "Símbolo",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol: string) => (
        <Badge count={symbol} style={{ backgroundColor: "#52c41a" }} />
      ),
    },
    {
      title: "Acción",
      dataIndex: "action",
      key: "action",
      render: (action: string) => (
        <Tag color={action === "BUY" ? "green" : "red"}>
          {action === "BUY" ? <RiseOutlined /> : <FallOutlined />} {action}
        </Tag>
      ),
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty: number) => qty.toLocaleString(),
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Algoritmo",
      dataIndex: "algorithm",
      key: "algorithm",
      render: (algo: string) => <Tag color="blue">{algo}</Tag>,
    },
    {
      title: "Decisión",
      dataIndex: "decision",
      key: "decision",
      render: (decision: string) => <Text>{decision}</Text>,
    },
    {
      title: "Cumplimiento",
      dataIndex: "compliance",
      key: "compliance",
      render: (compliance: string) => {
        const colorMap: Record<string, string> = {
          Approved: "green",
          Flagged: "orange",
          Rejected: "red",
        };
        return <Tag color={colorMap[compliance]}>{compliance}</Tag>;
      },
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      render: (score: number) => (
        <Text
          style={{
            color: score <= 3 ? "#3f8600" : score <= 6 ? "#faad14" : "#cf1322",
          }}
        >
          {score.toFixed(1)}
        </Text>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const config = {
          Executed: { color: "success", icon: <CheckCircleOutlined /> },
          "Pending Review": { color: "warning", icon: <ClockCircleOutlined /> },
          Rejected: { color: "error", icon: <CloseCircleOutlined /> },
        };
        const { color, icon } = config[status as keyof typeof config] || {
          color: "default",
          icon: <ClockCircleOutlined />,
        };
        return (
          <Tag color={color} icon={icon}>
            {status}
          </Tag>
        );
      },
    },
  ];

  const complianceColumns = [
    {
      title: "Regla",
      dataIndex: "rule",
      key: "rule",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const config = {
          Compliant: { color: "success", icon: <CheckCircleOutlined /> },
          Warning: { color: "warning", icon: <WarningOutlined /> },
          Violation: { color: "error", icon: <ExclamationCircleOutlined /> },
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
      title: "Actual",
      dataIndex: "current",
      key: "current",
      render: (current: string) => <Text strong>{current}</Text>,
    },
    {
      title: "Límite",
      dataIndex: "limit",
      key: "limit",
      render: (limit: string) => <Text>{limit}</Text>,
    },
    {
      title: "Violaciones",
      dataIndex: "violations",
      key: "violations",
      render: (violations: number) => (
        <Text style={{ color: violations > 0 ? "#cf1322" : "#3f8600" }}>
          {violations}
        </Text>
      ),
    },
    {
      title: "Última Verificación",
      dataIndex: "lastCheck",
      key: "lastCheck",
      render: (time: string) => <Text type="secondary">{time}</Text>,
    },
  ];

  const regulatoryColumns = [
    {
      title: "Regulación",
      dataIndex: "regulation",
      key: "regulation",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Requerimiento",
      dataIndex: "requirement",
      key: "requirement",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          Compliant: "green",
          Pending: "orange",
          "Non-Compliant": "red",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "Próxima Revisión",
      dataIndex: "nextReview",
      key: "nextReview",
      render: (date: string) => <Text>{date}</Text>,
    },
    {
      title: "Responsable",
      dataIndex: "responsible",
      key: "responsible",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
  ];

  const totalViolations = complianceChecks.reduce(
    (sum, check) => sum + check.violations,
    0
  );
  const compliantRules = complianceChecks.filter(
    (check) => check.status === "Compliant"
  ).length;
  const elevatedRisks = riskIndicators.filter(
    (indicator) => indicator.status === "elevated"
  ).length;
  const pendingOrders = orderAuditTrail.filter(
    (order) => order.status === "Pending Review"
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
      <Title level={2}>Risk Management Center / Compliance Trail</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Violaciones Activas"
              value={totalViolations}
              valueStyle={{
                color: totalViolations > 0 ? "#cf1322" : "#3f8600",
              }}
              prefix={<ExclamationOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Reglas Cumplidas"
              value={compliantRules}
              suffix={`/${complianceChecks.length}`}
              valueStyle={{ color: "#3f8600" }}
              prefix={<SketchCircleFilled />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Riesgos Elevados"
              value={elevatedRisks}
              valueStyle={{ color: elevatedRisks > 0 ? "#faad14" : "#3f8600" }}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Órdenes Pendientes"
              value={pendingOrders}
              valueStyle={{ color: pendingOrders > 0 ? "#faad14" : "#3f8600" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Indicadores de Riesgo" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Indicadores de Riesgo Generales"
                description="Monitoreo en tiempo real de VIX, índices de volatilidad y otros indicadores de riesgo sistémico."
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="VIX y Otros Indicadores" extra={<RiseOutlined />}>
                <Table
                  columns={riskColumns}
                  dataSource={riskIndicators}
                  rowKey="indicator"
                  pagination={false}
                  scroll={{ x: 800 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Registro de Órdenes" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Registro Detallado de Órdenes"
                description="Auditoría completa de todas las órdenes y decisiones algorítmicas con trazabilidad completa."
                type="warning"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Audit Trail de Órdenes" extra={<FileTextOutlined />}>
                <Table
                  columns={auditColumns}
                  dataSource={orderAuditTrail}
                  rowKey="id"
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                  scroll={{ x: 1400, y: 400 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Panel de Cumplimiento" key="3">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Monitoreo de Cumplimiento"
                description="Verificación continua de límites regulatorios y restricciones internas del portfolio."
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card
                title="Límites y Restricciones"
                extra={<SketchCircleFilled />}
              >
                <Table
                  columns={complianceColumns}
                  dataSource={complianceChecks}
                  rowKey="rule"
                  pagination={false}
                  scroll={{ x: 1000 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Cumplimiento Regulatorio" key="4">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Estado Regulatorio" extra={<EyeOutlined />}>
                <Table
                  columns={regulatoryColumns}
                  dataSource={regulatoryCompliance}
                  rowKey="regulation"
                  pagination={false}
                  scroll={{ x: 700 }}
                  size="small"
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Timeline de Cumplimiento">
                <Timeline
                  items={[
                    {
                      color: "green",
                      children: (
                        <div>
                          <Text strong>MiFID II Reporting</Text>
                          <br />
                          <Text type="secondary">Completado - 2024-02-01</Text>
                        </div>
                      ),
                    },
                    {
                      color: "blue",
                      children: (
                        <div>
                          <Text strong>EMIR Trade Reporting</Text>
                          <br />
                          <Text type="secondary">
                            En progreso - Vence 2024-02-05
                          </Text>
                        </div>
                      ),
                    },
                    {
                      color: "orange",
                      children: (
                        <div>
                          <Text strong>Dodd-Frank Review</Text>
                          <br />
                          <Text type="secondary">Programado - 2024-02-10</Text>
                        </div>
                      ),
                    },
                    {
                      color: "gray",
                      children: (
                        <div>
                          <Text strong>Basel III Assessment</Text>
                          <br />
                          <Text type="secondary">Próximo - 2024-03-01</Text>
                        </div>
                      ),
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}
