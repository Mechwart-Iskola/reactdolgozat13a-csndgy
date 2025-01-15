import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [kereses, setkereses] = useState("");
  const [kivalasztottProductok, setKivalasztottProductok] = useState<Product[]>([]);
  const [hibaUzenet, setHibaUzenet] = useState<string>("");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(kereses.toLowerCase())
    );
    setKivalasztottProductok(filtered);
    setHibaUzenet("");
  };

  return (
    <div className="product-card">
      <div className="search-section">
        <label htmlFor="search">Search for a product:</label>
        <input
          id="search"
          type="text"
          value={kereses}
          onChange={(e) => setkereses(e.target.value)}
          placeholder="Enter product name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results-section">
        {hibaUzenet && <p className="error">{hibaUzenet}</p>}
        {kivalasztottProductok.length > 0 ? (
          kivalasztottProductok.map((product) => (
            <div key={product.id} className="product-info">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="error">{hibaUzenet}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
