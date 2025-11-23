import { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./Categories.js";
import Footer from "./Footer.jsx";
import API_URL from "../constant.js";


function AddProduct() {
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);


    // const categories = [
    //     "Books & Study Materials",
    //     "Cycles & Bikes",
    //     "Electronics & Gadgets",
    //     "Lab & Project Equipment",
    //     "Sports & Fitness",
    //     "Clothes & Accessories",
    //     "Hostel & Daily Use Items",
    //     "Fest & Event Merchandise",
    //     "Miscellaneous / Gadgets",
    //     "Consumables"
    // ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !price || !category) {
            alert("❌ Please fill in all fields");
            return;
        }

        const token = localStorage.getItem("token");
        const url = API_URL+"/addproduct";

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            images.forEach((image) => {
                formData.append("images", image);
            });


            await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("✅ Product added successfully!");
            setName("");
            setDescription("");
            setPrice("");
            setCategory("");
            setImages([]);
            document.getElementById("imageInput").value = null;
            // if (!localStorage.getItem("token")) {
            navigate("/");
            // }
        } catch (err) {
            console.error(err);
            alert("❌ Something went wrong. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container mt-5" >
                <div className="card shadow-lg p-4">
                    <div className="row">

                        {/* Left half: image */}
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <img
                                src="images/AddProductImage.jpg"
                                alt="Product"
                                className="img-fluid rounded"
                                style={{ width: "400px", height: "400px", objectFit: "cover" }}
                            />


                        </div>

                        {/* Right half: form */}
                        <div className="col-md-6">
                            <h2 className="mb-3 text-center">Add Product</h2>
                            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">

                                <label>Product Name:</label>
                                <input
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            document.getElementById('descriptionInput').focus();
                                        }
                                    }}
                                    id="nameInput"
                                    style={{ width: '90%' }}
                                />

                                <label>Product Description:</label>
                                <input
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            document.getElementById('priceInput').focus();
                                        }
                                    }}
                                    id="descriptionInput"
                                    rows={3}
                                    style={{ width: '90%' }}
                                />

                                <label>Product Price:</label>
                                <input
                                    className="form-control mb-2"
                                    type="number"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            document.getElementById('categoryInput').focus();
                                        }
                                    }}
                                    id="priceInput"
                                    step="any"
                                    onWheel={(e) => e.preventDefault()}
                                    style={{ width: '90%' }}
                                />

                                <label>Product Category:</label>
                                <select
                                    className="form-control mb-2"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    id="categoryInput"
                                    style={{ width: '90%' }}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>

                                <label>Product Image:</label>
                                <input
                                    className="form-control mb-2"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        if (files.length > 8) {
                                            alert("❌ You can upload a maximum of 8 images");
                                            e.target.value = null; // reset input
                                            return;
                                        }
                                        setImages(files);
                                    }}
                                    id="imageInput"
                                    style={{ width: '90%' }}
                                />

                                {images.length > 0 && (
                                    <div className="mb-2 d-flex flex-wrap">
                                        {images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(img)}
                                                alt={`preview-${index}`}
                                                className="me-2 mb-2 rounded"
                                                width={80}
                                                height={80}
                                            />
                                        ))}
                                    </div>
                                )}

                                <button
                                    className="btn btn-primary w-50 mt-2"
                                    type="submit"
                                    id="submitBtn"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddProduct;
