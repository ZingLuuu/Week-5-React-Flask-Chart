import React, { useState } from 'react';
import { Menu } from 'antd';
import ChartDisplay from './ChartDisplay';
import 'antd/dist/reset.css';

function App() {
  const [chartType, setChartType] = useState('pie');

  const handleMenuClick = (e) => {
    setChartType(e.key);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>第五周 React + Flask + ECharts 可视化展示</h2>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[chartType]}
        mode="horizontal"
        items={[
          { label: '饼图', key: 'pie' },
          { label: '柱状图', key: 'bar' },
          { label: '折线图', key: 'line' }
        ]}
        style={{ marginBottom: '20px' }}
      />
      <ChartDisplay chartType={chartType} />
    </div>
  );
}

export default App;
