import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ManagmentProducts from "./ManagmentProducts/ManagmentProducts";
import ProductsTable from "./ProductsTable/ProductsTable";
import ConfirmDialog from "./ManagmentProducts/ConfirmDialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // محصولات فیلتر شده
  const [searchTerm, setSearchTerm] = useState(""); // متن جستجو

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!res.ok) {
          console.error("خطای سرور:", res.status);
          setProducts([]);
          toast.error("خطا در دریافت محصولات");
          return;
        }

        const data = await res.json();
        const productList = Array.isArray(data) ? data : data.data || [];

        if (!Array.isArray(productList)) {
          console.warn("داده دریافتی آرایه نیست:", data);
          setProducts([]);
          return;
        }

        setProducts(productList);
        setFilteredProducts(productList); // مقدار اولیه برابر همه محصولات
      } catch (err) {
        console.error("خطا در fetch:", err);
        setProducts([]);
        toast.error("خطا در بارگذاری محصولات");
      }
    };

    loadProducts();
  }, []);

  // فیلتر کردن محصولات بر اساس جستجو
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const lowerSearch = searchTerm.trim().toLowerCase();
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [searchTerm, products]);

  // هندلر تغییر مقدار جستجو از SearchBar
  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  // سایر توابع اضافه کردن، ویرایش، حذف و ... بدون تغییر

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("ثبت محصول موفق نبود");
      const added = await res.json();
      setProducts((prev) => [...prev, added]);
      toast.success("محصول با موفقیت اضافه شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در ثبت محصول");
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const res = await fetch(
        `http://localhost:3000/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      if (!res.ok) throw new Error("ویرایش موفق نبود");
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      toast.success("ویرایش محصول با موفقیت انجام شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در ویرایش محصول");
    }
  };

  const openConfirmDialog = (id) => {
    setProductToDelete(id);
    setConfirmOpen(true);
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/products/${productToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status !== 204 && !res.ok) throw new Error("حذف موفق نبود");
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
      toast.success("محصول حذف شد");
    } catch (err) {
      console.error(err);
      toast.error("خطا در حذف محصول");
    }
    setConfirmOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className={styles.products}>
      {/* حالا به SearchBar مقدار هندلر را می‌دهیم */}
      <SearchBar onSearch={handleSearch} />
      <ManagmentProducts onAdd={handleAddProduct} />

      {/* بجای products از filteredProducts استفاده می‌کنیم */}
      <ProductsTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={openConfirmDialog}
      />

      <ConfirmDialog
        open={confirmOpen}
        message="آیا از حذف این محصول مطمئن هستید؟"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Products;
