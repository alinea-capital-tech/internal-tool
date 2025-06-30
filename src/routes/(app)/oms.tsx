import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  Table,
  Tag,
  Progress,
  Statistic,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Tabs,
} from "antd";
import {
  PieChartOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  AlertOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const Route = createFileRoute("/(app)/oms")({
  component: RouteComponent,
});

// Mock data for OMS/Execution analysis
const tradesByAssetClass = [
  {
    assetClass: "Equities",
    count: 45,
    volume: 2850000,
    avgSize: 63333,
    percentage: 65.2,
  },
  {
    assetClass: "Fixed Income",
    count: 18,
    volume: 1200000,
    avgSize: 66667,
    percentage: 26.1,
  },
  {
    assetClass: "Derivatives",
    count: 8,
    volume: 380000,
    avgSize: 47500,
    percentage: 8.7,
  },
];

const tradesByOrderType = [
  {
    orderType: "Market",
    count: 28,
    fillRate: 98.5,
    avgSlippage: 0.02,
    avgTime: "0.3s",
  },
  {
    orderType: "Limit",
    count: 32,
    fillRate: 87.2,
    avgSlippage: 0.01,
    avgTime: "2.4m",
  },
  {
    orderType: "Stop Loss",
    count: 8,
    fillRate: 95.8,
    avgSlippage: 0.05,
    avgTime: "1.2s",
  },
  {
    orderType: "TWAP",
    count: 3,
    fillRate: 92.1,
    avgSlippage: 0.03,
    avgTime: "15.6m",
  },
];

const tradesByTiming = [
  {
    timeSlot: "Pre-Market (4:00-9:30)",
    count: 8,
    volume: 245000,
    liquidity: "Low",
    impact: "High",
  },
  {
    timeSlot: "Market Open (9:30-10:30)",
    count: 22,
    volume: 1850000,
    liquidity: "High",
    impact: "Medium",
  },
  {
    timeSlot: "Mid-Day (10:30-15:00)",
    count: 28,
    volume: 1920000,
    liquidity: "Medium",
    impact: "Low",
  },
  {
    timeSlot: "Market Close (15:00-16:00)",
    count: 13,
    volume: 415000,
    liquidity: "High",
    impact: "Medium",
  },
];

const feeBreakdown = [
  {
    category: "Commission",
    amount: 2850,
    percentage: 45.2,
    description: "Broker execution fees",
  },
  {
    category: "Exchange Fees",
    amount: 1420,
    percentage: 22.5,
    description: "Market data and access fees",
  },
  {
    category: "Clearing",
    amount: 890,
    percentage: 14.1,
    description: "Settlement and clearing costs",
  },
  {
    category: "Regulatory",
    amount: 650,
    percentage: 10.3,
    description: "SEC and FINRA fees",
  },
  {
    category: "Market Impact",
    amount: 490,
    percentage: 7.9,
    description: "Price impact costs",
  },
];

const liquidityMetrics = [
  {
    metric: "Average Bid-Ask Spread",
    value: "0.08%",
    status: "Good",
    trend: "stable",
  },
  {
    metric: "Market Depth (Top 5)",
    value: "$2.4M",
    status: "Excellent",
    trend: "up",
  },
  { metric: "Price Impact", value: "0.12%", status: "Fair", trend: "down" },
  { metric: "Fill Rate", value: "94.2%", status: "Excellent", trend: "up" },
  { metric: "Slippage", value: "0.025%", status: "Good", trend: "stable" },
];

const executionQuality = [
  {
    venue: "NYSE",
    orders: 28,
    fillRate: 96.8,
    avgSlippage: 0.018,
    marketShare: 35.2,
    quality: "Excellent",
  },
  {
    venue: "NASDAQ",
    orders: 22,
    fillRate: 94.1,
    avgSlippage: 0.022,
    marketShare: 28.6,
    quality: "Good",
  },
  {
    venue: "BATS",
    orders: 15,
    fillRate: 92.3,
    avgSlippage: 0.031,
    marketShare: 19.5,
    quality: "Fair",
  },
  {
    venue: "IEX",
    orders: 6,
    fillRate: 98.2,
    avgSlippage: 0.015,
    marketShare: 7.8,
    quality: "Excellent",
  },
];

function RouteComponent() {
  const assetClassColumns = [
    {
      title: "Asset Class",
      dataIndex: "assetClass",
      key: "assetClass",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Trade Count",
      dataIndex: "count",
      key: "count",
      render: (count: number) => count.toLocaleString(),
    },
    {
      title: "Volume ($)",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => `$${volume.toLocaleString()}`,
    },
    {
      title: "Avg Size ($)",
      dataIndex: "avgSize",
      key: "avgSize",
      render: (size: number) => `$${size.toLocaleString()}`,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage: number) => (
        <div style={{ width: 100 }}>
          <Progress percent={percentage} size="small" strokeColor="#1890ff" />
          <Text style={{ fontSize: "12px" }}>{percentage}%</Text>
        </div>
      ),
    },
  ];

  const orderTypeColumns = [
    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Fill Rate",
      dataIndex: "fillRate",
      key: "fillRate",
      render: (rate: number) => (
        <Text
          style={{
            color: rate >= 95 ? "#3f8600" : rate >= 90 ? "#faad14" : "#cf1322",
          }}
        >
          {rate.toFixed(1)}%
        </Text>
      ),
    },
    {
      title: "Avg Slippage",
      dataIndex: "avgSlippage",
      key: "avgSlippage",
      render: (slippage: number) => (
        <Text
          style={{
            color:
              slippage <= 0.02
                ? "#3f8600"
                : slippage <= 0.04
                  ? "#faad14"
                  : "#cf1322",
          }}
        >
          {(slippage * 100).toFixed(3)}%
        </Text>
      ),
    },
    {
      title: "Avg Execution Time",
      dataIndex: "avgTime",
      key: "avgTime",
    },
  ];

  const timingColumns = [
    {
      title: "Time Slot",
      dataIndex: "timeSlot",
      key: "timeSlot",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Trade Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Volume ($)",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => `$${volume.toLocaleString()}`,
    },
    {
      title: "Liquidity",
      dataIndex: "liquidity",
      key: "liquidity",
      render: (liquidity: string) => {
        const color =
          liquidity === "High"
            ? "green"
            : liquidity === "Medium"
              ? "orange"
              : "red";
        return <Tag color={color}>{liquidity}</Tag>;
      },
    },
    {
      title: "Market Impact",
      dataIndex: "impact",
      key: "impact",
      render: (impact: string) => {
        const color =
          impact === "Low" ? "green" : impact === "Medium" ? "orange" : "red";
        return <Tag color={color}>{impact}</Tag>;
      },
    },
  ];

  const feeColumns = [
    {
      title: "Fee Category",
      dataIndex: "category",
      key: "category",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage: number) => (
        <div style={{ width: 80 }}>
          <Progress percent={percentage} size="small" strokeColor="#ff7875" />
          <Text style={{ fontSize: "12px" }}>{percentage}%</Text>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
  ];

  const venueColumns = [
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "Fill Rate",
      dataIndex: "fillRate",
      key: "fillRate",
      render: (rate: number) => `${rate.toFixed(1)}%`,
    },
    {
      title: "Avg Slippage",
      dataIndex: "avgSlippage",
      key: "avgSlippage",
      render: (slippage: number) => `${(slippage * 100).toFixed(3)}%`,
    },
    {
      title: "Market Share",
      dataIndex: "marketShare",
      key: "marketShare",
      render: (share: number) => `${share.toFixed(1)}%`,
    },
    {
      title: "Quality",
      dataIndex: "quality",
      key: "quality",
      render: (quality: string) => {
        const color =
          quality === "Excellent"
            ? "green"
            : quality === "Good"
              ? "blue"
              : "orange";
        return <Tag color={color}>{quality}</Tag>;
      },
    },
  ];

  const totalVolume = tradesByAssetClass.reduce(
    (sum, item) => sum + item.volume,
    0
  );
  const totalTrades = tradesByAssetClass.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const totalFees = feeBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const avgFillRate =
    tradesByOrderType.reduce((sum, item) => sum + item.fillRate, 0) /
    tradesByOrderType.length;

  return (
    <div
      style={{
        padding: "24px",
        marginTop: "84px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 84px)",
      }}
    >
      <Title level={2}>OMS/Execution Preview</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Volume"
              value={totalVolume}
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
              title="Total Trades"
              value={totalTrades}
              valueStyle={{ color: "#1890ff" }}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Fees"
              value={totalFees}
              precision={0}
              valueStyle={{ color: "#cf1322" }}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Fill Rate"
              value={avgFillRate}
              precision={1}
              suffix="%"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Trade Breakdown" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="By Asset Class" extra={<PieChartOutlined />}>
                <Table
                  columns={assetClassColumns}
                  dataSource={tradesByAssetClass}
                  rowKey="assetClass"
                  pagination={false}
                  scroll={{ x: 600 }}
                  size="small"
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="By Order Type" extra={<BarChartOutlined />}>
                <Table
                  columns={orderTypeColumns}
                  dataSource={tradesByOrderType}
                  rowKey="orderType"
                  pagination={false}
                  scroll={{ x: 700 }}
                  size="small"
                />
              </Card>
            </Col>
            <Col xs={24}>
              <Card title="By Timing" extra={<ClockCircleOutlined />}>
                <Table
                  columns={timingColumns}
                  dataSource={tradesByTiming}
                  rowKey="timeSlot"
                  pagination={false}
                  scroll={{ x: 600 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Fees & Costs" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Fee Breakdown" extra={<DollarOutlined />}>
                <Table
                  columns={feeColumns}
                  dataSource={feeBreakdown}
                  rowKey="category"
                  pagination={false}
                  scroll={{ x: 500 }}
                  size="small"
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Cost Analysis">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Statistic
                      title="Total Trading Costs"
                      value={totalFees}
                      precision={0}
                      valueStyle={{ color: "#cf1322" }}
                      prefix="$"
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="Cost as % of Volume"
                      value={(totalFees / totalVolume) * 100}
                      precision={3}
                      suffix="%"
                      valueStyle={{ color: "#faad14" }}
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="Cost per Trade"
                      value={totalFees / totalTrades}
                      precision={2}
                      valueStyle={{ color: "#1890ff" }}
                      prefix="$"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Liquidity & Quality" key="3">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Liquidity Metrics" extra={<RiseOutlined />}>
                {liquidityMetrics.map((metric, index) => (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <Text strong>{metric.metric}</Text>
                      <Space>
                        <Text>{metric.value}</Text>
                        <Tag
                          color={
                            metric.status === "Excellent"
                              ? "green"
                              : metric.status === "Good"
                                ? "blue"
                                : "orange"
                          }
                        >
                          {metric.status}
                        </Tag>
                      </Space>
                    </div>
                    {index < liquidityMetrics.length - 1 && (
                      <Divider style={{ margin: "8px 0" }} />
                    )}
                  </div>
                ))}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title="Execution Quality by Venue"
                extra={<AlertOutlined />}
              >
                <Table
                  columns={venueColumns}
                  dataSource={executionQuality}
                  rowKey="venue"
                  pagination={false}
                  scroll={{ x: 700 }}
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
