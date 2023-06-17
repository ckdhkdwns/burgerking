import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TbPencilMinus } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { API_URL } from "../constant/url";

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 5px auto;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Button = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  margin: 5px;
  & svg {
    margin: auto auto;
    width: 70%;
    height: 70%;
    stroke: #61a075;
  }
  &:hover {
    background: #efefef;
  }
`;
const Back = styled(Button)`
  & svg {
    fill: #61a075;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.input`
  all: unset;
  padding: 5px 20px 0px 15px;
  font-size: 22px;
`;

const Content = styled.textarea`
  all: unset;
  padding: 15px;
  min-height: 200px;
`;

const Submit = styled(Button)``;

const Footer = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
const IPInfo = styled.div`
  font-size: 15px;
  color: #3f3f3f;
  line-height: 50px;
`;

const WritePost = (props) => {
  const [ip, setIp] = useState();

  const getIp = async () => {
    // Connect ipapi.co with fetch()
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    // Set the IP address to the constant `ip`
    setIp(data.ip);
  };
  useEffect(() => {
    getIp();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post(
      API_URL + "posts",
      {
        title: e.target.title.value,
        content: e.target.content.value,
      },
      { withCredentials: false }
    ).then((res) => {
      props.setPage('list');
    });
  };

  return (
    <Wrapper>
      <Back onClick={() => props.setPage('list')}>
        <IoIosArrowBack />
      </Back>

      <Form onSubmit={submitHandler}>
        <Title type="text" name="title" placeholder="제목" />
        <Content name="content" placeholder="내용"></Content>
        <Footer>
          <IPInfo>{ip}에서 작성 중...</IPInfo>
          <Submit>
            <TbPencilMinus />
          </Submit>
        </Footer>
      </Form>
    </Wrapper>
  );
};

export default WritePost;
