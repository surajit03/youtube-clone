import React from "react";
import styled from "styled-components";
import LamaTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BusinessIcon from "@mui/icons-material/Business";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CodeIcon from "@mui/icons-material/Code";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 6.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  // let navigate = useNavigate();

  // const handeleGpt = async (e) => {
  //   e.preventDefault();
  //   navigate("/gpt");
  // };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={LamaTube} />
            Backout arena
          </Logo>
        </Link>
        <Item>
          <HomeIcon />
          Home
        </Item>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <LocalLibraryIcon />
            community
          </Item>
        </Link>
          Ask me anything
        <Link to="Gpt" style={{ textDecoration: "none" }}>
          <Button >
            <ContentPasteSearchIcon />
            ASK ME
          </Button>
          </Link>
        <Hr />
        <Title>BEST OF BACKOUT ARENA</Title>
        <Item>
          <BusinessIcon />
          Business Analyst
        </Item>
        <Item>
          <CodeIcon />
          Coding
        </Item>
        <Item>
          <PrecisionManufacturingIcon />
          Technology
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
