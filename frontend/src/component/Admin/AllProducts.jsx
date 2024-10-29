import React, { Fragment, useEffect } from "react";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/ProductActions";
import { Link } from "react-router-dom"; 
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from "../../constans/ProductConstans";

const AllProducts = ({ history }) => {
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );
  
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        toast.success("Xóa thành công!!!");
        history.push("/admin/products");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, history, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productGridContainer">
          <h1 id="productGridHeading">Quản lý sản phẩm</h1>

          {/* Bảng dạng lưới */}
          <div className="gridContainer">
            <div className="gridItem header">ID</div>
            <div className="gridItem header">Tên sản phẩm</div>
            <div className="gridItem header">Danh mục</div>
            <div className="gridItem header">Chức năng</div>

            {products &&
              products.map((product, index) => (
                <Fragment key={product._id}>
                  <div className="gridItem">{product._id}</div>
                  <div className="gridItem">{product.name}</div>
                  <div className="gridItem">{product.category}</div>
                  <div className="gridItem actions">
                    <Link to={`/product/${product._id}`}>
                      <VisibilityOutlinedIcon />
                    </Link>
                    <Link to={`/edit/product/${product._id}`}>
                      <EditIcon />
                    </Link>
                    <Button onClick={() => deleteProductHandler(product._id)}>
                      <DeleteIcon />
                    </Button>
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
}

export default AllProducts;
