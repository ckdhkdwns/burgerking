import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import Moment from "moment";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  gap: 5px;
`;

const CommentWrapper = styled.div`
  background: white;
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
const Comment = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 15px;
  margin: 5px 0;
`;

const Time = styled.div`
  font-size: 15px;
  color: #6f6f6f;
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

const Delete = styled(Button)`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;

  border-radius: 30px;
  transition: 0.1s all;
  & svg {
    fill: #d76565;
  }
  &:hover {
    background: #d76565;
    & svg {
      fill: white;
    }
  }
`;
const Writer = styled.div`
  font-size: 15px;
`;
const Content = styled.div``;

const Info = styled.div`
  margin-right: 50px;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background: white;
`;

const TA = styled.input`
  all: unset;
  margin: 10px 15px;
  height: 36px;
  width: 80%;
`;

const Submit = styled(Button)`
  margin: auto 10px;
  transition: 0.1s all;
  & svg {
    stroke: #61a075;
  }
  &:hover {
    background: #61a075;
    & svg {
      stroke: white;
    }
  }
`;

const Comments = (props) => {
  const onWriteHandler = (e) => {
    e.preventDefault();

    props.writeComment({
      content: e.target.comment.value,
    });
    e.target.comment.value = "";
  };

  const onDeleteHandler = (id) => {
    props.deleteComment(id);
  };

  return (
    <Wrapper>
      {props.comments && (
        <CommentWrapper>
          {props.comments.map((comment) => {
            return (
              <Comment>
                <Content>
                  <a>{comment.content}</a>
                </Content>
                <Info>
                  <Writer>{comment.writer_ip}</Writer>
                  <Time>
                    {Moment(comment.createdAt).format(
                      "YYYY년 MM월 DD일 hh시 mm분"
                    )}
                  </Time>
                </Info>
                <Delete onClick={() => onDeleteHandler(comment.id)}>
                  <MdClose />
                </Delete>
              </Comment>
            );
          })}
        </CommentWrapper>
      )}
      <Form onSubmit={onWriteHandler}>
        <TA name="comment" placeholder="댓글을 입력하세요."></TA>
        <Submit>
          <FiSend />
        </Submit>
      </Form>
    </Wrapper>
  );
};

export default Comments;
