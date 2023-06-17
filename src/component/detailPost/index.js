import Axios from "axios";
import { useEffect, useState } from "react";

import Post from "./post";
import Comments from "./comments";
import { API_URL } from "../../constant/url";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
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
    fill: #61a075;
  }
  &:hover {
    background: #dfdfdf;
  }
`;

const DetailPost = (props) => {
  const [post, setPost] = useState({
    writer_id: "",
    title: "",
    content: "",
    createdAt: "",
  });

  const [comments, setComments] = useState([
    {
      writer_id: "",
      content: "",
      createdAt: "",
      id: "",
    },
  ]);

  useEffect(() => {
    Axios.get(API_URL + `posts/${props.selectedPost}`, null, {
      withCredentials: false,
    }).then((res) => {
      setPost(res.data);
    });
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  const deletePost = (postID) => {
    Axios.delete(
      API_URL + `posts/${postID}`,
      { id: postID },
      { withCredentials: false }
    ).then((res) => {
      props.setPage("list");
    });
  };

  const getComments = () => {
    Axios.get(API_URL + `posts/${props.selectedPost}/comments`, null, {
      withCredentials: false,
    }).then((res) => {
      setComments(res.data);
    });
  };
  const writeComment = (comment) => {
    console.log("send");
    Axios.post(API_URL + `posts/${props.selectedPost}/comments`, comment, {
      withCredentials: false,
    }).then((res) => {
      console.log(res.data);
      getComments();
    });
  };

  const deleteComment = (commentID) => {
    Axios.delete(API_URL + `posts/${props.selectedPost}/comments`, {
      data: {
        id: commentID,
      },
      withCredentials: false,
    }).then((res) => {
      getComments();
    });
  };

  return (
    <Wrapper>
      <Post post={post} setPage={props.setPage} deletePost={deletePost} />
      <Comments
        comments={comments}
        writeComment={writeComment}
        deleteComment={deleteComment}
      />
    </Wrapper>
  );
};

export default DetailPost;
