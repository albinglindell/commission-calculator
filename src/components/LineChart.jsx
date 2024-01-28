import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Reference to store the chart instance

    useEffect(() => {
        // Example sales data
        const monthlySales = [650, 590, 800, 810, 560, 550];

        // Calculate 10% commission for each month
        const monthlyCommissions = monthlySales;

        // Destroy the previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart instance
        if (chartRef.current) {
            const chartContext = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(chartContext, {
                type: 'line', // Chart type
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
                    datasets: [{
                        label: 'Monthly Commissions', // Dataset label
                        data: monthlyCommissions, // Data points (commission values)
                        fill: true, // Don't fill area under the line
                        borderWidth: 1.5,
                        borderColor: 'rgb(68, 114, 195)', // Line color
                        backgroundColor:'rgb(68, 114, 195, 0.2)',
                        tension: 0.2 // Line smoothness
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Y-axis begins at zero
                        }
                    },
                    responsive: true, // Chart will resize in responsive layouts
                    maintainAspectRatio: false // Adjust aspect ratio
                }
            });
        }

        // Clean up function to destroy chart instance when component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []); // Dependencies array is empty, so this effect runs only once

    return <div className='chartContainer'>
        <div className="chart">
            <canvas ref={chartRef}></canvas>
        </div>
    </div>;
};

export default LineChart;
