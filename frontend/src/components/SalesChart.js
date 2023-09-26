import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';


const SalesChart = ({ orders, totalOrders, totalRevenue, totalProductsSold }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartCanvas = chartRef.current.getContext('2d');

    new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: ['Orders', 'Revenue', 'Products Sold'],
        datasets: [{
          label: 'This Week',
          data: [totalOrders, totalRevenue, totalProductsSold],
          backgroundColor: ['#36a2eb', '#ff6384', '#ffce56']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }, [totalOrders, totalRevenue, totalProductsSold]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SalesChart;