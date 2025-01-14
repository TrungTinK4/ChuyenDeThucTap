import React, { Fragment, useEffect } from "react"; 
import { DataGrid } from "@material-ui/data-grid";
import "./AllOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../actions/OrderAction";
import { DELETE_ORDER_RESET } from "../../constans/OrderConstans";
import { ToastContainer, toast } from 'react-toastify';

const AllOrder = ({ history }) => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.AllOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteOrder);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID Đơn Hàng", minWidth: 300, flex: 0.5 },

    {
      field: "status",
      headerName: "Trạng Thái",
      minWidth: 150, 
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "createAt", headerName: "Ngày Tạo", minWidth: 100, flex:0.3 },
    {
      field: "itemsQty",
      headerName: "Số Lượng",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Số Tiền",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Tùy Chọn",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        createAt: formatDistanceToNow(new Date(item.createdAt), {
          addSuffix: true,
        })
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">TẤT CẢ ĐƠN HÀNG</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
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
};

export default AllOrder;
