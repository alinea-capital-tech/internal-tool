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
  Tabs,
  Alert,
} from "antd";
import {
  DashboardOutlined,
  GlobalOutlined,
  DollarOutlined,
  BankOutlined,
  LineChartOutlined,
  AlertOutlined,
  SmileOutlined,
  FrownOutlined,
  MehOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const Route = createFileRoute("/(app)/macro")({
  component: RouteComponent,
});

// Mock data for macro indicators
const macroIndicators = [
  {
    indicator: "CPI (YoY)",
    current: 3.2,
    previous: 3.7,
    target: 2.0,
    change: -0.5,
    status: "improving",
    lastUpdate: "2024-01-15",
    impact: "High",
  },
  {
    indicator: "Core CPI (YoY)",
    current: 4.0,
    previous: 4.3,
    target: 2.0,
    change: -0.3,
    status: "improving",
    lastUpdate: "2024-01-15",
    impact: "High",
  },
  {
    indicator: "Unemployment Rate",
    current: 3.7,
    previous: 3.9,
    target: 4.0,
    change: -0.2,
    status: "improving",
    lastUpdate: "2024-01-05",
    impact: "Medium",
  },
  {
    indicator: "Fed Funds Rate",
    current: 5.25,
    previous: 5.25,
    target: 4.5,
    change: 0.0,
    status: "stable",
    lastUpdate: "2024-01-31",
    impact: "High",
  },
  {
    indicator: "10Y Treasury Yield",
    current: 4.15,
    previous: 4.32,
    target: 3.8,
    change: -0.17,
    status: "declining",
    lastUpdate: "2024-02-02",
    impact: "High",
  },
  {
    indicator: "GDP Growth (QoQ)",
    current: 2.4,
    previous: 2.1,
    target: 2.5,
    change: 0.3,
    status: "improving",
    lastUpdate: "2024-01-25",
    impact: "Medium",
  },
];

const fxRates = [
  {
    pair: "EUR/USD",
    rate: 1.0875,
    change: 0.0023,
    changePercent: 0.21,
    trend: "up",
    volatility: "Low",
    volume: "High",
  },
  {
    pair: "GBP/USD",
    rate: 1.2634,
    change: -0.0045,
    changePercent: -0.35,
    trend: "down",
    volatility: "Medium",
    volume: "Medium",
  },
  {
    pair: "USD/JPY",
    rate: 149.85,
    change: 0.67,
    changePercent: 0.45,
    trend: "up",
    volatility: "High",
    volume: "High",
  },
  {
    pair: "USD/CHF",
    rate: 0.8756,
    change: 0.0012,
    changePercent: 0.14,
    trend: "up",
    volatility: "Low",
    volume: "Low",
  },
  {
    pair: "AUD/USD",
    rate: 0.6587,
    change: -0.0034,
    changePercent: -0.51,
    trend: "down",
    volatility: "Medium",
    volume: "Medium",
  },
];

const marketSentiment = [
  {
    source: "Financial News",
    sentiment: "Bearish",
    score: 32,
    volume: 1247,
    keywords: ["inflation", "recession", "rate hikes"],
    trend: "declining",
  },
  {
    source: "Social Media",
    sentiment: "Neutral",
    score: 58,
    volume: 8934,
    keywords: ["earnings", "tech stocks", "AI"],
    trend: "stable",
  },
  {
    source: "Analyst Reports",
    sentiment: "Bullish",
    score: 72,
    volume: 156,
    keywords: ["growth", "recovery", "opportunities"],
    trend: "improving",
  },
  {
    source: "Reddit/Forums",
    sentiment: "Bearish",
    score: 28,
    volume: 3421,
    keywords: ["market crash", "bubble", "overvalued"],
    trend: "declining",
  },
  {
    source: "Twitter/X",
    sentiment: "Neutral",
    score: 54,
    volume: 12847,
    keywords: ["fed meeting", "jobs report", "volatility"],
    trend: "stable",
  },
];

const economicCalendar = [
  {
    date: "2024-02-05",
    time: "08:30",
    event: "Non-Farm Payrolls",
    importance: "High",
    forecast: "185K",
    previous: "216K",
    impact: "USD",
  },
  {
    date: "2024-02-06",
    time: "14:00",
    event: "FOMC Meeting Minutes",
    importance: "High",
    forecast: "-",
    previous: "-",
    impact: "USD",
  },
  {
    date: "2024-02-07",
    time: "10:00",
    event: "ECB Interest Rate Decision",
    importance: "High",
    forecast: "4.50%",
    previous: "4.50%",
    impact: "EUR",
  },
  {
    date: "2024-02-08",
    time: "08:30",
    event: "Initial Jobless Claims",
    importance: "Medium",
    forecast: "215K",
    previous: "224K",
    impact: "USD",
  },
];

function RouteComponent() {
  const macroColumns = [
    {
      title: "Indicator",
      dataIndex: "indicator",
      key: "indicator",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Current",
      dataIndex: "current",
      key: "current",
      render: (value: number) => `${value.toFixed(2)}%`,
    },
    {
      title: "Previous",
      dataIndex: "previous",
      key: "previous",
      render: (value: number) => `${value.toFixed(2)}%`,
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      render: (value: number) => `${value.toFixed(2)}%`,
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      render: (change: number) => (
        <Text style={{ color: change >= 0 ? "#3f8600" : "#cf1322" }}>
          {change >= 0 ? <RiseOutlined /> : <FallOutlined />}
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          improving: "green",
          stable: "blue",
          declining: "red",
        };
        return (
          <Tag color={colorMap[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: "Impact",
      dataIndex: "impact",
      key: "impact",
      render: (impact: string) => {
        const color =
          impact === "High" ? "red" : impact === "Medium" ? "orange" : "green";
        return <Tag color={color}>{impact}</Tag>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      render: (date: string) => <Text type="secondary">{date}</Text>,
    },
  ];

  const fxColumns = [
    {
      title: "Currency Pair",
      dataIndex: "pair",
      key: "pair",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (rate: number) => rate.toFixed(4),
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      render: (change: number) => (
        <Text style={{ color: change >= 0 ? "#3f8600" : "#cf1322" }}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(4)}
        </Text>
      ),
    },
    {
      title: "Change %",
      dataIndex: "changePercent",
      key: "changePercent",
      render: (change: number) => (
        <Text style={{ color: change >= 0 ? "#3f8600" : "#cf1322" }}>
          {change >= 0 ? <RiseOutlined /> : <FallOutlined />}
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </Text>
      ),
    },
    {
      title: "Volatility",
      dataIndex: "volatility",
      key: "volatility",
      render: (vol: string) => {
        const color =
          vol === "High" ? "red" : vol === "Medium" ? "orange" : "green";
        return <Tag color={color}>{vol}</Tag>;
      },
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (vol: string) => {
        const color =
          vol === "High" ? "green" : vol === "Medium" ? "blue" : "orange";
        return <Tag color={color}>{vol}</Tag>;
      },
    },
  ];

  const sentimentColumns = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment",
      key: "sentiment",
      render: (sentiment: string) => {
        const config = {
          Bullish: { color: "green", icon: <SmileOutlined /> },
          Neutral: { color: "blue", icon: <MehOutlined /> },
          Bearish: { color: "red", icon: <FrownOutlined /> },
        };
        const { color, icon } = config[sentiment as keyof typeof config];
        return (
          <Tag color={color} icon={icon}>
            {sentiment}
          </Tag>
        );
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (score: number) => (
        <div style={{ width: 80 }}>
          <Progress
            percent={score}
            size="small"
            strokeColor={
              score >= 70 ? "#52c41a" : score >= 40 ? "#faad14" : "#ff4d4f"
            }
            showInfo={false}
          />
          <Text style={{ fontSize: "12px" }}>{score}/100</Text>
        </div>
      ),
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      render: (volume: number) => volume.toLocaleString(),
    },
    {
      title: "Top Keywords",
      dataIndex: "keywords",
      key: "keywords",
      render: (keywords: string[]) => (
        <Space wrap>
          {keywords.slice(0, 3).map((keyword, index) => (
            <Tag key={index}>{keyword}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      key: "trend",
      render: (trend: string) => {
        const colorMap: Record<string, string> = {
          improving: "green",
          stable: "blue",
          declining: "red",
        };
        return <Tag color={colorMap[trend]}>{trend}</Tag>;
      },
    },
  ];

  const calendarColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => <Text strong>{date}</Text>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Importance",
      dataIndex: "importance",
      key: "importance",
      render: (importance: string) => {
        const color =
          importance === "High"
            ? "red"
            : importance === "Medium"
              ? "orange"
              : "green";
        return <Tag color={color}>{importance}</Tag>;
      },
    },
    {
      title: "Forecast",
      dataIndex: "forecast",
      key: "forecast",
    },
    {
      title: "Previous",
      dataIndex: "previous",
      key: "previous",
    },
    {
      title: "Impact",
      dataIndex: "impact",
      key: "impact",
      render: (currency: string) => <Tag>{currency}</Tag>,
    },
  ];

  const avgSentiment = Math.round(
    marketSentiment.reduce((sum, item) => sum + item.score, 0) /
      marketSentiment.length
  );
  const totalMentions = marketSentiment.reduce(
    (sum, item) => sum + item.volume,
    0
  );
  const improvingIndicators = macroIndicators.filter(
    (item) => item.status === "improving"
  ).length;
  const highImpactEvents = economicCalendar.filter(
    (item) => item.importance === "High"
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
      <Title level={2}>Macro Panel</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Market Sentiment"
              value={avgSentiment}
              suffix="/100"
              valueStyle={{
                color:
                  avgSentiment >= 70
                    ? "#3f8600"
                    : avgSentiment >= 40
                      ? "#faad14"
                      : "#cf1322",
              }}
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Mentions"
              value={totalMentions}
              valueStyle={{ color: "#1890ff" }}
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Improving Indicators"
              value={improvingIndicators}
              suffix={`/${macroIndicators.length}`}
              valueStyle={{ color: "#3f8600" }}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="High Impact Events"
              value={highImpactEvents}
              valueStyle={{ color: "#cf1322" }}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Macro Indicators" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Real-time Macro Data"
                description="Key economic indicators updated in real-time. Monitor inflation, employment, and monetary policy changes."
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Economic Indicators" extra={<LineChartOutlined />}>
                <Table
                  columns={macroColumns}
                  dataSource={macroIndicators}
                  rowKey="indicator"
                  pagination={false}
                  scroll={{ x: 900 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="FX & Interest Rates" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Foreign Exchange Rates" extra={<DollarOutlined />}>
                <Table
                  columns={fxColumns}
                  dataSource={fxRates}
                  rowKey="pair"
                  pagination={false}
                  scroll={{ x: 700 }}
                  size="small"
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Interest Rate Summary" extra={<BankOutlined />}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Statistic
                      title="Fed Funds Rate"
                      value={5.25}
                      precision={2}
                      suffix="%"
                      valueStyle={{ color: "#cf1322" }}
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="10Y Treasury"
                      value={4.15}
                      precision={2}
                      suffix="%"
                      valueStyle={{ color: "#faad14" }}
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="2Y Treasury"
                      value={4.42}
                      precision={2}
                      suffix="%"
                      valueStyle={{ color: "#1890ff" }}
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="Yield Curve (10Y-2Y)"
                      value={-0.27}
                      precision={2}
                      suffix="%"
                      valueStyle={{ color: "#cf1322" }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Market Sentiment" key="3">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Market Feeling Index"
                description="Real-time sentiment analysis from news sources, social media, and analyst reports. Sentiment scores range from 0 (extremely bearish) to 100 (extremely bullish)."
                type="warning"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Sentiment Analysis" extra={<GlobalOutlined />}>
                <Table
                  columns={sentimentColumns}
                  dataSource={marketSentiment}
                  rowKey="source"
                  pagination={false}
                  scroll={{ x: 800 }}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Economic Calendar" key="4">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Upcoming Economic Events"
                description="Key economic releases and central bank meetings that may impact markets."
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card title="Economic Calendar" extra={<AlertOutlined />}>
                <Table
                  columns={calendarColumns}
                  dataSource={economicCalendar}
                  rowKey={(record) => `${record.date}-${record.event}`}
                  pagination={false}
                  scroll={{ x: 800 }}
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
