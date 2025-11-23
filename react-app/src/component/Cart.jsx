// Cart.jsx
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../constant";

function Cart() {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("❌ Please login to view cart");
      navigate("/login");
      return;
    }

    axios
      .get(API_URL+`/cart-products/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartProducts(res.data.cartProducts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart products:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleRemove = async (productId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        API_URL+"/remove-from-cart",
        { userId, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("❌ Could not remove item");
    }
  };

  const total = cartProducts.reduce(
    (sum, p) => sum + (Number(p.price) || 0),
    0
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="container pb-5 mt-3">
        <div className="row">
          <div className="col-xl-9 col-md-8">
            <h2 className="h6 d-flex flex-wrap justify-content-between align-items-center px-4 py-3 bg-warning">
              <span>Cart Products</span>
              <a
                className="font-size-sm"
                href="/"
                style={{ textDecoration: "none" }}
              >
                ← Continue shopping
              </a>
            </h2>

            {loading ? (
              <p className="mt-4">Loading cart...</p>
            ) : cartProducts.length === 0 ? (
              <p className="mt-4">Your cart is empty.</p>
            ) : (
              cartProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="d-sm-flex justify-content-between my-4 pb-4 border-bottom"
                >
                  <div className="media d-block d-sm-flex text-center text-sm-left">
                    <a className="cart-item-thumb mx-auto mr-sm-4" href="#">
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? API_URL+`/${product.images[0]}`
                            : "https://via.placeholder.com/240x240?text=No+Image"
                        }
                        alt={product.name}
                        style={{
                          width: "180px", // fixed width
                          height: "120px", // fixed height
                          objectFit: "contain", // show full image without distortion
                        }}
                      />
                    </a>
                    <div className="media-body pt-3">
                      <h3 className="product-card-title font-weight-semibold border-0 pb-0">
                        <a href="#">{product.name}</a>
                      </h3>
                      <div className="font-size-sm text-muted">
                        Category: {product.category || "—"}
                      </div>
                      <div className="font-size-lg text-primary pt-2">
                        ₹ {product.price}
                      </div>
                    </div>
                  </div>
                  <div
                    className="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left"
                    style={{ maxWidth: "10rem" }}
                  >
                    {/* Quantity UI only, no logic yet */}
                    <div className="form-group mb-2">
                      <label htmlFor={`quantity${index}`}>Quantity</label>
                      <input
                        className="form-control form-control-sm"
                        type="number"
                        id={`quantity${index}`}
                        defaultValue={1}
                        min={1}
                      />
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm btn-block mb-2"
                      type="button"
                      onClick={() => handleRemove(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="col-xl-3 col-md-4 pt-3 pt-md-0">
            <h2 className="h6 px-4 py-3 bg-warning text-dark text-center">
              Subtotal
            </h2>
            <div className="h3 font-weight-semibold text-center py-3">
              ₹ {total.toFixed(2)}
            </div>
            <hr />
            <button
              className="btn btn-primary btn-block"
              disabled={cartProducts.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
