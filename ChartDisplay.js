import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function ChartDisplay({ chartType }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    fetch('http://127.0.0.1:5000/get-chart-data')
      .then(response => response.json())
      .then(data => {
        const option = {
          title: { text: '销售数据可视化', left: 'center' },
          tooltip: {},
          legend: { orient: 'vertical', left: 'left' },
          series: []
        };

        if (chartType === 'pie') {
          option.series = [
            {
              name: '销量',
              type: 'pie',
              radius: '50%',
              data: data,
              emphasis: {
                itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
              }
            }
          ];
        } else if (chartType === 'bar') {
          option.xAxis = { type: 'category', data: data.map(item => item.name) };
          option.yAxis = { type: 'value' };
          option.series = [
            {
              data: data.map(item => item.value),
              type: 'bar'
            }
          ];
        } else if (chartType === 'line') {
          option.xAxis = { type: 'category', data: data.map(item => item.name) };
          option.yAxis = { type: 'value' };
          option.series = [
            {
              data: data.map(item => item.value),
              type: 'line'
            }
          ];
        }

        myChart.setOption(option);
      });

    return () => {
      myChart.dispose();
    };
  }, [chartType]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
}

export default ChartDisplay;
