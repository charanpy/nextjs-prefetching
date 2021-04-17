import React from 'react';
import path from 'path';
import fs from 'fs/promises';

const ProductDetail = ({ loadedProduct }) => {
  if (!loadedProduct) {
    return <p>Loading</p>;
  }
  return (
    <>
      <h1>{loadedProduct[0].title}</h1>
      <p>{loadedProduct[0].description}</p>
    </>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const prodId = params.pid;
  const data = await getData();
  const loadedProduct = data.products.filter((prod) => prod.id === prodId);
  if (!loadedProduct.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => ({
    params: {
      pid: id,
    },
  }));
  return {
    paths: params,
    fallback: true,
  };
}

export default ProductDetail;
