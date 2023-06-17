import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../constant/url";
import styled from "styled-components";
import { TbPencilMinus } from "react-icons/tb";
import Moment from "moment";

const Wrapper = styled.div`
  width: 70%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  overflow: hidden;
  width: 100%;
`;

const Post = styled.button`
  all: unset;
  height: 80px;
  box-sizing: border-box;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background: #fafafa;
  }
`;
const Title = styled.div`
  height: fit-content;
  font-size: 22px;
  margin: auto 0;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;
const IP = styled.div`
  font-size: 14px;
  color: #000000;
`;
const Time = styled.div`
  font-size: 14px;
  color: #7f7f7f;
`;

const Button = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  margin: 5px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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

const Write = styled(Button)`
  margin: 5px 0;
  &:hover {
    background: #dfdfdf;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Pages = styled.div`
  display: flex;
  gap: 5px;
`
const PageButton = styled(Button)`
  margin: 5px 0;
  justify-content: center;
  color: ${(props) => (props.isCurrent ? "black" : "#afafaf")};
  line-height: 40px;
`;
function PostList(props) {
  const [postList, setPostList] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const perSlice = 5;
  useEffect(() => {
    Axios.get(API_URL + "posts", null, {
      withCredentials: false,
    }).then((res) => {
      setPostList(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <Posts>
        {postList
          .slice(pageNum * perSlice, pageNum * perSlice + perSlice)
          .map((post) => {
            return (
              <Post
                onClick={() => {
                  props.setPage("detail");
                  props.setSelectedPost(post.id);
                }}
              >
                <Title>{post.title}</Title>
                <Info>
                  <IP>{post.writer_ip}</IP>
                  <Time>
                  {Moment(post.createdAt).format(
                      "YYYY년 MM월 DD일 hh시 mm분"
                    )}
                  </Time>
                </Info>
              </Post>
            );
          })}
      </Posts>
      <Footer>
        <Pages>
          {postList.map((post, idx) => {
            if (idx % perSlice == 0)
              return (
                <PageButton
                  isCurrent={pageNum == idx / perSlice}
                  onClick={(e) => {
                    setPageNum(idx / perSlice);
                  }}
                >
                  {idx / perSlice + 1}
                </PageButton>
              );
          })}
        </Pages>

        <Write
          onClick={() => {
            props.setPage("write");
          }}
        >
          <TbPencilMinus />
        </Write>
      </Footer>
    </Wrapper>
  );
}

export default PostList;
