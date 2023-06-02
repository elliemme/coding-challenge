import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import swal from "sweetalert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      swal("Log in successful", "", "success");
    } catch (error) {
      console.log(error.code);
      swal("All fields are required", "Or sign up first", "error");
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogin}>Login to your account</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
      display: grid;
      width: 100%;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 30vw;
        height: 60vh;
        color: white;

        .container {
          gap: 2rem;

          input {
            padding: 0.5rem 1rem;
            height: 6vh;
            color: black;
            border: none;
            padding: 1.5rem;
            font-size: 1.2rem;
            border: 1px solid black;
            &:focus {
              outline: none;
            }
          }
        }
      }

      .title {
        padding: 15px;
        margin-bottom: 35px;
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
    }
  }
`;
