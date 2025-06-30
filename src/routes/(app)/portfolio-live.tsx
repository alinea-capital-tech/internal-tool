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
  StockOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const Route = createFileRoute("/(app)/portfolio-live")({
  component: RouteComponent,
});

// Mock data for current positions
const currentPositions = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    strategy: "Momentum",
    quantity: 500,
    entryPrice: 175.5,
    currentPrice: 189.25,
    marketValue: 94625,
    unrealizedPL: 6875,
    unrealizedPLPercent: 7.83,
    weight: 12.4,
    beta: 1.15,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    sector: "Technology",
    strategy: "Value",
    quantity: 300,
    entryPrice: 365.8,
    currentPrice: 380.9,
    marketValue: 114270,
    unrealizedPL: 4530,
    unrealizedPLPercent: 4.13,
    weight: 15.0,
    beta: 1.05,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Technology",
    strategy: "Value",
    quantity: 400,
    entryPrice: 138.5,
    currentPrice: 142.75,
    marketValue: 57100,
    unrealizedPL: 1700,
    unrealizedPLPercent: 3.07,
    weight: 7.5,
    beta: 1.12,
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    sector: "Healthcare",
    strategy: "Defensive",
    quantity: 350,
    entryPrice: 162.8,
    currentPrice: 158.45,
    marketValue: 55457.5,
    unrealizedPL: -1522.5,
    unrealizedPLPercent: -2.67,
    weight: 7.3,
    beta: 0.65,
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    sector: "Financial",
    strategy: "Value",
    quantity: 450,
    entryPrice: 145.2,
    currentPrice: 152.8,
    marketValue: 68760,
    unrealizedPL: 3420,
    unrealizedPLPercent: 5.23,
    weight: 9.0,
    beta: 1.25,
  },
];

// Mock data for strategy performance
const strategyPerformance = [
  {
    strategy: "Momentum",
    positions: 8,
    aum: 152500,
    mtd: 3.8,
    ytd: 12.5,
    sharpe: 1.45,
    maxDrawdown: 8.2,
    beta: 1.18,
    status: "Outperforming",
  },
  {
    strategy: "Value",
    positions: 12,
    aum: 285400,
    mtd: 2.1,
    ytd: 8.7,
    sharpe: 1.12,
    maxDrawdown: 6.5,
    beta: 0.95,
    status: "Performing",
  },
  {
    strategy: "Defensive",
    positions: 6,
    aum: 124800,
    mtd: 0.8,
    ytd: 4.2,
    sharpe: 0.85,
    maxDrawdown: 3.8,
    beta: 0.62,
    status: "Underperforming",
  },
  {
    strategy: "Growth",
    positions: 9,
    aum: 198200,
    mtd: 4.2,
    ytd: 15.8,
    sharpe: 1.65,
    maxDrawdown: 12.4,
    beta: 1.35,
    status: "Outperforming",
  },
];

// Mock data for sector analysis
const sectorAnalysis = [
  {
    sector: "Technology",
    weight: 38.5,
    spWeight: 28.7,
    relativeWeight: 9.8,
    performance: 12.8,
    spPerformance: 10.5,
    alpha: 2.3,
    correlation: 0.92,
  },
  {
    sector: "Healthcare",
    weight: 15.2,
    spWeight: 13.8,
    relativeWeight: 1.4,
    performance: 5.4,
    spPerformance: 6.2,
    alpha: -0.8,
    correlation: 0.88,
  },
  {
    sector: "Financial",
    weight: 14.8,
    spWeight: 12.5,
    relativeWeight: 2.3,
    performance: 8.7,
    spPerformance: 7.5,
    alpha: 1.2,
    correlation: 0.91,
  },
  {
    sector: "Consumer Discretionary",
    weight: 12.5,
    spWeight: 10.2,
    relativeWeight: 2.3,
    performance: 9.2,
    spPerformance: 8.4,
    alpha: 0.8,
    correlation: 0.89,
  },
  {
    sector: "Energy",
    weight: 8.2,
    spWeight: 4.5,
    relativeWeight: 3.7,
    performance: 6.8,
    spPerformance: 5.2,
    alpha: 1.6,
    correlation: 0.78,
  },
];

