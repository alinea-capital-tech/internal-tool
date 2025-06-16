import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  Table,
  Tag,
  Progress,
  Statistic,
  Row,
  Col,
  Badge,
  Space,
  Typography,
  Divider,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export const Route = createFileRoute("/(app)/dashboard")({
  component: RouteComponent,
});

// Replace the mock data with this updated version that includes all requested fields
const trades = [
  {
    id: "TRD-001",
    status: "Pending",
    ticker: "AAPL",
    position: "Long",
    confidenceScore: 85,
    companyName: "Apple Inc.",
    sector: "Technology",
    portfolioSize: 4.2,
    shares: 100,
    amount: 17550,
    targetEntry: 175.5,
    targetExit: 195.0,
    expectedFees: 35.1,
    expectedReturn: 11.1,
    realReturn: null,
    stopLoss: 5.5,
    timeInQueue: "2h 15m",
  },
  {
    id: "TRD-002",
    status: "Executed",
    ticker: "TSLA",
    position: "Short",
    confidenceScore: 92,
    companyName: "Tesla, Inc.",
    sector: "Automotive",
    portfolioSize: 3.1,
    shares: 50,
    amount: 12250,
    targetEntry: 245.0,
    targetExit: 220.0,
    expectedFees: 24.5,
    expectedReturn: 10.2,
    realReturn: 8.7,
    stopLoss: 4.0,
    timeInQueue: "45m",
  },
  {
    id: "TRD-003",
    status: "Pending",
    ticker: "NVDA",
    position: "Long",
    confidenceScore: 67,
    companyName: "NVIDIA Corporation",
    sector: "Technology",
    portfolioSize: 3.3,
    shares: 25,
    amount: 13000,
    targetEntry: 520.0,
    targetExit: 580.0,
    expectedFees: 26.0,
    expectedReturn: 11.5,
    realReturn: null,
    stopLoss: 6.0,
    timeInQueue: "3h 22m",
  },
  {
    id: "TRD-004",
    status: "Pending",
    ticker: "MSFT",
    position: "Long",
    confidenceScore: 78,
    companyName: "Microsoft Corporation",
    sector: "Technology",
    portfolioSize: 7.1,
    shares: 75,
    amount: 28500,
    targetEntry: 380.0,
    targetExit: 410.0,
    expectedFees: 57.0,
    expectedReturn: 7.9,
    realReturn: null,
    stopLoss: 4.5,
    timeInQueue: "1h 8m",
  },
  {
    id: "TRD-005",
    status: "Executed",
    ticker: "GOOGL",
    position: "Short",
    confidenceScore: 89,
    companyName: "Alphabet Inc.",
    sector: "Technology",
    portfolioSize: 1.1,
    shares: 30,
    amount: 4275,
    targetEntry: 142.5,
    targetExit: 132.0,
    expectedFees: 8.55,
    expectedReturn: 7.4,
    realReturn: 6.8,
    stopLoss: 3.5,
    timeInQueue: "25m",
  },
];

// Risk exposure data
const riskExposure = [
  { category: "Technology", exposure: 45.2, confidence: 88, trend: "up" },
  { category: "Healthcare", exposure: 23.1, confidence: 76, trend: "down" },
  { category: "Financial", exposure: 18.7, confidence: 82, trend: "up" },
  { category: "Energy", exposure: 8.5, confidence: 65, trend: "down" },
  { category: "Consumer", exposure: 4.5, confidence: 91, trend: "stable" },
];

