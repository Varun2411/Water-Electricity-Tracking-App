// ------------------------------------------------------------------------------------------------------------------------------
// ******************************************************************************************************************************
// ------------------------------------------------------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { auth, db } from "../config/firebase";
import { collection, getDocs } from 'firebase/firestore';
import PredictedWaterGraph from './Login';
import { Chart } from "react-google-charts";
// import "./Dashboard.css"

const DashB = ({ monthlyData, setMonthlyData }) => {
  const electricityColor = '#0c8ec3';
  const waterColor = '#2ecc71';

  const [chartOptions, setChartOptions] = useState({
    data: [],
    series: [{ type: 'bar', xKey: 'month', yKey: 'value', fill: electricityColor }],
  });

  const [chartOptions1, setChartOptions1] = useState({
    data: [],
    series: [{ type: 'bar', xKey: 'month', yKey: 'value', fill: waterColor }],
  });

  const [predictedChartOptions, setPredictedChartOptions] = useState({
    data: [],
    series: [{ type: 'line', xKey: 'month', yKey: 'value', stroke: '#ff9900' }],
  });

  const [predictedWaterChartOptions, setPredictedWaterChartOptions] = useState({
    data: [],
    series: [{ type: 'line', xKey: 'month', yKey: 'value', stroke: '#ff9900' }],
  });

  const [totalSpent, setTotalSpent] = useState({
    total_electricity_cost: 0,
    total_water_cost: 0,
  });

  const total_money_spent = (electricityData, waterData) => {
    const total_electricity_cost = electricityData.reduce((acc, curr) => acc + curr.value, 0);
    const total_water_cost = waterData.reduce((acc, curr) => acc + curr.value, 0);
    return { total_electricity_cost, total_water_cost };
  };

  useEffect(() => {
    // Calculate total money spent when both electricity and water data are available
    if (chartOptions.data.length > 0 && chartOptions1.data.length > 0) {
      const totalSpentAmount = total_money_spent(chartOptions.data, chartOptions1.data);
      setTotalSpent(totalSpentAmount);
    }
  }, [chartOptions.data, chartOptions1.data]);

  useEffect(() => {
    if (monthlyData) {
      const formattedData = Object.keys(monthlyData)
        .map(month => ({
          month,
          value: parseFloat(monthlyData[month].value),
        }))
        .sort((a, b) => {
          const monthOrder = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
          ];
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });

      setChartOptions(prevOptions => ({
        ...prevOptions,
        data: formattedData,
      }));
    }
  }, [monthlyData]);
  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const user = auth.currentUser;
        const waterEntriesCollection = collection(db, 'entries', user.uid, 'waterData');
        const querySnapshot = await getDocs(waterEntriesCollection);
        const waterDataArray = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          month: doc.data().month,
        }));
        const sortedWaterData = waterDataArray.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
        const formattedData = sortedWaterData.map(entry => ({
          month: entry.month,
          value: parseFloat(entry.amount),
        }));
        setChartOptions1(prevOptions => ({
          ...prevOptions,
          data: formattedData,
        }));
  
        // Send water data for prediction
        sendWaterDataForPrediction(formattedData);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchWaterData();
  }, []);
  // useEffect(() => {
  //   const fetchWaterData = async () => {
  //     try {
  //       const user = auth.currentUser;
  //       const waterEntriesCollection = collection(db, 'entries', user.uid, 'waterData');
  //       const querySnapshot = await getDocs(waterEntriesCollection);
  //       const waterDataArray = querySnapshot.docs.map(doc => ({
  //         ...doc.data(),
  //         month: doc.data().month,
  //       }));
  //       const sortedWaterData = waterDataArray.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
  //       const formattedData = sortedWaterData.map(entry => ({
  //         month: entry.month,
  //         value: parseFloat(entry.amount),
  //       }));
  //       setChartOptions1(prevOptions => ({
  //         ...prevOptions,
  //         data: formattedData,
  //       }));
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  
  //   fetchWaterData();
  // }, []);

  const refreshGraph = async () => {
    try {
      const user = auth.currentUser;
      const userEntriesCollection = collection(db, 'entries', user.uid, 'monthlyData');
      const querySnapshot = await getDocs(userEntriesCollection);
      const data = querySnapshot.docs.map(doc => doc.data().data);
      setMonthlyData(data[0] || {});
    } catch (err) {
      console.error(err);
    }
  };

  const sendElectricityDataForPrediction = async (electricityData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ electricityData }),
      });
      let predictedData = await response.json();
      
      console.log('original data:', electricityData);
      console.log('Predicted data:', predictedData);
      if (!Array.isArray(predictedData)) {
        // Attempt to convert if it's an object (you might need to adjust this based on your actual data structure)
        predictedData = Object.values(predictedData);
      }
      // Check if predictedData is an array
      if (Array.isArray(predictedData)) {
        // Format the predicted data
        const formattedData = predictedData.map(item => ({
          month: item.month,
          value: parseFloat(item.value), // Convert value to number
        }));
  
        // Update the chart options state
        setPredictedChartOptions(prevOptions => ({
          ...prevOptions,
          data: formattedData,
        }));
      } else {
        console.error('Predicted data is not in the expected format:', predictedData);
      }
    } catch (err) {
      console.error('Error predicting data:', err);
    }
  };
  
