import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./Categories.js";
import Footer from "./Footer.jsx";
import API_URL from "../constant.js";

// ===============================
// ProductCard (dumb, no own liked state)
// ===============================

function ProductCard({ product, index, isLiked, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation(); // ⛔ don't open details when clicking heart

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("❌ Please login to like products");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        API_URL+"/like-product",
        {
          userId: userId,
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const backendLiked =
        res.data && typeof res.data.liked === "boolean"
          ? res.data.liked
          : !isLiked;

      onToggle(product._id, backendLiked);
    } catch (err) {
      console.error("Error toggling like:", err);
      alert("❌ Could not update like, please try again");
    }
  };

  const handleAddToCartClick = async (e) => {
    e.stopPropagation(); // ⛔ don't open details when clicking Add to Cart

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("❌ Please login to Add to Cart products");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        API_URL+"/add-to-cart",
        {
          userId: userId,
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "✅ Added to cart");
      console.log("Add to cart response:", res.data);
    } catch (err) {
      console.error("Error adding to cart:", err);
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("❌ Could not add to cart, please try again");
      }
    }
  };

  const handleBuyNowClick = (e) => {
    e.stopPropagation(); // ⛔ don't open details when clicking Buy Now
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Please login to Buy products");
      navigate("/login");
      return;
    }
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ borderRadius: "5px", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={openDetails} // ✅ whole card opens product page
    >
      {/* Heart */}
      <button
        className="btn btn-outline-danger"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          borderRadius: "50%",
        }}
        onClick={handleLikeClick}
      >
        <i className={isLiked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
      </button>

      {/* Images / carousel */}
      {product.images && product.images.length > 0 ? (
        <div
          id={`carouselProduct${index}`}
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {product.images.map((img, imgIndex) => (
              <div
                className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}
                key={imgIndex}
              >
                <div
                  style={{ height: "200px", overflow: "hidden" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img
                    src={API_URL+`/${img}`}
                    alt={`Product ${product.name} - ${imgIndex + 1}`}
                    style={{
                      height: "100%",
                      width: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carouselProduct${index}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carouselProduct${index}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <img
          src="https://via.placeholder.com/200x200?text=No+Image"
          className="card-img-top"
          alt="No Image"
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}

      <div className="card-body position-relative">
        <h5 className="card-title">{product.name}</h5>
        <p className="fw-bold">₹ {product.price}</p>
        {!hovered && (
          <div>
            <p className="text-muted">{product.category}</p>
          </div>
        )}
        {hovered && (
          <div className="d-flex mt-3 w-100 gap-2 px-2">
            <button
              className="btn btn-outline-success btn-sm"
              style={{
                flex: 1,
                borderTopRightRadius: 2,
                borderBottomRightRadius: 2,
              }}
              onClick={handleBuyNowClick}
            >
              Buy Now
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              style={{
                flex: 1,
                borderTopRightRadius: 2,
                borderBottomRightRadius: 2,
              }}
              onClick={handleAddToCartClick}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ===============================
// Home
// ===============================
function Home() {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  // All liked product IDs for this logged-in user (coming from DB)
  const [likedProductIds, setLikedProductIds] = useState([]);

  // Fetch all products once
  useEffect(() => {
    axios
      .get(API_URL+"/getproduct")
      .then((res) => {
        setAllProducts(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Fetch liked products for this user from DB
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    axios
      .get(API_URL+`/liked-products/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // res.data.likedProducts is array of product docs (because of populate)
        const ids = (res.data.likedProducts || []).map((p) => p._id);
        setLikedProductIds(ids);
      })
      .catch((err) => {
        console.error("Error fetching liked products:", err);
      });
  }, []);

  // When a product's like state changes (after successful POST), update state
  const handleProductToggle = (productId, liked) => {
    setLikedProductIds((prev) => {
      if (liked) {
        // ensure present
        return prev.includes(productId) ? prev : [...prev, productId];
      } else {
        // remove
        return prev.filter((id) => id !== productId);
      }
    });
  };

  // Filter logic (unchanged, uses allProducts as base)
  const applyFilters = (query, category) => {
    let filtered = allProducts;

    if (category) {
      filtered = filtered.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (query) {
      const lower = query.toLowerCase();
      filtered = filtered.filter((item) => {
        const name = (item.name || "").toLowerCase();
        const desc = (item.description || "").toLowerCase();
        const cat = (item.category || "").toLowerCase();
        return (
          name.includes(lower) || desc.includes(lower) || cat.includes(lower)
        );
      });
    }

    setProducts(filtered);
  };

  const handlesearch = (value) => {
    setSearch(value);
    applyFilters(value, selectedCategory);
  };

  const handleclick = (e) => {
    if (e) e.preventDefault();
    applyFilters(search, selectedCategory);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    applyFilters(search, category);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        search={search}
        handlesearch={handlesearch}
        handleclick={handleclick}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
      />

      <h2 className="mb-4">📦 Listed Products</h2>

      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div className="col" key={product._id}>
                <ProductCard
                  product={product}
                  index={index}
                  isLiked={likedProductIds.includes(product._id)} // intersection logic
                  onToggle={handleProductToggle}
                />
              </div>
            ))
          ) : (
            <p>No products listed yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
