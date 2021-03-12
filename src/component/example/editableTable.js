import React, { useEffect, useState } from "react";

const API_HOST = "http://localhost:3000";
const INVENTORY_API_URL = `${API_HOST}/inventory`;

function Table() {
  const [data, setData] = useState([]);

  const fetchInventory = () => {
    fetch(`${INVENTORY_API_URL}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [unitPrice, setUnitPrice] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productCategory, setProductCategory] = useState(null);

  /**
   *
   * @param id - The id of the product
   * @param currentUnitPrice 
   * @param currentProductName 
   * @param currentProductCategory - The current unit price of the product
   */
  const onEdit = ({ id, currentUnitPrice,currentProductName,currentProductCategory }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setUnitPrice(currentUnitPrice);
    setProductName(currentProductName);
    setProductCategory(currentProductCategory);
  };

  /**
   *
   * @param id
   * @param newUnitPrice
   * @param newProductName
   * @param newProductCategory
   */
  const updateInventory = ({ id, newUnitPrice,newProductName,newProductCategory }) => {
    fetch(`${INVENTORY_API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        unit_price: newUnitPrice,
        product_name: newProductName,
        product_category:newProductCategory,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // reset inEditMode and unit price state values
        onCancel();

        // fetch the updated data
        fetchInventory();
      });
  };

  /**
   *
   * @param id -The id of the product
   * @param newUnitPrice
   * @param newProductName 
   * @param newProductCategory  - The new unit price of the product
   */
  const onSave = ({ id, newUnitPrice,newProductName,newProductCategory }) => {
    updateInventory({ id, newUnitPrice,newProductName,newProductCategory });
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
    // reset the unit price state value
    setUnitPrice(null);
    setProductName(null);
    setProductCategory(null);
  };

  return (
    <div className="container">
      <h1>Simple Inventory Table</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Unit Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td> {inEditMode.status && inEditMode.rowKey === item.id ? (
                  // <input value={product_name} onChange={(event) => setProductName(event.target.value)} />
                  <input
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                  />
                ) : (
                  item.product_name
                )}
                </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  // <input value={product_category} onChange={(event) => setProductCategory(event.target.value)}/>
                  <input
                    value={productCategory}
                    onChange={(event) => setProductCategory(event.target.value)}
                  />
                ) : (
                  item.product_category
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <input
                    value={unitPrice}
                    onChange={(event) => setUnitPrice(event.target.value)}
                  />
                ) : (item.unit_price)}
              </td>
              
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <React.Fragment>
                    <button
                      className={"btn-success"}
                      onClick={() =>
                        onSave({ id: item.id, newUnitPrice: unitPrice, newProductName:productName ,newProductCategory:productCategory })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={"btn-secondary"}
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className={"btn-primary"}
                    onClick={() =>
                      onEdit({ id: item.id, currentUnitPrice: item.unit_price,currentProductName: item.product_name,currentProductCategory:item.product_category })
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
