import React from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Search =styled.input`
border: 1px solid ${({ theme }) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 86%;
color: ${({ theme }) => theme.text};
`

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;


const Gpt = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/gpt/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Search
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button  type="submit">Submit</Button>
      </form>
      <div>
        <p>Response: {response}</p>
      </div>
    </Container>
  );
};

export default Gpt;
