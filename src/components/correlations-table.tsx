"use client";

import { Input } from "antd";
import { useState } from "react";

interface CorrelationRow {
  id: string;
  ticker: string;
  correlation: number;
  tsla: string;
  weight: string;
}

export function CorrelationsTable() {
  const [rows, setRows] = useState<CorrelationRow[]>([
    { id: "1", ticker: "APPL", correlation: 0.0, tsla: "0.5%", weight: "0.5%" },
    { id: "2", ticker: "APPL", correlation: 0.0, tsla: "0.5%", weight: "0.5%" },
    { id: "3", ticker: "APPL", correlation: 0.0, tsla: "0.5%", weight: "0.5%" },
    { id: "4", ticker: "APPL", correlation: 0.0, tsla: "0.5%", weight: "0.5%" },
    { id: "5", ticker: "APPL", correlation: 0.0, tsla: "0.5%", weight: "0.5%" },
  ]);

  const updateRow = (id: string, field: "tsla" | "weight", value: string) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const totalWeight = rows.reduce((sum, row) => {
    const weight = Number.parseFloat(row.weight.replace("%", "")) || 0;
    return sum + weight;
  }, 0);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Ticker
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Correlation
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                TSLA
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Weight
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {row.ticker}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {row.correlation.toFixed(2)}
                  {index === 0 && <span className="text-red-500 ml-1">*</span>}
                </td>
                <td className="py-3 px-4">
                  <Input
                    type="text"
                    value={row.tsla}
                    onChange={(e) => updateRow(row.id, "tsla", e.target.value)}
                    className="w-20 h-8 text-sm"
                  />
                </td>
                <td className="py-3 px-4">
                  <Input
                    type="text"
                    value={row.weight}
                    onChange={(e) =>
                      updateRow(row.id, "weight", e.target.value)
                    }
                    className="w-20 h-8 text-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex items-start justify-between">
        <div className="text-blue-600 text-sm space-y-1">
          <div>Los fields de TSLA y weight deben</div>
          <div>tener dos dígitos.</div>
          <div className="mt-3">Los fields de weight deben tener</div>
          <div>máximo 2.00% como máximo</div>
          <div>y 0.00% como mínimo cada uno.</div>
        </div>

        <div className="text-right">
          <div className="text-lg font-medium text-gray-900 mb-2">
            Total Correlation: {totalWeight.toFixed(2)}%
          </div>
          <div className="text-blue-600 text-sm space-y-1">
            <div>Esta es la suma de los weights</div>
            <div>Debe avisar cuando se pase de 100%</div>
            <div>La suma de todos no debe superar el 100%</div>
          </div>
          <div className="mt-2">
            <span className="text-red-500">←</span>
          </div>
        </div>
      </div>
    </div>
  );
}
