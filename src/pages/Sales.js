import React, { useState, useEffect, useContext, useRef } from "react";
import AddSale from "../components/AddSale";
import AuthContext from "../AuthContext";

function Sales() {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [sales, setAllSalesData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  const [selectedSales, setSelectedSales] = useState([]); // To store selected sales for printing
  const [personName, setPersonName] = useState(""); // Person receiving the order
  const [personMobile, setPersonMobile] = useState(""); // Person's mobile number
  const printRef = useRef(null); // Reference for the printable area

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSalesData();
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  // Fetching Data of All Sales
  const fetchSalesData = () => {
    fetch(
      `https://inventory-backend-1-g9xh.onrender.com/api/sales/get/${authContext.user}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAllSalesData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(
      `https://inventory-backend-1-g9xh.onrender.com/api/product/get/${authContext.user}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Stores
  const fetchStoresData = () => {
    fetch(
      `https://inventory-backend-1-g9xh.onrender.com/api/store/get/${authContext.user}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setShowSaleModal(!showSaleModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle selection of sales for printing
  const handleSaleSelection = (sale) => {
    if (selectedSales.includes(sale)) {
      setSelectedSales(selectedSales.filter((item) => item !== sale)); // Deselect if already selected
    } else {
      setSelectedSales([...selectedSales, sale]); // Add sale to selected items
    }
  };

  // Print Sales Report with selected items and person details
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showSaleModal && (
          <AddSale
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            stores={stores}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}

        {/* Form to add the person's name and mobile */}
        <div className="my-5">
          <label className="font-bold">Person Receiving:</label>
          <input
            type="text"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            placeholder="Enter person name"
            className="ml-3 p-2 border rounded"
          />
          <label className="ml-5 font-bold">Mobile Number:</label>
          <input
            type="text"
            value={personMobile}
            onChange={(e) => setPersonMobile(e.target.value)}
            placeholder="Enter mobile number"
            className="ml-3 p-2 border rounded"
          />
        </div>

        {/* Print and Add Sale Buttons */}
        <div className="flex justify-between pt-5 pb-3 px-3">
          <div className="flex gap-4 justify-center items-center ">
            <span className="font-bold">Sales</span>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 text-xs rounded"
              onClick={handlePrint}
              disabled={
                selectedSales.length === 0 ||
                personName === "" ||
                personMobile === ""
              }
            >
              Print Selected Sales
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
              onClick={addSaleModalSetting}
            >
              Add Sales
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          ref={printRef}
          className="overflow-x-auto rounded-lg border bg-white border-gray-200"
        >
          {/* Print Details for the Person */}
          {selectedSales.length > 0 && (
            <div className="p-5">
              <h3 className="font-bold text-lg mb-3">Sales Report</h3>
              <p>
                <strong>Person Receiving:</strong> {personName}
              </p>
              <p>
                <strong>Mobile Number:</strong> {personMobile}
              </p>
            </div>
          )}
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Select
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Department Name{" "}
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock Sold
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Sales Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Sale Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sales.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2">
                      <input
                        type="checkbox"
                        onChange={() => handleSaleSelection(element)}
                        checked={selectedSales.includes(element)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {element.ProductID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.StoreID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.StockSold}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.SaleDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      ₹{element.TotalSaleAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {selectedSales.length > 0 && 
           <div> Recipient signature:</div>}
        </div>
      </div>
    </div>
  );
}

export default Sales;
