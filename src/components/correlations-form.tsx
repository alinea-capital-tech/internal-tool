"use client";

import { Button, Input } from "antd";
import type React from "react";

import { useState } from "react";

export function CorrelationsForm() {
  const [ticker, setTicker] = useState("APPL");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Adding correlation for:", ticker);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-700 font-medium">Add Correlation:</span>
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-48"
            placeholder="Enter ticker symbol"
          />
          <Button htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit
          </Button>
        </form>
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <span className="text-red-500">←</span>
          <div>
            <div>Field de búsqueda/autocompletado.</div>
            <div>Agrega los tickers a la tabla de abajo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
