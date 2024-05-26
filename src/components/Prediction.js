import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import * as ml5 from 'ml5';

const PredictiveGraph = ({ actualData }) => {
  const [predictedData, setPredictedData] = useState([]);

  useEffect(() => {
    if (actualData.length === 0) return;

    // Prepare the data in the format expected by ml5.js
    const trainingData = actualData.map((data, index) => ({ x: index, y: data }));

    // Create a linear regression model
    const linearRegression = ml5.linearRegression(trainingData, () => {
      // Predict values for future points
      const futureData = Array.from({ length: 12 }, (_, index) => ({ x: actualData.length + index, y: null }));
      linearRegression.predict(futureData, (err, results) => {
        if (err) {
          console.error(err);
          return;
        }

        // Update the state with predicted data
        setPredictedData(results.map(result => result.value));
      });
    });
  }, [actualData]);

  const chartData = {
    labels: [...Array(actualData.length).keys(), ...Array(12).fill(null)],
    datasets: [
      {
        label: 'Actual Data',
        data: actualData,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Predicted Data',
        data: [...Array(actualData.length).fill(null), ...predictedData],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
  };

  return (
    <div>
      <h2>Actual vs Predicted Data</h2>
      {actualData.length > 0 && predictedData.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PredictiveGraph;
