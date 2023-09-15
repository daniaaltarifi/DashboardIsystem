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

function Blog() {
  const [title	, setTitle	] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");

  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateBlogId, setUpdateBlogId] = useState("");
  const [del, setDel] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1010/productdetails/getproductdetails");
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  const handlePost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1010/productdetails/add",
        {
            
            title,
            date,
            image,
            details,
        
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
    setUpdateBlogId(p_id);
  };
  const handleUpdate = async (
    blog_id,
    title,
    date,
    image,
    details,

  ) => {
    setUpdateBlogId(blog_id);

    try {
      const response = await axios.patch(
        `http://localhost:1010/productdetails/edit/${blog_id}`,
        {
            
            title: title, // Use the provided title
            date: date, // Use the provided summary
            image: image, // Use the provided description
          details: details,
        
        }
      );
      console.log("hello");
      console.log(response.data);
      setAdd(response.data);
      setIsUpdateFormVisible(false);

    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (blog_id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:1010/productdetails/delete/${blog_id}`
      );
      console.log(blog_id);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.blog_id !== blog_id)
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
                <CardTitle tag="h5">Add Blog</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          type="text"
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Image </label>
                        <Input
                          type="file"
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Details</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setDetails(e.target.value)}

                        />
                      </FormGroup>
                    </Col>
                  </Row> 
         
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={handlePost}
                      >
                        Add Blog
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
                        <th>Title</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Details</th>
                     
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((blog,index) => (
                        <tbody key={blog.blog_id}>
                          <tr key={blog.blog_id}>
                            <td>{blog.title}</td>
                            <td>{blog.date}</td>
                            <td>
                              <img src={blog.image} alt="" />
                            </td>
                            <td>{blog.details}</td>
                          
                            
                            <td>
                              <button
                                 onClick={() =>
                                    handleDelete(blog.blog_id,index) // Calling handleDelete with the product's _id and index
                                  }
                              >
                                delete
                              </button>
                              <button onClick={() => openUpdateForm(blog.blog_id)}>update</button>

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
                <CardTitle tag="h5">Update Blog</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          type="text"
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Image </label>
                        <Input
                          type="file"
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col md="12">
                      <FormGroup>
                        <label>Details</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setDetails(e.target.value)}

                        />
                      </FormGroup>
                    </Col>
                  </Row>
                 
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={()=>handleUpdate(
                            updateBlogId,
                            title,
                            date,
                            image,
                            details,
                        )}
                      >
                        Update Blog
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

export default Blog;
