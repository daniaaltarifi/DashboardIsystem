/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import axios from "axios";
import React, { useState,useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import Tables from "./Tables";

function AddProduct() {
  const [product_name, setProduct_name] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [old_price, setOld_price] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color_id, setColorId] = useState("");
  const [img_main, setImgMain] = useState("");
  const [image_slider, setImgSlider] = useState("");
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateProductId, setUpdateProductId] = useState("");
  const [del, setDel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1010/product/get");
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting news from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  const handlePost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1010/product/add",
        {
          product_name,
          price,
          stock,
          old_price,
          category_id,
          color_id,
          img_main,
          image_slider,
        }
      );
      console.log(response.data);
      // Call the onSave callback with the data
      setAdd(response.data);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  const openUpdateForm = (p_id) => {
    setIsUpdateFormVisible(true);
    setUpdateProductId(p_id);
  };
  const handleUpdate = async (
    p_id,
    product_name,
    price,
    stock,
    old_price,
    category_id,
    color_id,
    img_main,
    image_slider
  ) => {
    try {
        setUpdateProductId(p_id);

      const response = await axios.patch(
        `http://localhost:1010/product/edit/${p_id}`,
        {
          product_name: product_name, // Use the provided title
          price: price, // Use the provided summary
          stock: stock, // Use the provided description
          old_price: old_price,
          category_id: category_id,
          color_id: color_id,
          img_main: img_main,
          image_slider: image_slider,
        }
      );
      console.log("hello");
      console.log(response.data);
      setAdd(response.data);
      // setNews(response.data);
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (p_id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/product/delete/${p_id}`
      );
      console.log(p_id);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.p_id !== p_id)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Product</CardTitle>
              </CardHeader>
              <CardBody>
                <Form >
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Product Name</label>
                        <Input
                          type="text"
                          onChange={(e) => setProduct_name(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Price</label>
                        <Input
                          type="text"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Stock </label>
                        <Input
                          type="text"
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Old Price</label>
                        <Input
                          type="text"
                          onChange={(e) => setOld_price(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Category Id</label>
                        <Input
                          type="text"
                          onChange={(e) => setCategoryId(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>colorId</label>
                        <Input
                          type="text"
                          onChange={(e) => setColorId(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>img_main</label>
                        <Input
                          type="file"
                          onChange={(e) => setImgMain(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>image slider</label>
                        <Input
                          type="file"
                          onChange={(e) => setImgSlider(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Australia"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          type="textarea"
                          defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handlePost}
                      >
                        Add Product
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Simple Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>product_name</th>
                        <th>price</th>
                        <th>stock</th>
                        <th>old_price</th>
                        <th>category_id</th>
                        <th>color_id</th>
                        <th>img_main</th>
                        <th>image_slider</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((product,index) => (
                        <tbody key={product.p_id}>
                          <tr >
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.old_price}</td>
                            <td>{product.category_id}</td>
                            <td>{product.color_id}</td>
                            <td>
                              <img src={product.img_main} alt="" />
                            </td>
                            <td>
                              <img src={product.image_slider} alt="" />
                            </td>
                            <td>
                              <button
                                 onClick={() =>
                                    handleDelete(product.p_id,index) // Calling handleDelete with the product's _id and index
                                  }
                              >
                                delete
                              </button>
                              <button onClick={() => openUpdateForm(product.p_id)}>update</button>

                            </td>
                          </tr>
                        </tbody>
                      ))}
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Row>
          <Col md="12">
            <Card className="card-user">
            {isUpdateFormVisible && (
                <div>
              <CardHeader>
                <CardTitle tag="h5">Update Product</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Product Name</label>
                        <Input
                          type="text"
                          onChange={(e) => setProduct_name(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Price</label>
                        <Input
                          type="text"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Stock </label>
                        <Input
                          type="text"
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Old Price</label>
                        <Input
                          type="text"
                          onChange={(e) => setOld_price(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Category Id</label>
                        <Input
                          type="text"
                          onChange={(e) => setCategoryId(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>colorId</label>
                        <Input
                          type="text"
                          onChange={(e) => setColorId(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>img_main</label>
                        <Input
                          type="file"
                          onChange={(e) => setImgMain(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>image slider</label>
                        <Input
                          type="file"
                          onChange={(e) => setImgSlider(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                 <Col md="12">
                   <FormGroup>
                     <label>Address</label>
                     <Input
                       defaultValue="Melbourne, Australia"
                       placeholder="Home Address"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col className="pr-1" md="4">
                   <FormGroup>
                     <label>City</label>
                     <Input
                       defaultValue="Melbourne"
                       placeholder="City"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
                 <Col className="px-1" md="4">
                   <FormGroup>
                     <label>Country</label>
                     <Input
                       defaultValue="Australia"
                       placeholder="Country"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
                 <Col className="pl-1" md="4">
                   <FormGroup>
                     <label>Postal Code</label>
                     <Input placeholder="ZIP Code" type="number" />
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col md="12">
                   <FormGroup>
                     <label>About Me</label>
                     <Input
                       type="textarea"
                       defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                     />
                   </FormGroup>
                 </Col>
               </Row> */}
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={()=>handleUpdate(    updateProductId,
                            product_name,
                            price,
                            stock,
                            old_price,
                            category_id,
                            color_id,
                            img_main,
                            image_slider)}
                      >
                        Update Product
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
              </div>
                    )}

            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddProduct;
