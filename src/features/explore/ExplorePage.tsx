import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";

import { formatPercent } from "../../shared/utils/formatters";
import "./ExplorePage.css";

type ChartInstance = {
  destroy: () => void;
};

type ChartConstructor = new (
  context: CanvasRenderingContext2D,
  config: Record<string, unknown>,
) => ChartInstance;

declare global {
  interface Window {
    Chart?: ChartConstructor;
  }
}

interface FundPoint {
  month: string;
  value: number;
  benchmark: number;
}

interface FundOption {
  id: string;
  name: string;
  category: string;
  risk: string;
  sip: string;
  expense: string;
  managerView: string;
  series: [FundPoint, ...FundPoint[]];
}

const funds: [FundOption, ...FundOption[]] = [
  {
    id: "flexi-cap",
    name: "Bala Flexi Cap Fund",
    category: "Equity - Flexi Cap",
    risk: "Moderately High",
    sip: "$250/mo",
    expense: "0.62%",
    managerView: "Balanced large-cap core with room for selective mid-cap upside.",
    series: [
      { month: "Jan", value: 100, benchmark: 100 },
      { month: "Feb", value: 103, benchmark: 101 },
      { month: "Mar", value: 106, benchmark: 103 },
      { month: "Apr", value: 111, benchmark: 106 },
      { month: "May", value: 116, benchmark: 109 },
      { month: "Jun", value: 121, benchmark: 112 },
      { month: "Jul", value: 128, benchmark: 116 },
    ],
  },
  {
    id: "nifty-index",
    name: "Bala Nifty 50 Index Fund",
    category: "Equity - Large Cap Index",
    risk: "High",
    sip: "$200/mo",
    expense: "0.18%",
    managerView: "Low-cost market exposure for steady long-term compounding.",
    series: [
      { month: "Jan", value: 100, benchmark: 100 },
      { month: "Feb", value: 101, benchmark: 101 },
      { month: "Mar", value: 103, benchmark: 103 },
      { month: "Apr", value: 106, benchmark: 106 },
      { month: "May", value: 109, benchmark: 109 },
      { month: "Jun", value: 112, benchmark: 112 },
      { month: "Jul", value: 116, benchmark: 116 },
    ],
  },
  {
    id: "short-debt",
    name: "Bala Short Duration Debt Fund",
    category: "Debt - Short Duration",
    risk: "Low to Moderate",
    sip: "$200/mo",
    expense: "0.31%",
    managerView: "Designed to keep emergency allocation stable while earning modest yield.",
    series: [
      { month: "Jan", value: 100, benchmark: 100 },
      { month: "Feb", value: 101, benchmark: 100.7 },
      { month: "Mar", value: 101.8, benchmark: 101.2 },
      { month: "Apr", value: 102.4, benchmark: 101.8 },
      { month: "May", value: 103.1, benchmark: 102.3 },
      { month: "Jun", value: 103.8, benchmark: 102.9 },
      { month: "Jul", value: 104.6, benchmark: 103.5 },
    ],
  },
];

export default function ExplorePage() {
  const [selectedFundId, setSelectedFundId] = useState(funds[0].id);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartInstance | null>(null);

  const selectedFund = useMemo(
    () => funds.find((fund) => fund.id === selectedFundId) ?? funds[0],
    [selectedFundId],
  );

  const latestPoint = selectedFund.series.at(-1) ?? selectedFund.series[0];
  const firstPoint = selectedFund.series[0];
  const returnPercent = ((latestPoint.value - firstPoint.value) / firstPoint.value) * 100;
  const benchmarkPercent =
    ((latestPoint.benchmark - firstPoint.benchmark) / firstPoint.benchmark) * 100;
  const alpha = returnPercent - benchmarkPercent;

  useEffect(() => {
    const canvas = canvasRef.current;
    const Chart = window.Chart;

    if (!canvas || !Chart) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    chartRef.current?.destroy();
    chartRef.current = new Chart(context, {
      type: "line",
      data: {
        labels: selectedFund.series.map((point) => point.month),
        datasets: [
          {
            label: selectedFund.name,
            data: selectedFund.series.map((point) => point.value),
            borderColor: "#009b62",
            backgroundColor: "rgba(0, 155, 98, 0.12)",
            fill: true,
            tension: 0.36,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: "Benchmark",
            data: selectedFund.series.map((point) => point.benchmark),
            borderColor: "#6d7684",
            borderDash: [6, 5],
            backgroundColor: "transparent",
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              color: "#3f4a5c",
              font: {
                weight: 650,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context: { dataset: { label?: string }; parsed: { y: number } }) =>
                `${context.dataset.label}: ${context.parsed.y.toFixed(1)}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#687385",
            },
          },
          y: {
            ticks: {
              color: "#687385",
              callback: (value: number) => value.toFixed(0),
            },
            grid: {
              color: "#edf1f4",
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [selectedFund]);

  function updateSelectedFund(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedFundId(event.target.value);
  }

  return (
    <section className="explore-page" aria-labelledby="explore-page-title">
      <div className="explore-page__header">
        <div className="explore-page__copy">
          <span>Interactive charts with Chart.js</span>
          <h1 id="explore-page-title">Explore fund performance</h1>
          <p>
            Pick a fund from the dropdown to compare its growth against the benchmark and review
            the key metrics before adding it to your portfolio.
          </p>
        </div>

        <div className="fund-picker">
          <label htmlFor="fund-select">Choose fund</label>
          <select id="fund-select" value={selectedFundId} onChange={updateSelectedFund}>
            {funds.map((fund) => (
              <option key={fund.id} value={fund.id}>
                {fund.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="explore-metrics" aria-label={`${selectedFund.name} metrics`}>
        <article className="explore-metric explore-metric--positive">
          <span>Fund return</span>
          <strong>{formatPercent(returnPercent)}</strong>
          <small>Since January</small>
        </article>
        <article className="explore-metric">
          <span>Benchmark</span>
          <strong>{formatPercent(benchmarkPercent)}</strong>
          <small>Same period</small>
        </article>
        <article className="explore-metric explore-metric--positive">
          <span>Alpha</span>
          <strong>{formatPercent(alpha)}</strong>
          <small>Fund minus benchmark</small>
        </article>
        <article className="explore-metric">
          <span>Monthly SIP</span>
          <strong>{selectedFund.sip}</strong>
          <small>{selectedFund.category}</small>
        </article>
      </div>

      <section className="explore-chart" aria-labelledby="explore-chart-title">
        <div className="explore-chart__heading">
          <div>
            <h2 id="explore-chart-title">{selectedFund.name}</h2>
            <p>{selectedFund.managerView}</p>
          </div>
          <span className="explore-chart__badge">Risk: {selectedFund.risk}</span>
        </div>

        <div className="explore-chart__canvas">
          <canvas ref={canvasRef} aria-label={`${selectedFund.name} performance chart`} />
        </div>

        <div className="explore-insights">
          <article className="explore-insight">
            <h3>Expense ratio</h3>
            <p>{selectedFund.expense} keeps the cost profile suitable for regular investing.</p>
          </article>
          <article className="explore-insight">
            <h3>Best use</h3>
            <p>Use this fund as part of a diversified SIP plan rather than a short-term trade.</p>
          </article>
          <article className="explore-insight">
            <h3>Action</h3>
            <p>Review the chart trend, then compare it with your existing fund allocation.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
