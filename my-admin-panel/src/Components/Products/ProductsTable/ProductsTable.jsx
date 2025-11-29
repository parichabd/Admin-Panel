import trashs from "../../../assets/icons/trash.png";
import edit from "../../../assets/icons/edit.png";

import styles from "./ProductsTable.module.css";

function ProductsTable({ products }) {
  return (
    <div>
      <table className={styles.TableProducts}>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.id}</td>
              <td>
                <img src={edit} alt="ویرایش" />
                <img src={trashs} alt="سطل آشغال" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
