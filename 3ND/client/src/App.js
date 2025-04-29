import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Navbar, Nav, Card, Button, Form, Row, Col, Container, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [product, setProduct] = useState("");
  const [type, setType] = useState("");
  const [bestBefore, setBestBefore] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });

    Axios.get("http://localhost:3001/getProducts").then((response) => {
      setListOfProducts(response.data);
    });
  }, []);

  const validateName = (name) => {
    const regex = /^[A-Za-z ]+$/; // tik raidės ir tarpai
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateAge = (age) => {
    return !isNaN(age) && age > 0;
  };

  const validateDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // formatas YYYY-MM-DD
    return regex.test(date);
  };

  const validateProduct = (product) => {
    const regex = /^[A-Za-z ]+$/; // tik raidės ir tarpai
    return regex.test(product);
  };

  const validateProductType = (type) => {
    const regex = /^[A-Za-z ]+$/; // tik raidės ir tarpai
    return regex.test(type);
  };

  const validateBestBefore = (bestBefore) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // formatas YYYY-MM-DD
    return regex.test(bestBefore);
  };

  const createUser = () => {
    if (!name || !age || !username || !email || !birthday) {
      alert("Visi laukeliai turi būti užpildyti!");
      return;
    }
    if (!validateName(name)) {
      alert("Vardas turi būti tik raidės!");
      return;
    }
    if (!validateEmail(email)) {
      alert("El. paštas nėra teisingas!");
      return;
    }
    if (!validateAge(age)) {
      alert("Amžius turi būti teisingas skaičius!");
      return;
    }
    if (!validateDate(birthday)) {
      alert("Gimimo data turi būti teisinga!");
      return;
    }

    Axios.post("http://localhost:3001/createUser", {
      name,
      age,
      username,
      email,
      birthday,
    }).then(() => {
      alert("Vartotojas sukurtas");
      setName(""); 
      setAge("");       
      setUsername("");   
      setEmail("");      
      setBirthday("");   
      setListOfUsers([...listOfUsers, { name, age, username, email, birthday }]);
      window.location.reload();
    });
  };

  const createProduct = () => {
    if (!product || !type || !bestBefore) {
      alert("Visi laukeliai turi būti užpildyti!");
      return;
    }
    if (!validateProduct(product)) {
      alert("Produkto pavadinimas turi būti tik raidės!");
      return;
    }
    if (!validateProductType(type)) {
      alert("Produkto tipas turi būti tik raidės!");
      return;
    }
    if (!validateBestBefore(bestBefore)) {
      alert("Best Before data turi būti teisinga!");
      return;
    }

    Axios.post("http://localhost:3001/createProduct", {
      Product: product,
      Type: type,
      BestBefore: bestBefore,
    }).then(() => {
      alert("Produktas sukurtas");
      setProduct(""); 
      setType("");       
      setBestBefore("");
      setListOfProducts([...listOfProducts, { product, type, bestBefore }]);
      window.location.reload();
    });
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        setListOfUsers(listOfUsers.filter((user) => user._id !== id));
      })
      .catch((error) => console.error(error));
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/products/${id}`).then(() => {
      setListOfProducts(listOfProducts.filter((product) => product._id !== id));
    });
  };

  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setName(user.name);
    setAge(user.age);
    setUsername(user.username);
    setEmail(user.email);
    setBirthday(user.birthday);
    setCurrentProduct(null);
    setShowModal(true);
  };
  const openProductUpdateModal = (product) => {
    setCurrentProduct(product);
    setProduct(product.Product);
    setType(product.Type);
    setBestBefore(product.BestBefore);
    setCurrentUser(null);
    setShowModal(true);
  };

  const updateUser = () => {
    if (!name || !age || !username || !email || !birthday) {
      alert("Visi laukeliai turi būti užpildyti!");
      return;
    }
    if (!validateName(name)) {
      alert("Vardas turi būti tik raidės!");
      return;
    }
    if (!validateEmail(email)) {
      alert("El. paštas nėra teisingas!");
      return;
    }
    if (!validateAge(age)) {
      alert("Amžius turi būti teisingas skaičius!");
      return;
    }
    if (!validateDate(birthday)) {
      alert("Gimimo data turi būti teisinga!");
      return;
    }
    

    Axios.put(`http://localhost:3001/users/${currentUser._id}`, {
      name,
      age,
      username,
      email,
      birthday,
    }).then(() => {
      setListOfUsers(
        listOfUsers.map((user) =>
          user._id === currentUser._id ? { ...user, name, age, username, email, birthday } : user
        )
      );
      setShowModal(false);
    });
  };
  const updateProduct = () => {
    if (!product || !type || !bestBefore) {
      alert("Visi laukeliai turi būti užpildyti!");
      return;
    }
    if (!validateProduct(product)) {
      alert("Produkto pavadinimas turi būti tik raidės!");
      return;
    }
    if (!validateProductType(type)) {
      alert("Produkto tipas turi būti tik raidės!");
      return;
    }
    if (!validateBestBefore(bestBefore)) {
      alert("Best Before data turi būti teisinga!");
      return;
    }

    Axios.put(`http://localhost:3001/products/${currentProduct._id}`, {
      Product: product,
      Type: type,
      BestBefore: bestBefore,
    }).then(() => {
      setListOfProducts(
        listOfProducts.map((product) =>
          product._id === currentProduct._id ? { ...product, product, type, bestBefore } : product
        )
      );
      window.location.reload();
      setShowModal(false);
    });
  };

  return (
  <Router>
    <div className="App">
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
  <Container fluid>
    <Navbar.Brand href="#">User Management</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
        <Nav.Link as={Link} to="/products">Products</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Container>
    <Routes>
      <Route path="/users" element={
        <>
          <Row className="mt-5">
            {listOfUsers.map((user) => (
              <Col md={4} key={user._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>
                      <strong>Age:</strong> {user.age} <br />
                      <strong>Username:</strong> {user.username} <br />
                      <strong>Email:</strong> {user.email} <br />
                      <strong>Birthday:</strong> {user.birthday}
                    </Card.Text>
                    <Button variant="warning" className="me-2" onClick={() => deleteUser(user._id)} title="Ištrinti vartotoją">
                      Delete
                    </Button>
                    <Button variant="info" onClick={() => openUpdateModal(user)} title="Atnaujinti vartuotojo duomenys">
                      Update
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="form-container">
            <Form>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Name ..."
                title="Įrašykite savo vardą."
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                className="mb-3"
                type="number"
                placeholder="Age ..."
                title="Įrašykite savo amžių kaip skaičių, pvz., 25."
                onChange={(e) => setAge(e.target.value)}
              />
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Username ..."
                 title="Įrašykite unikalų naudotojo vardą."
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control
                className="mb-3"
                type="email"
                placeholder="Email ..."
                title="Įrašykite tinkamą el. pašto adresą, pvz., vardas@pavyzdys.lt."
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Birthday ..."
                title="Įveskite datą formatu YYYY-MM-DD, pvz., 1990-01-01."
                onChange={(e) => setBirthday(e.target.value)}
              />
              <Button variant="primary" onClick={createUser} title="Sukurti vartotoją">
                Create User
              </Button>
            </Form>
          </div>
        </>
      } />

      <Route path="/products" element={
        <>
          <Row className="mt-5">
            {listOfProducts.map((product) => (
              <Col md={4} key={product._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <strong>Product:</strong> {product.Product} <br />
                      <strong>Type:</strong> {product.Type} <br />
                      <strong>Best Before:</strong> {product.BestBefore}
                    </Card.Text>
                    <Button variant="warning" className="me-2" onClick={() => deleteProduct(product._id)} title="Ištrinti produktą">
                      Delete
                    </Button>
                    <Button variant="info" onClick={() => openProductUpdateModal(product)} title="Atnaujinti informacija apie produktą">
                      Update
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="form-container">
            <Form>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Product ..."
                title="Įveskite produkto pavadinimą"
                onChange={(e) => setProduct(e.target.value)}
              />
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Type ..."
                title="Įveskite produkto tipą pvz. Bakalėja, šaldytos prekės"
                onChange={(e) => setType(e.target.value)}
              />
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Best Before ..."
                title="Įveskite galiojimo laiką formatu YYYY-MM-DD, pvz., 1990-01-01."
                onChange={(e) => setBestBefore(e.target.value)}
              />
              <Button variant="primary" onClick={createProduct}title="Pridėti naują produktą">
                Create Product
              </Button>
            </Form>
          </div>
        </>
      } />
    </Routes>
  </Container>

  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Update Info</Modal.Title>
    </Modal.Header>
    <Modal.Body>
  {currentUser && (
    <Form>
      <Form.Control
        className="mb-3"
        type="text"
        value={name}
        title="Įrašykite vartotojo vardą."
        onChange={(e) => setName(e.target.value)}
      />
      <Form.Control
        className="mb-3"
        type="number"
        value={age}
         title="Įrašykite vartotojo amžių kaip skaičių, pvz., 25."
        onChange={(e) => setAge(e.target.value)}
      />
      <Form.Control
        className="mb-3"
        type="text"
        value={username}
        title="Įrašykite unikalų naudotojo vardą."
        onChange={(e) => setUsername(e.target.value)}
      />
      <Form.Control
        className="mb-3"
        type="email"
        value={email}
        title="Įrašykite tinkamą el. pašto adresą, pvz., vardas@pavyzdys.lt."
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Control
        className="mb-3"
        type="text"
        value={birthday}
        title="Įveskite datą formatu YYYY-MM-DD, pvz., 1990-01-01."
        onChange={(e) => setBirthday(e.target.value)}
      />
      <Button variant="primary" onClick={updateUser} title="Atnaujinti vartotojo informaciją">
        Update User
        
      </Button>
    </Form>
  )}
  {currentProduct && (
    <Form>
      <Form.Control
        className="mb-3"
        type="text"
        value={product}
        title="Įveskite produkto pavadinimą"
        onChange={(e) => setProduct(e.target.value)}
      />
      <Form.Control
        className="mb-3"
        type="text"
        value={type}
        title="Įveskite produkto tipą pvz. Bakalėja, šaldytos prekės"
        onChange={(e) => setType(e.target.value)}
      />
      <Form.Control
        className="mb-3"
        type="text"
        value={bestBefore}
        title="Įveskite galiojimo laiką formatu YYYY-MM-DD, pvz., 1990-01-01."
        onChange={(e) => setBestBefore(e.target.value)}
      />
      <Button variant="primary" onClick={updateProduct} title="Atnaujinti produkto informaciją">
        Update Product
      </Button>
    </Form>
  )}
</Modal.Body>
  </Modal>
</div>
</Router>
  );
}

export default App;

