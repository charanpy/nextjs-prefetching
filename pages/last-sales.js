import React, { useState, useEffect } from 'react';

const LastSales = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('https://nextjs-d5ab3-default-rtdb.firebaseio.com/sales.json')
      .then((res) => res.json())
      .then((data) => {
        const sales = [];

        for (const key in data) {
          sales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setData(sales);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p>Loading</p>;
  }
  if (!data) {
    <p>No data</p>;
  }
  return (
    <ul>
      {data.map((sale) => (
        <li key={sale.id}>{sale.username}</li>
      ))}
    </ul>
  );
};

export default LastSales;
