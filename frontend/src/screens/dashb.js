import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Table, Image } from "react-bootstrap";
import Chart from "react-apexcharts";
import axios from "axios";
import { Link } from "react-router-dom";

const Dash = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);

  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState({ totalOrders: 0 });

  useEffect(() => {
    async function fetchSalesData() {
      const response = await axios.get("/api/orders/weekly");
      setSalesData(response.data);
    }
    async function fetchProducts() {
      const response = await axios.get("/api/products/top/rated");
      setProducts(response.data);
    }
    async function fetchOrders() {
      const response = await axios.get("/api/orders/lastest");
      console.log("hahah");
      console.log(response.data);
      setOrders(response.data);
    }
    const fetchData = async () => {
      const result = await axios.get("/api/orders/monthely");
      console.log(result);

      setData(result.data);
    };
    fetchData();
    fetchProducts();
    fetchOrders();
    fetchSalesData();
  }, []);
  const options = {
    chart: {
      id: "revenue-chart",
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: data.map((d) => d.month),
    },
  };

  const series = [
    {
      name: "Revenue",
      data: data.map((d) => d.revenue),
    },
  ];
  return (
    <Container>
      <Row className="mt-5">
        <Col md={12}>
          {" "}
          <h1 className="text-cart">Weekly Stats </h1>
        </Col>
        <Col md={3}>
          <div class="stati bg-sun_flower  ">
            <i class="fas  fa-dollar"></i>{" "}
            <div>
              <b>{salesData.totalRevenue}</b>
              <span>Total Revenu</span>
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div class="stati bg-peter_river  ">
            <i class="fas fa-box"></i>
            <div>
              <b>{salesData.totalProductsSold}</b>
              <span>Total Product </span>
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div class="stati bg-emerald  ">
            <i class="fas fa-shopping-bag"></i>
            <div>
              <b>{salesData.totalOrders}</b>
              <span>Total orders </span>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12}>
          {" "}
          <h1 className="text-cart">Annuel Revenu chart </h1>
        </Col>
        <Col md={12}>
          <Chart options={options} series={series} type="line" height={350} />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12}>
          <h1 className="text-cart">Top Rated Products </h1>
        </Col>
        <Col md={12}>
          <div class="table-wrap">
            <table class="table table-responsive-xl">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td class="d-flex align-items-center">
                      <Image
                        src={product.image}
                        rounded
                        width={50}
                        height={50}
                      />
                      <div class="pl-3 text-cart">
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{product.brand}</td>
                    <td>${product.price}</td>
                    <td class="status">
                      {console.log(product)}
                      {product.countInStock > 0 ? (
                        <span class="active">In Stock</span>
                      ) : (
                        <span class="waiting">Out Of Stock</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-dark"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12}>
          <h1 className="text-cart">Lastest Orders </h1>
        </Col>
        <Col md={12}>
          <div class="table-wrap">
            <table class="table table-responsive-xl">
              <thead>
                <tr>
                  <th>Created at </th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>

                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.user ? order.user.name : " "}</td>
                    <td>${order.totalPrice}</td>
                    <td class="status">
                      {order.isPaid === true ? (
                        <span class="active">Paid</span>
                      ) : (
                        <span class="waiting">Not Paid</span>
                      )}
                    </td>
                    <td class="status">
                      {order.isDelivred === true ? (
                        <span class="active">DELIVERED</span>
                      ) : (
                        <span class="waiting">Not DELIVERED</span>
                      )}
                    </td>

                    <td>
                      <Link to={`/order/${order._id}`} className="btn btn-dark">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dash;