// Replace the columns definition with this updated version
function RouteComponent() {
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const isPending = status === "Pending";
        return (
          <Tag
            color={isPending ? "processing" : "success"}
            icon={isPending ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      render: (text: string) => (
        <Badge count={text} style={{ backgroundColor: "#52c41a" }} />
      ),
    },
    {
      title: "Long/Short",
      dataIndex: "position",
      key: "position",
      render: (position: string) => (
        <Tag color={position === "Long" ? "green" : "red"}>
          {position === "Long" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{" "}
          {position}
        </Tag>
      ),
    },
    {
      title: "Confidence",
      dataIndex: "confidenceScore",
      key: "confidenceScore",
      render: (score: number) => (
        <div style={{ width: 80 }}>
          <Progress
            percent={score}
            size="small"
            strokeColor={
              score >= 80 ? "#52c41a" : score >= 60 ? "#faad14" : "#ff4d4f"
            }
            showInfo={false}
          />
          <Text style={{ fontSize: "12px" }}>{score}%</Text>
        </div>
      ),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
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
          Energy: "orange",
          Automotive: "cyan",
          Consumer: "magenta",
        };
        return <Tag color={colorMap[sector] || "default"}>{sector}</Tag>;
      },
    },
    {
      title: "Size (%)",
      dataIndex: "portfolioSize",
      key: "portfolioSize",
      render: (size: number) => `${size.toFixed(1)}%`,
    },
    {
      title: "Shares",
      dataIndex: "shares",
      key: "shares",
      render: (qty: number) => qty.toLocaleString(),
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: "Target Entry",
      dataIndex: "targetEntry",
      key: "targetEntry",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Target Exit",
      dataIndex: "targetExit",
      key: "targetExit",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Exp. Fees",
      dataIndex: "expectedFees",
      key: "expectedFees",
      render: (fees: number) => `$${fees.toFixed(2)}`,
    },
    {
      title: "Exp. Return",
      dataIndex: "expectedReturn",
      key: "expectedReturn",
      render: (ret: number) => (
        <Text style={{ color: ret >= 0 ? "#3f8600" : "#cf1322" }}>
          {ret >= 0 ? "+" : ""}
          {ret.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Real Return",
      dataIndex: "realReturn",
      key: "realReturn",
      render: (ret: number | null) =>
        ret === null ? (
          <Text type="secondary">N/A</Text>
        ) : (
          <Text style={{ color: ret >= 0 ? "#3f8600" : "#cf1322" }}>
            {ret >= 0 ? "+" : ""}
            {ret.toFixed(1)}%
          </Text>
        ),
    },
    {
      title: "Stop Loss",
      dataIndex: "stopLoss",
      key: "stopLoss",
      render: (loss: number) => (
        <Text style={{ color: "#cf1322" }}>{loss.toFixed(1)}%</Text>
      ),
    },
    {
      title: "Trade ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Text strong>{text}</Text>,
    },
  ];

  const totalValue = trades.reduce((sum, trade) => sum + trade.amount, 0);
  const avgConfidence = Math.round(
    trades.reduce((sum, trade) => sum + trade.confidenceScore, 0) /
      trades.length
  );
  const pendingTrades = trades.filter(
    (trade) => trade.status === "Pending"
  ).length;
  const executedTrades = trades.filter(
    (trade) => trade.status === "Executed"
  ).length;

  // Update the Card title and statistics
  return (
    <div
      style={{
        padding: "24px",
        marginTop: "84px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 84px)",
      }}
    >
      <Title level={2}>Risk Management Dashboard</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Portfolio Value"
              value={totalValue}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix="$"
              suffix=""
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Trades"
              value={pendingTrades}
              valueStyle={{ color: "#1890ff" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Confidence"
              value={avgConfidence}
              suffix="%"
              valueStyle={{
                color: avgConfidence >= 80 ? "#3f8600" : "#cf1322",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Executed Trades"
              value={executedTrades}
              valueStyle={{ color: "#52c41a" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Risk Exposure Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={12}>
          <Card
            title="Portfolio Risk Exposure"
            extra={<Tag color="blue">Live Data</Tag>}
          >
            {riskExposure.map((item, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <Text strong>{item.category}</Text>
                  <Space>
                    <Text>{item.exposure}%</Text>
                    {item.trend === "up" && (
                      <ArrowUpOutlined style={{ color: "#52c41a" }} />
                    )}
                    {item.trend === "down" && (
                      <ArrowDownOutlined style={{ color: "#ff4d4f" }} />
                    )}
                  </Space>
                </div>
                <Progress
                  percent={item.exposure}
                  strokeColor="#1890ff"
                  showInfo={false}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "4px",
                  }}
                >
                  <Text type="secondary">Confidence: {item.confidence}%</Text>
                  <Progress
                    percent={item.confidence}
                    size="small"
                    strokeColor={
                      item.confidence >= 80
                        ? "#52c41a"
                        : item.confidence >= 60
                          ? "#faad14"
                          : "#ff4d4f"
                    }
                    style={{ width: "60px" }}
                  />
                </div>
                {index < riskExposure.length - 1 && (
                  <Divider style={{ margin: "12px 0" }} />
                )}
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Risk Metrics Summary">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Portfolio VaR (95%)"
                  value={2.34}
                  precision={2}
                  suffix="%"
                  valueStyle={{ color: "#cf1322" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Sharpe Ratio"
                  value={1.67}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Max Drawdown"
                  value={8.45}
                  precision={2}
                  suffix="%"
                  valueStyle={{ color: "#cf1322" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Beta"
                  value={1.12}
                  precision={2}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Update the Trades Table */}
      <Card
        title="Trade Management"
        extra={
          <Badge count={trades.length} style={{ backgroundColor: "#52c41a" }} />
        }
      >
        <Table
          columns={columns}
          dataSource={trades}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }}
          size="middle"
        />
      </Card>
    </div>
  );
}
