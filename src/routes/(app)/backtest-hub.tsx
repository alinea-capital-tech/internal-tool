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
  Form,
  Input,
  Select,
  Button,
  Space,
} from "antd";
import {
  ExperimentOutlined,
  SettingOutlined,
  LineChartOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HistoryOutlined,
  RocketOutlined,
  ToolOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export const Route = createFileRoute("/(app)/backtest-hub")({
  component: RouteComponent,
});

// Mock data for backtest parameters
const backtestParameters = [
  {
    id: "BT-PARAM-001",
    name: "Momentum Lookback Period",
    strategy: "Momentum",
    currentValue: 20,
    defaultValue: 20,
    minValue: 5,
    maxValue: 60,
    step: 5,
    description: "Number of days to look back for momentum calculation",
    impact: "Medium",
  },
  {
    id: "BT-PARAM-002",
    name: "RSI Overbought Threshold",
    strategy: "Mean Reversion",
    currentValue: 70,
    defaultValue: 70,
    minValue: 60,
    maxValue: 90,
    step: 5,
    description: "RSI level considered overbought",
    impact: "High",
  },
  {
    id: "BT-PARAM-003",
    name: "RSI Oversold Threshold",
    strategy: "Mean Reversion",
    currentValue: 30,
    defaultValue: 30,
    minValue: 10,
    maxValue: 40,
    step: 5,
    description: "RSI level considered oversold",
    impact: "High",
  },
  {
    id: "BT-PARAM-004",
    name: "Moving Average Period (Short)",
    strategy: "Trend Following",
    currentValue: 50,
    defaultValue: 50,
    minValue: 10,
    maxValue: 100,
    step: 10,
    description: "Period for short-term moving average",
    impact: "Medium",
  },
  {
    id: "BT-PARAM-005",
    name: "Moving Average Period (Long)",
    strategy: "Trend Following",
    currentValue: 200,
    defaultValue: 200,
    minValue: 50,
    maxValue: 300,
    step: 50,
    description: "Period for long-term moving average",
    impact: "Medium",
  },
];

// Mock data for controlled experiments
const controlledExperiments = [
  {
    id: "EXP-001",
    name: "Momentum Parameter Optimization",
    strategy: "Momentum",
    status: "Completed",
    parameters: ["Lookback Period", "Signal Threshold"],
    results: {
      bestParams: "Lookback: 25 days, Threshold: 0.15",
      improvement: "+2.8%",
      sharpeImprovement: "+0.32",
    },
    date: "2024-01-28",
    duration: "4h 12m",
  },
  {
    id: "EXP-002",
    name: "Mean Reversion RSI Thresholds",
    strategy: "Mean Reversion",
    status: "In Progress",
    parameters: [
      "Oversold Threshold",
      "Overbought Threshold",
      "Holding Period",
    ],
    results: null,
    date: "2024-02-02",
    duration: "2h 45m (est.)",
  },
  {
    id: "EXP-003",
    name: "Trend Following MA Optimization",
    strategy: "Trend Following",
    status: "Scheduled",
    parameters: ["Short MA Period", "Long MA Period", "Signal Confirmation"],
    results: null,
    date: "2024-02-05",
    duration: "5h 30m (est.)",
  },
  {
    id: "EXP-004",
    name: "Stop Loss Impact Analysis",
    strategy: "All Strategies",
    status: "Completed",
    parameters: ["Stop Loss %", "Trailing Stop", "Time-Based Exit"],
    results: {
      bestParams: "Stop Loss: 8%, Trailing: Yes, Time Exit: 15 days",
      improvement: "+1.5%",
      sharpeImprovement: "+0.18",
    },
    date: "2024-01-20",
    duration: "6h 38m",
  },
];

// Mock data for backtest results
const backtestResults = [
  {
    id: "BT-001",
    strategy: "Momentum",
    period: "2020-01-01 to 2023-12-31",
    parameters: "Default",
    cagr: 15.8,
    maxDrawdown: 22.5,
    sharpe: 1.25,
    winRate: 62.4,
    profitFactor: 1.85,
    status: "Baseline",
  },
  {
    id: "BT-002",
    strategy: "Momentum",
    period: "2020-01-01 to 2023-12-31",
    parameters: "Optimized",
    cagr: 18.6,
    maxDrawdown: 21.2,
    sharpe: 1.57,
    winRate: 65.8,
    profitFactor: 2.12,
    status: "Improved",
  },
  {
    id: "BT-003",
    strategy: "Mean Reversion",
    period: "2020-01-01 to 2023-12-31",
    parameters: "Default",
    cagr: 12.4,
    maxDrawdown: 18.7,
    sharpe: 1.05,
    winRate: 58.2,
    profitFactor: 1.62,
    status: "Baseline",
  },
  {
    id: "BT-004",
    strategy: "Trend Following",
    period: "2020-01-01 to 2023-12-31",
    parameters: "Default",
    cagr: 14.2,
    maxDrawdown: 24.8,
    sharpe: 1.18,
    winRate: 52.5,
    profitFactor: 1.95,
    status: "Baseline",
  },
];

function RouteComponent() {
  const parameterColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Parámetro",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: "Estrategia",
      dataIndex: "strategy",
      key: "strategy",
      render: (strategy: string) => <Tag color="blue">{strategy}</Tag>,
    },
    {
      title: "Valor Actual",
      dataIndex: "currentValue",
      key: "currentValue",
      render: (value: number, record: any) => (
        <Text
          style={{
            color: value !== record.defaultValue ? "#1890ff" : undefined,
          }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Valor Default",
      dataIndex: "defaultValue",
      key: "defaultValue",
    },
    {
      title: "Rango",
      dataIndex: "range",
      key: "range",
      render: (_: any, record: any) => (
        <Text type="secondary">
          {record.minValue} - {record.maxValue}
        </Text>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (desc: string) => <Text>{desc}</Text>,
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
      key: "actions",
      render: () => (
        <Space size="small">
          <Button type="text" icon={<SettingOutlined />} size="small">
            Editar
          </Button>
          <Button type="text" icon={<LineChartOutlined />} size="small">
            Simular
          </Button>
        </Space>
      ),
    },
  ];

  const experimentColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Experimento",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: "Estrategia",
      dataIndex: "strategy",
      key: "strategy",
      render: (strategy: string) => <Tag color="blue">{strategy}</Tag>,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const config = {
          Completed: { color: "success", icon: <CheckCircleOutlined /> },
          "In Progress": { color: "processing", icon: <HistoryOutlined /> },
          Scheduled: { color: "default", icon: <ClockCircleOutlined /> },
          Failed: { color: "error", icon: <CloseCircleOutlined /> },
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
      title: "Parámetros",
      dataIndex: "parameters",
      key: "parameters",
      render: (params: string[]) => (
        <Space direction="vertical" size="small">
          {params.map((param, index) => (
            <Text key={index} type="secondary">
              • {param}
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Resultados",
      dataIndex: "results",
      key: "results",
      render: (results: any) =>
        results ? (
          <Space direction="vertical" size="small">
            <Text>
              <strong>Mejores Parámetros:</strong> {results.bestParams}
            </Text>
            <Text style={{ color: "#3f8600" }}>
              <strong>Mejora:</strong> {results.improvement}
            </Text>
            <Text style={{ color: "#3f8600" }}>
              <strong>Mejora Sharpe:</strong> {results.sharpeImprovement}
            </Text>
          </Space>
        ) : (
          <Text type="secondary">Pendiente</Text>
        ),
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date: string) => <Text>{date}</Text>,
    },
    {
      title: "Duración",
      dataIndex: "duration",
      key: "duration",
      render: (duration: string) => <Text type="secondary">{duration}</Text>,
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="small">
          {record.status === "Completed" ? (
            <Button type="text" icon={<BarChartOutlined />} size="small">
              Ver Resultados
            </Button>
          ) : record.status === "Scheduled" ? (
            <Button type="text" icon={<RocketOutlined />} size="small">
              Iniciar
            </Button>
          ) : null}
        </Space>
      ),
    },
  ];

  const resultsColumns = [
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
      render: (strategy: string) => <Tag color="blue">{strategy}</Tag>,
    },
    {
      title: "Periodo",
      dataIndex: "period",
      key: "period",
      render: (period: string) => <Text>{period}</Text>,
    },
    {
      title: "Parámetros",
      dataIndex: "parameters",
      key: "parameters",
      render: (params: string) => <Text>{params}</Text>,
    },
    {
      title: "CAGR",
      dataIndex: "cagr",
      key: "cagr",
      render: (cagr: number) => (
        <Text style={{ color: "#3f8600" }}>{cagr.toFixed(1)}%</Text>
      ),
    },
    {
      title: "Max Drawdown",
      dataIndex: "maxDrawdown",
      key: "maxDrawdown",
      render: (dd: number) => (
        <Text style={{ color: "#cf1322" }}>-{dd.toFixed(1)}%</Text>
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
      title: "Win Rate",
      dataIndex: "winRate",
      key: "winRate",
      render: (rate: number) => <Text>{rate.toFixed(1)}%</Text>,
    },
    {
      title: "Profit Factor",
      dataIndex: "profitFactor",
      key: "profitFactor",
      render: (factor: number) => <Text>{factor.toFixed(2)}</Text>,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Improved"
            ? "green"
            : status === "Baseline"
              ? "blue"
              : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const completedExperiments = controlledExperiments.filter(
    (exp) => exp.status === "Completed"
  ).length;
  const pendingExperiments = controlledExperiments.filter(
    (exp) => exp.status !== "Completed"
  ).length;
  const modifiedParameters = backtestParameters.filter(
    (param) => param.currentValue !== param.defaultValue
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
      <Title level={2}>Backtest Hub</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Parámetros Modificados"
              value={modifiedParameters}
              suffix={`/${backtestParameters.length}`}
              valueStyle={{ color: "#1890ff" }}
              prefix={<SettingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Experimentos Completados"
              value={completedExperiments}
              valueStyle={{ color: "#3f8600" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Experimentos Pendientes"
              value={pendingExperiments}
              valueStyle={{ color: "#faad14" }}
              prefix={<HistoryOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Modificación de Parámetros" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Modificación de Parámetros de Backtest"
                description="Ajuste los parámetros de las estrategias para optimizar el rendimiento en backtesting."
                type="info"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card
                title="Parámetros de Estrategias"
                extra={<SettingOutlined />}
              >
                <Table
                  columns={parameterColumns}
                  dataSource={backtestParameters}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Experimentos Controlados" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Experimentos Controlados"
                description="Ejecute experimentos controlados para optimizar parámetros y evaluar el impacto en el rendimiento."
                type="warning"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card
                title="Experimentos"
                extra={
                  <Button type="primary" icon={<ExperimentOutlined />}>
                    Nuevo Experimento
                  </Button>
                }
              >
                <Table
                  columns={experimentColumns}
                  dataSource={controlledExperiments}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Resultados de Backtest" key="3">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Alert
                message="Resultados de Backtest"
                description="Resultados de backtesting para diferentes estrategias y configuraciones de parámetros."
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
              <Card
                title="Resultados"
                extra={
                  <Button type="primary" icon={<LineChartOutlined />}>
                    Ejecutar Nuevo Backtest
                  </Button>
                }
              >
                <Table
                  columns={resultsColumns}
                  dataSource={backtestResults}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Configuración" key="4">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Configuración de Backtest" extra={<ToolOutlined />}>
                <Form layout="vertical">
                  <Form.Item label="Periodo de Backtest">
                    <Space>
                      <Input placeholder="Fecha inicio" />
                      <Input placeholder="Fecha fin" />
                    </Space>
                  </Form.Item>
                  <Form.Item label="Universo de Activos">
                    <Select
                      placeholder="Seleccionar universo"
                      style={{ width: "100%" }}
                    >
                      <Option value="sp500">S&P 500</Option>
                      <Option value="nasdaq100">NASDAQ 100</Option>
                      <Option value="russell2000">Russell 2000</Option>
                      <Option value="custom">Personalizado</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Capital Inicial">
                    <Input placeholder="$1,000,000" />
                  </Form.Item>
                  <Form.Item label="Comisiones">
                    <Input placeholder="0.005%" />
                  </Form.Item>
                  <Form.Item label="Slippage">
                    <Input placeholder="0.01%" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" icon={<RocketOutlined />}>
                      Ejecutar Backtest
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Configuración de Experimentos">
                <Paragraph>
                  <strong>Configuración de Optimización:</strong>
                </Paragraph>
                <Form layout="vertical">
                  <Form.Item label="Método de Optimización">
                    <Select
                      placeholder="Seleccionar método"
                      style={{ width: "100%" }}
                    >
                      <Option value="grid">Grid Search</Option>
                      <Option value="random">Random Search</Option>
                      <Option value="bayesian">Bayesian Optimization</Option>
                      <Option value="genetic">Genetic Algorithm</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Métrica de Optimización">
                    <Select
                      placeholder="Seleccionar métrica"
                      style={{ width: "100%" }}
                    >
                      <Option value="sharpe">Sharpe Ratio</Option>
                      <Option value="cagr">CAGR</Option>
                      <Option value="calmar">Calmar Ratio</Option>
                      <Option value="sortino">Sortino Ratio</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Número de Iteraciones">
                    <Input placeholder="1000" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" icon={<ExperimentOutlined />}>
                      Configurar Experimento
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}
