import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import API_URL from "../constant";

function ProductDetails() {
  const { id } = useParams();              // product id from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL+`/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedIndex(0);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        alert("❌ Could not load product");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container mt-5">
          <p>Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container mt-5">
          <p>Product not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || [];
  const mainImgSrc =
    images.length > 0
      ? API_URL+`/${images[selectedIndex]}`
      : "https://via.placeholder.com/400x400?text=No+Image";

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("❌ Please login to add to cart");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        API_URL+"/add-to-cart",
        { userId, productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "✅ Added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("❌ Could not add to cart");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {/* breadcrumb / pagination */}
      <div className="container mt-3">
        <p style={{ fontSize: "0.9rem" }}>
          <span
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={() => navigate("/")}
          >
            Home
          </span>{" "}
          &gt;{" "}
          <span style={{ color: "#6c757d" }}>{product.category || "Product"}</span>{" "}
          &gt; <span>{product.name}</span>
        </p>
      </div>

      {/* product section */}
      <section className="container my-3">
        <div className="row">
          {/* Left: images */}
          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="border mb-3 p-3">
              <img
                src={mainImgSrc}
                alt={product.name}
                style={{
                  width: "350px",
                  height: "350px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* small thumbnails */}
            <div className="d-flex gap-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  style={{
                    border:
                      idx === selectedIndex
                        ? "2px solid #007bff"
                        : "1px solid #ddd",
                    padding: "4px",
                    marginRight: "6px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={API_URL+`/${img}`}
                    alt={`${product.name} ${idx + 1}`}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: info */}
          <div className="col-md-6">
            <h3>{product.name}</h3>
            <h5 className="mt-2">
              Price: ₹ {product.price}
            </h5>

            <p className="mt-3">
              {product.description || "No description provided by seller."}
            </p>

            {/* Size (static for now, like template) */}
            <div className="d-flex align-items-center mt-3">
              <p className="mb-0 mr-2">Size:</p>
              <select className="form-control w-auto">
                <option value="default">Select</option>
                <option value="xl">XL</option>
                <option value="l">L</option>
                <option value="m">M</option>
                <option value="s">S</option>
              </select>
            </div>

            {/* Quantity + Add to cart */}
            <div className="d-flex align-items-center mt-3">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="form-control w-auto mr-3"
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Simple delivery info */}
            <div className="mt-4">
              <p className="font-weight-bold mb-1">Delivery:</p>
              <p>Free standard shipping on eligible campus orders.</p>
              <div className="d-flex font-weight-bold">
                <p className="mr-3" style={{ width: "120px" }}>
                  TYPE
                </p>
                <p className="mr-3" style={{ width: "150px" }}>
                  HOW LONG
                </p>
                <p>HOW MUCH</p>
              </div>
              <hr />
              <div className="d-flex">
                <p className="mr-3" style={{ width: "120px" }}>
                  Standard
                </p>
                <p className="mr-3" style={{ width: "150px" }}>
                  1–4 business days
                </p>
                <p>₹ 0–50</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;
