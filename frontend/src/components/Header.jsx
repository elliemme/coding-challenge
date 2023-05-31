import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <Link style={{ textDecoration: "none" }} to="/">
          <span className="logo-name">🍿e-Movies</span>
        </Link>
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/register")}>
        {props.login ? "Login" : "Register"}
      </button>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 4rem;
  .logo {
    color: black;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    padding: 5px 20px 5px 5px;
    .logo-name {
      height: 5rem;
      margin-top: 35px;
      font-size: 1.5rem;
      color: whitesmoke;
      font-family: "Montserrat", sans-serif;
    }
  }
  .logo:hover {
    background-color: red;
  }
  .logo-name:hover {
    color: black;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
