import path from 'path';
import fs from 'fs/promises';

function Home({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }
  if (!data.products.length) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    // revalidate: 10,
  };
}

export default Home;