function RouteComponent() {
  const positionColumns = [
    {
      title: "Símbolo",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol: string) => (
        <Space>
          <StockOutlined />
          <Text strong>{symbol}</Text>
        </Space>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <Text>{name}</Text>,
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      render: (sector: string) => {
        const colorMap: Record<string, string> = {
          Technology: "blue",
          Healthcare: "green",
          Financial: "purple",
          "Consumer Discretionary": "orange",
          Energy: "red",
        };
        return <Tag color={colorMap[sector] || "default"}>{sector}</Tag>;
      },
    },
    {
      title: "Estrategia",
      dataIndex: "strategy",
      key: "strategy",
      render: (strategy: string) => <Tag color="blue">{strategy}</Tag>,
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty: number) => qty.toLocaleString(),
    },
    {
      title: "Precio Entrada",
      dataIndex: "entryPrice",
      key: "entryPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Precio Actual",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Valor de Mercado",
      dataIndex: "marketValue",
      key: "marketValue",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "P&L No Realizado",
      dataIndex: "unrealizedPL",
      key: "unrealizedPL",
      render: (pl: number) => (
        <Text style={{ color: pl >= 0 ? "#3f8600" : "#cf1322" }}>
          {pl >= 0 ? "+" : ""}${Math.abs(pl).toLocaleString()}
        </Text>
      ),
    },
    {
      title: "P&L %",
      dataIndex: "unrealizedPLPercent",
      key: "unrealizedPLPercent",
      render: (plPercent: number) => (
        <Text style={{ color: plPercent >= 0 ? "#3f8600" : "#cf1322" }}>
          {plPercent >= 0 ? <RiseOutlined /> : <FallOutlined />}
          {plPercent >= 0 ? "+" : ""}
          {plPercent.toFixed(2)}%
        </Text>
      ),
    },
    {
      title: "Peso %",
      dataIndex: "weight",
      key: "weight",
      render: (weight: number) => `${weight.toFixed(1)}%`,
    },
    {
      title: "Beta",
      dataIndex: "beta",
      key: "beta",
      render: (beta: number) => (
        <Text
          style={{
            color: beta > 1 ? "#cf1322" : beta < 1 ? "#3f8600" : "#1890ff",
          }}
        >
          {beta.toFixed(2)}
        </Text>
      ),
    },
  ];

  const strategyColumns = [
    {
      title: "Estrategia",
      dataIndex: "strategy",
      key: "strategy",
      render: (strategy: string) => <Text strong>{strategy}</Text>,
    },
    {
      title: "Posiciones",
      dataIndex: "positions",
      key: "positions",
      render: (positions: number) => positions,
    },
    {
      title: "AUM",
      dataIndex: "aum",
      key: "aum",
      render: (aum: number) => `$${aum.toLocaleString()}`,
    },
    {
      title: "MTD",
      dataIndex: "mtd",
      key: "mtd",
      render: (mtd: number) => (
        <Text style={{ color: mtd >= 0 ? "#3f8600" : "#cf1322" }}>
          {mtd >= 0 ? "+" : ""}
          {mtd.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "YTD",
      dataIndex: "ytd",
      key: "ytd",
      render: (ytd: number) => (
        <Text style={{ color: ytd >= 0 ? "#3f8600" : "#cf1322" }}>
          {ytd >= 0 ? "+" : ""}
          {ytd.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Sharpe",
      dataIndex: "sharpe",
      key: "sharpe",
      render: (sharpe: number) => (
        <Text style={{ color: sharpe >= 1 ? "#3f8600" : "#cf1322" }}>
          {sharpe.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Max Drawdown",
      dataIndex: "maxDrawdown",
      key: "maxDrawdown",
      render: (drawdown: number) => (
        <Text style={{ color: "#cf1322" }}>-{drawdown.toFixed(1)}%</Text>
      ),
    },
    {
      title: "Beta",
      dataIndex: "beta",
      key: "beta",
      render: (beta: number) => (
        <Text
          style={{
            color: beta > 1 ? "#cf1322" : beta < 1 ? "#3f8600" : "#1890ff",
          }}
        >
          {beta.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          Outperforming: "green",
          Performing: "blue",
          Underperforming: "red",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
  ];

  const sectorColumns = [
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      render: (sector: string) => {
        const colorMap: Record<string, string> = {
          Technology: "blue",
          Healthcare: "green",
          Financial: "purple",
          "Consumer Discretionary": "orange",
          Energy: "red",
        };
        return <Tag color={colorMap[sector] || "default"}>{sector}</Tag>;
      },
    },
    {
      title: "Peso %",
      dataIndex: "weight",
      key: "weight",
      render: (weight: number) => `${weight.toFixed(1)}%`,
    },
    {
      title: "S&P Peso %",
      dataIndex: "spWeight",
      key: "spWeight",
      render: (weight: number) => `${weight.toFixed(1)}%`,
    },
    {
      title: "Peso Relativo",
      dataIndex: "relativeWeight",
      key: "relativeWeight",
      render: (weight: number) => (
        <Text style={{ color: weight >= 0 ? "#3f8600" : "#cf1322" }}>
          {weight >= 0 ? "+" : ""}
          {weight.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Performance",
      dataIndex: "performance",
      key: "performance",
      render: (perf: number) => (
        <Text style={{ color: perf >= 0 ? "#3f8600" : "#cf1322" }}>
          {perf >= 0 ? "+" : ""}
          {perf.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "S&P Performance",
      dataIndex: "spPerformance",
      key: "spPerformance",
      render: (perf: number) => (
        <Text style={{ color: perf >= 0 ? "#3f8600" : "#cf1322" }}>
          {perf >= 0 ? "+" : ""}
          {perf.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Alpha",
      dataIndex: "alpha",
      key: "alpha",
      render: (alpha: number) => (
        <Text style={{ color: alpha >= 0 ? "#3f8600" : "#cf1322" }}>
          {alpha >= 0 ? "+" : ""}
          {alpha.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Correlación",
      dataIndex: "correlation",
      key: "correlation",
      render: (corr: number) => (
        <div style={{ width: 80 }}>
          <Progress
            percent={corr * 100}
            size="small"
            strokeColor={
              corr >= 0.9 ? "#ff4d4f" : corr >= 0.7 ? "#faad14" : "#52c41a"
            }
            showInfo={false}
          />
          <Text style={{ fontSize: "12px" }}>{corr.toFixed(2)}</Text>
        </div>
      ),
    },
  ];

  const totalValue = currentPositions.reduce(
    (sum, position) => sum + position.marketValue,
    0
  );
  const totalPL = currentPositions.reduce(
    (sum, position) => sum + position.unrealizedPL,
    0
  );
  const totalPLPercent = (totalPL / (totalValue - totalPL)) * 100;
  const portfolioBeta = currentPositions.reduce(
    (sum, position) => sum + position.beta * (position.weight / 100),
    0
  );

  return (
    <div
      style={{
        padding: "24px",
        marginTop: "84px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 84px)",
      }}
    >
      <Title level={2}>Portfolio Live Overview</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Valor Total"
              value={totalValue}
              precision={0}
              valueStyle={{ color: "#1890ff" }}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="P&L No Realizado"
              value={totalPL}
              precision={0}
              valueStyle={{ color: totalPL >= 0 ? "#3f8600" : "#cf1322" }}
              prefix={totalPL >= 0 ? "+" : ""}
              suffix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="P&L %"
              value={totalPLPercent}
              precision={2}
              valueStyle={{
                color: totalPLPercent >= 0 ? "#3f8600" : "#cf1322",
              }}
              prefix={totalPLPercent >= 0 ? <RiseOutlined /> : <FallOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Beta del Portfolio"
              value={portfolioBeta}
              precision={2}
              valueStyle={{
                color:
                  portfolioBeta > 1
                    ? "#cf1322"
                    : portfolioBeta < 1
                      ? "#3f8600"
                      : "#1890ff",
              }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Posiciones Actuales" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Posiciones en Tiempo Real"
                description="Vista en tiempo real de todas las posiciones actuales en el portfolio."
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Posiciones Actuales" extra={<StockOutlined />}>
                <Table
                  columns={positionColumns}
                  dataSource={currentPositions}
                  rowKey="symbol"
                  pagination={{ pageSize: 10, showSizeChanger: true }}
                  scroll={{ x: 1600, y: 400 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Performance por Estrategia" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Performance por Estrategia"
                description="Análisis de rendimiento de cada estrategia de inversión."
                type="warning"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card
                title="Performance por Estrategia"
                extra={<AreaChartOutlined />}
              >
                <Table
                  columns={strategyColumns}
                  dataSource={strategyPerformance}
                  rowKey="strategy"
                  pagination={false}
                  scroll={{ x: 1000 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Análisis por Sector" key="3">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Correlaciones con S&P y Análisis por Sector"
                description="Análisis detallado de la exposición sectorial y correlaciones con el índice S&P 500."
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Análisis por Sector" extra={<PieChartOutlined />}>
                <Table
                  columns={sectorColumns}
                  dataSource={sectorAnalysis}
                  rowKey="sector"
                  pagination={false}
                  scroll={{ x: 900 }}
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
