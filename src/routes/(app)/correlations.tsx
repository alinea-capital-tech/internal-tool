import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text } = Typography;
export const Route = createFileRoute("/(app)/correlations")({
  component: RouteComponent,
});

interface CorrelationData {
  id: string;
  ticker: string;
  correlation: number;
  tsla: number;
  weight: number;
}

function RouteComponent() {
  const [searchValue, setSearchValue] = useState("");
  const [correlations, setCorrelations] = useState<CorrelationData[]>([]);

  const handleAddCorrelation = async () => {
    if (searchValue.trim()) {
      var url =
        "https://ia.backend.alineacapitaltechnologies.com/v1/correlations";
      var usr = "alinea_ai_pruebas";
      var pass = "f/H9*LI{zUL.O>12vh+5>&=rabEd14d";
      const token =
        typeof window !== "undefined" && typeof window.btoa === "function"
          ? window.btoa(`${usr}:${pass}`)
          : Buffer.from(`${usr}:${pass}`, "utf-8").toString("base64");

      const payload = {
        tickers: [
          ...searchValue
            .toUpperCase()
            .split(",")
            .map((t) => t.trim()),
          ...correlations.map((c) => c.ticker),
        ],
        start_date: "1971-01-01",
        end_date: (() => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return yesterday.toISOString().slice(0, 10);
        })(), // YYYY-MM-DD (día anterior al actual)
      };

      const res = await axios.post(url, payload, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      console.log("API Response:", res.data);
      res.data?.correlations.forEach(([ticker, corr]: any) => {
        setCorrelations((prev: any) => {
          const existing = prev.find((c: any) => c.ticker === ticker);
          if (existing) {
            return prev.map((c: any) =>
              c.ticker === ticker ? { ...c, correlation: Number(corr) } : c
            );
          }
          return [
            ...prev,
            {
              id: Date.now().toString(),
              ticker,
              correlation: Number(corr),
              weight: 0.5,
            },
          ];
        });
      });
      setSearchValue("");
    }
  };

  const handleUpdateCorrelation = (
    id: string,
    field: keyof CorrelationData,
    value: number
  ) => {
    setCorrelations(
      correlations.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const totalWeight = correlations.reduce((sum, item) => sum + item.weight, 0);
  const totalCorrelation =
    correlations.reduce((sum, item) => {
      console.log(
        "item.correlation, item.weight",
        item.correlation,
        item.weight
      );
      return Number(sum + item.correlation * (item.weight / 100));
    }, 0) * 100;

  console.log("totalCorrelation", totalCorrelation);

  const columns = [
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      render: (ticker: string) => (
        <Tag color="blue" style={{ fontSize: "12px", padding: "2px 8px" }}>
          {ticker}
        </Tag>
      ),
    },
    {
      title: "Correlation",
      dataIndex: "correlation",
      key: "correlation",
      render: (value: number, record: CorrelationData) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>{value.toFixed(2)}</Text>
          {record.id === "1" && (
            <Text style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</Text>
          )}
        </div>
      ),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (value: number, record: CorrelationData) => (
        <Input
          size="small"
          value={`${value}%`}
          onChange={(e) => {
            const numValue = Number.parseFloat(e.target.value.replace("%", ""));
            if (!isNaN(numValue)) {
              handleUpdateCorrelation(record.id, "weight", numValue);
            }
          }}
          style={{ width: "70px", textAlign: "center" }}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "24px",
        marginTop: "84px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 84px)",
      }}
    >
      {/* Header Section */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}
        >
          <div>
            <Title
              level={3}
              style={{ margin: 0, display: "flex", alignItems: "center" }}
            >
              Portfolio's Correlations with S&P 500: [+ -] 0.00%
              <Text style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</Text>
            </Title>
          </div>
          <div>
            <Text strong>Last update: dd-MM-yyyy</Text>
            <Text style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</Text>
          </div>
        </div>

        {/* Add Correlation Section */}
        <Card size="small" style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Text strong>Add Correlation:</Text>
            <Input
              placeholder="APPL"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ width: "200px" }}
              prefix={<SearchOutlined />}
            />
            <Button
              type="primary"
              onClick={handleAddCorrelation}
              icon={<PlusOutlined />}
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card>
            <Table
              columns={columns}
              dataSource={correlations}
              rowKey="id"
              pagination={false}
              size="small"
              style={{ marginBottom: "16px" }}
            />

            <div
              style={{
                textAlign: "center",
                padding: "16px 0",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <Text strong style={{ fontSize: "16px" }}>
                Total Correlation: {totalCorrelation.toFixed(2)}%
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Total Weight Info */}
            <Card size="small">
              <Statistic
                title="Suma Total de Weights"
                value={totalWeight}
                precision={2}
                suffix="%"
                valueStyle={{
                  color:
                    totalWeight > 100
                      ? "#ff4d4f"
                      : totalWeight === 100
                        ? "#52c41a"
                        : "#1890ff",
                }}
              />
              <div style={{ marginTop: "12px" }}>
                <Text
                  style={{
                    color: "#1890ff",
                    fontSize: "13px",
                    display: "block",
                  }}
                >
                  Esta es la suma de los weights
                </Text>
                <Text
                  style={{
                    color: "#1890ff",
                    fontSize: "13px",
                    display: "block",
                  }}
                >
                  Debe avisar cuando se pase de 100%
                </Text>
                <Text
                  style={{
                    color: "#1890ff",
                    fontSize: "13px",
                    display: "block",
                  }}
                >
                  La suma de todos no debe superar el 100%
                </Text>
              </div>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
