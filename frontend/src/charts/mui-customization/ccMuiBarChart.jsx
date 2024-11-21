import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';


const chartSetting = {
  yAxis: [
    {
      label: 'users',
    },
  ],
  // width: 500,
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

// const dataset = [
//   {
//     london: 59,
//     paris: 57,
//     newYork: 86,
//     seoul: 21,
//     month: 'Jan',
//   },
//   {
//     london: 50,
//     paris: 52,
//     newYork: 78,
//     seoul: 28,
//     month: 'Feb',
//   },
//   {
//     london: 47,
//     paris: 53,
//     newYork: 106,
//     seoul: 41,
//     month: 'Mar',
//   },
//   {
//     london: 54,
//     paris: 56,
//     newYork: 92,
//     seoul: 73,
//     month: 'Apr',
//   },
//   {
//     london: 57,
//     paris: 69,
//     newYork: 92,
//     seoul: 99,
//     month: 'May',
//   },
//   {
//     london: 60,
//     paris: 63,
//     newYork: 103,
//     seoul: 144,
//     month: 'June',
//   },
//   {
//     london: 59,
//     paris: 60,
//     newYork: 105,
//     seoul: 319,
//     month: 'July',
//   },
//   {
//     london: 65,
//     paris: 60,
//     newYork: 106,
//     seoul: 249,
//     month: 'Aug',
//   },
//   {
//     london: 51,
//     paris: 51,
//     newYork: 95,
//     seoul: 131,
//     month: 'Sept',
//   },
//   {
//     london: 60,
//     paris: 65,
//     newYork: 97,
//     seoul: 55,
//     month: 'Oct',
//   },
//   {
//     london: 67,
//     paris: 64,
//     newYork: 76,
//     seoul: 48,
//     month: 'Nov',
//   },
//   {
//     london: 61,
//     paris: 70,
//     newYork: 103,
//     seoul: 25,
//     month: 'Dec',
//   },
// ];

// export function valueFormatter(value: number | null) {
//   return `${value}mm`;
// }

const valueFormatter = (value = number || null) => {
  return `${value} user`;
}

const CCMuiBarChart = ({dataset}) => {
  const colorPalette = [
    '#d50000', '#006064', '#212121', '#6200ea', 
    '#c51162', '#004d40', '#263238', '#4a148c',
    '#aa00ff', '#00bfa5', '#455a64', '#880e4f',
    '#311b92', '#00b8d4', '#1b5e20', '#827717',
    '#0d47a1', '#00c853', '#0091ea', '#8d6e63',
    '#2962ff', '#3e2723', '#01579b', '#4dd0e1',
    // Add more colors if needed
  ];

  // // Get the keys from the first object in the array except 'month' or 'year'
  // const datasetFormatForSeries = Object.keys(dataset[0])
  //   .filter(key => !(key === ('month' || 'year')))
  //   .map(key => ({
  //     dataKey: key,
  //     label: key,
  //     valueFormatter
  //   }));

  // Get the keys from the first object in the array except 'month' or 'year'
  const datasetFormatForXAxisKey = Object.keys(dataset[0]).filter(key => key === 'month' || key === 'year')[0];
  const datasetFormatForSeries = Object.keys(dataset[0])
  .filter(key => key !== datasetFormatForXAxisKey)
  .map((key, index) => ({
    dataKey: key,
    label: key,
    valueFormatter,
    color: colorPalette[index % colorPalette.length] // Assign unique color
  }));

  return (
    <BarChart
      margin={{ top: 65}}
      dataset={dataset}
      xAxis={[{ 
        scaleType: 'band', 
        dataKey: datasetFormatForXAxisKey,
        valueFormatter: value => datasetFormatForXAxisKey === 'year' ? String(value) : value
      }]}
      // series={[
      //   { dataKey: 'london', label: 'London', valueFormatter },
      //   { dataKey: 'paris', label: 'Paris', valueFormatter },
      //   { dataKey: 'newYork', label: 'New York', valueFormatter },
      //   { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      // ]}
      series={datasetFormatForSeries}
      grid={{ horizontal: true }}
      {...chartSetting}
      slotProps={{
        legend: {
          position: { vertical: 'top', horizontal: 'middle' },
          padding: 0,
          itemGap: 5,
          markGap: 5,
          itemMarkWidth: 12,
          itemMarkHeight: 10,
          itemNumber: 10,
          labelStyle: {
            fontSize: 14,
          },
        },
      }}
    />
  );
}

export default CCMuiBarChart;
