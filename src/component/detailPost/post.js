import React from "react";
import styled from "styled-components";
import { FiTrash2 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import Moment from "moment";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 5px auto;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  position: relative;
  padding-bottom: 50px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px 15px 80px;
  position: relative;
`;

const Writer = styled.div`
  display: flex;
  gap: 10px;
`;
const Time = styled.div`
  display: flex;
  gap: 10px;
`;
const Description = styled.div`
  color: #6f6f6f;
`;
const Title = styled.div`
  font-size: 24px;
  padding: 5px 0px 5px 15px;
`;

const Content = styled.div`
  padding: 5px 15px;
`;

const Delete = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  margin: 5px;
  transition: 0.1s all;
  & svg {
    margin: auto auto;
    width: 70%;
    height: 70%;
    stroke: #d76565;
  }
  &:hover {
    background: #d76565;
    & svg {
      stroke: white;
    }
  }
`;

const Back = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  margin: 5px;
  position: absolute;
  top: 5px;
  left: 5px;
  & svg {
    margin: auto auto;
    width: 70%;
    height: 70%;
    fill: #61a075;
  }
  &:hover {
    background: #efefef;
  }
`;

const Post = (props) => {
  const onDeleteHandler = () => {
    props.deletePost(props.post.id);
  };
  return (
    <Wrapper>
      <Info>
        <Back onClick={() => props.setPage("list")}>
          <IoIosArrowBack />
        </Back>
        <Writer>
          <Description>작성자</Description>
          {props.post.writer_ip}
        </Writer>
        <Time>
          <Description>작성 시간</Description>
          {Moment(props.post.createdAt).format("YYYY년 MM월 DD일 hh시 mm분")}
        </Time>
      </Info>
      <Title>{props.post.title}</Title>
      <Content>{props.post.content}</Content>
      <Delete onClick={onDeleteHandler}>
        <FiTrash2 />
      </Delete>
    </Wrapper>
  );
};

export default Post;