useEffect(() => {
  const electricityData = Object.keys(monthlyData || {}).map(month => ({
    month,
    value: monthlyData[month].value,
  }));

  // Sort the electricityData array by month
  electricityData.sort((a, b) => {
    // Convert month strings to numbers for comparison
    const monthA = new Date(`${a.month}-01`).getMonth();
    const monthB = new Date(`${b.month}-01`).getMonth();

    return monthA - monthB;
  });

  sendElectricityDataForPrediction(electricityData);
}, [monthlyData]);

  

  useEffect(() => {
    const electricityData = Object.keys(monthlyData || {}).map(month => ({
      month,
      value: monthlyData[month].value,
    }));
    sendElectricityDataForPrediction(electricityData);
  }, [monthlyData]);


  const sendWaterDataForPrediction = async (waterData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict_wt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( waterData ),
      });
      const predictedData = await response.json();
      console.log('Original water data:', waterData);
      console.log('Predicted water data:', predictedData);
  
      // Check if predictedData is an array
      if (Array.isArray(predictedData)) {
        // Format the predicted data
        const formattedData = predictedData.map(item => ({
          month: item.month,
          value: parseFloat(item.value), // Convert value to number
        }));
  
        // Update the chart options state for predicted water data
        setPredictedWaterChartOptions(prevOptions => ({
          ...prevOptions,
          data: formattedData,
        }));
      } else {
        console.error('Predicted water data is not in the expected format:', predictedData);
      }
    } catch (err) {
      console.error('Error predicting water data:', err);
    }
  };

  const pieChartData = [
    { category: 'Electricity', value: totalSpent.total_electricity_cost, color: electricityColor },
    { category: 'Water', value: totalSpent.total_water_cost, color: waterColor }
  ];

  const pieChartOptions = {
    data: pieChartData,
    series: [
      {
        type: 'pie',
        angleKey: 'value',
        labelKey: 'category',
        label: {
          minAngle: 20,
          angle: 20,
          font: '14px Arial',
          color: '#333', // Label color
          offset: 10, // Offset from the pie slice
          formatter: params => {
            if (params.data.category === 'Electricity') {
              return `Electricity: ${params.data.value}`;
            } else if (params.data.category === 'Water') {
              return `Water: ${params.data.value}`;
            } else {
              return '';
            }
          },
        },
        fills: pieChartData.map(data => data.color)
      }
    ]
  };
  
  const originalData = [
    ["Category", "Amount"],
    ["Electricity", totalSpent.total_electricity_cost],
    ["Water", totalSpent.total_water_cost],
  ];
  
  const originalOptions = {
    title: "Total Spendings",
    pieHole: 0.4,
    is3D:false,
    colors: ['#0c8ec3', '#2ecc71', '#ff9900'], // Add custom colors here
    // sliceVisibilityThreshold: 0.3, // 20%
  };


  const findMinimum = (data) => {
    if (data.length === 0) {
      return null;
    }
  
    let minEntry = data[0];
  
    for (let i = 1; i < data.length; i++) {
      if (data[i].value < minEntry.value) {
        minEntry = data[i];
      }
    }
  
    return minEntry;
  };
  
  const findMaximum = (data) => {
    if (data.length === 0) {
      return null;
    }
  
    let maxEntry = data[0];
  
    for (let i = 1; i < data.length; i++) {
      if (data[i].value > maxEntry.value) {
        maxEntry = data[i];
      }
    }
  
    return maxEntry;
  };
  
  return (
    <div >
    <div className="container mt-5" style={{
      // backgroundImage: 'radial-gradient(circle, rgba(240,203,219,1) , rgba(148,187,233,1) 86%)',
      // backgroundColor: 'black',
      backgroundAttachment: 'fixed',
    }}>

    <h1 className="mb-4" style={{ marginTop: '240px' }}>Dashboard</h1>
    <button className="btn btn-primary mb-3" onClick={refreshGraph}>
      Refresh
    </button>
    <div className="row">
      <div className="col-md-6">
        <h2>Total Money Spent</h2>
        <div className="chart-container">
          <Chart
            chartType="PieChart"
            data={originalData}
            options={originalOptions}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>
      <div className="col-md-6">
        <h2>Highlights</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="chart-container">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">Most Spent!</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">ELECTRICITY</h6>
                  <p className="card-text">You spent the most in the month of <b>{findMaximum(chartOptions.data)?.month}</b></p>
                  <p className="card-text"><b>Amount: {findMaximum(chartOptions.data)?.value} ₹</b></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="chart-container">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">Most Saved</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">ELECTRICITY</h6>
                  <p className="card-text">You spent the least in the month of <b>{findMinimum(chartOptions.data)?.month}</b></p>
                  <p className="card-text"><b>Amount: {findMinimum(chartOptions.data)?.value} ₹</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-6">
            <div className="chart-container">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">Most Spent</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">WATER</h6>
                  <p className="card-text">You spent the most in the month of <b>{findMaximum(chartOptions1.data)?.month}</b></p>
                  <p className="card-text"><b>Amount: {findMaximum(chartOptions1.data)?.value} ₹</b></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="chart-container">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">Most Saved</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">WATER</h6>
                  <p className="card-text">You spent the least in the month of <b>{findMinimum(chartOptions1.data)?.month}</b></p>
                  <p className="card-text"><b>Amount: {findMinimum(chartOptions1.data)?.value} ₹</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h2>Electricity Usage</h2>
        <div className="chart-container">
          <AgChartsReact options={chartOptions} />
        </div>
      </div>
      <div className="col-md-6">
        <h2>Predicted Electricity Consumption</h2>
        <div className="chart-container">
          <AgChartsReact options={predictedChartOptions} />
        </div>
      </div>
      <div className="col-md-6">
        <h2>Water Usage</h2>
        <div className="chart-container">
          <AgChartsReact options={chartOptions1} />
        </div>
      </div>
      <div className="col-md-6">
        <h2>Predicted Water Consumption</h2>
        <div className="chart-container">
          <AgChartsReact options={predictedWaterChartOptions} />
        </div>
      </div>
    </div>
  </div>
  </div>

    // <div style={{backgroundAttachment: 'fixed' }}>
    //   <h1><b>Dashboard</b></h1>
    //   <div class="container">
    //     <div class="row">
    //       <div class="col">
    //         <AgChartsReact options={chartOptions} />
    //       </div>
    //       <div class="col">
    //         <AgChartsReact options={chartOptions} />
    //       </div>
    //       <div class="w-100"></div>
    //     </div>

    //     <div class='col'>
    //       <div class="col">
    //         <br />
    //         <AgChartsReact options={chartOptions} />
    //       </div>
    //       <br />
    //       <div class="col">
    //         <AgChartsReact options={chartOptions} />
    //       </div>
    //     </div>

    //     <div class="row">
    //       <div class="col">
    //         <AgChartsReact options={chartOptions} />
    //       </div>
    //       <div class="col">
    //         <AgChartsReact options={chartOptions} />
    //       </div>
    //       <div class="w-100"></div>
    //     </div>
        
        

    //   </div>
    // </div>
  
  );
};

export default DashB;