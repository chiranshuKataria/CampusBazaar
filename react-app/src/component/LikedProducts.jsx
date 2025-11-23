// LikedProducts.jsx
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../constant";

function LikedProductCard({ product, index, onToggle }) {
  const [hovered, setHovered] = useState(false);

  const handleHeartClick = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("❌ Please login to manage liked products");
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

      const liked = res.data && typeof res.data.liked === "boolean"
        ? res.data.liked
        : false;

      // Inform parent about new state
      onToggle(product._id, liked);
    } catch (err) {
      console.error("Error toggling like on liked page:", err);
      alert("❌ Could not update like, please try again");
    }
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ borderRadius: "5px", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Heart – always filled on this page */}
      <button
        className="btn btn-outline-danger"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          borderRadius: "50%",
        }}
        onClick={handleHeartClick}
      >
        <i className="bi bi-heart-fill"></i>
      </button>

      {/* Images / carousel */}
      {product.images && product.images.length > 0 ? (
        <div
          id={`carouselLikedProduct${index}`}
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
            data-bs-target={`#carouselLikedProduct${index}`}
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
            data-bs-target={`#carouselLikedProduct${index}`}
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
      </div>
    </div>
  );
}

function LikedProducts() {
  const navigate = useNavigate();

  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch liked products for this user from DB
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("❌ Please login to view liked products");
      navigate("/login");
      return;
    }

    axios
      .get(API_URL+`/liked-products/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const products = res.data.likedProducts || [];
        setLikedProducts(products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching liked products:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleProductToggle = (productId, liked) => {
    // If unliked, remove from this page
    if (!liked) {
      setLikedProducts((prev) => prev.filter((p) => p._id !== productId));
    }
    // If liked again (edge case), you could refetch or ignore.
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="container mt-4">
        <h2 className="mb-4">❤️ Liked Products</h2>

        {loading ? (
          <p>Loading liked products...</p>
        ) : likedProducts.length === 0 ? (
          <p>You have not liked any products yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {likedProducts.map((product, index) => (
              <div className="col" key={product._id}>
                <LikedProductCard
                  product={product}
                  index={index}
                  onToggle={handleProductToggle}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default LikedProducts;
