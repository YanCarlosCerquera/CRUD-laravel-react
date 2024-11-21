import React, { useEffect, useState, useCallback } from "react";

import { chart1, chart2 } from "charts/chart";
import BarChart from "src/charts/barChart";




const Dashboard = () => {
  // const [chart, setChart] = useState([]);

  // const fetchChart = useCallback(async (data) => {
  //   setChart([...chart, await chart1(data), await chart2()]);
  // }, []);

  // useEffect(() => {
  //   const sendChartData = { id: 1, item: "chart1" };
  //   fetchChart(sendChartData);
  // }, [fetchChart]);

  // const getChart = chart.map((item, index) => {
  //   return <li key={index}>{item.item}</li>;
  // });

  return (
    <>
      <BarChart />
      {/* <ul>{getChart}</ul> */}
    </>
  );
};

export default Dashboard;
