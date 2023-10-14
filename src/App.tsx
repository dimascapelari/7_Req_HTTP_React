import "./App.css";
import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

interface Product {
  id: number;
  name: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  // 1- resgatando dados

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Lista de Produtos</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
