import React, { useState, useContext, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Card, Grid, Image, Form } from "semantic-ui-react";
import moment from "moment";

import { FETCH_POST_QUERY, CREATE_COMMENT_MUTATION } from "../../graphql";
import { DeleteButton, CommentButton, LikeButton } from "../../components";
import { AuthContext } from "../../context/auth";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef();

  const { data: { getPost = {} } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  const {
    id,
    body,
    createdAt,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  } = getPost;

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update: () => {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };
  return Object.keys(getPost).length > 0 ? (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            size='small'
            float='right'
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <CommentButton
                postId={id}
                commentCount={commentCount}
                onClick={() => commentInputRef.current.focus()}
              />
              {!!user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          {!!user && (
            <Card fluid>
              <Card.Content>
                <p>Post a Comment</p>
                <Form>
                  <div className='ui action input fluid'>
                    <input
                      type='text'
                      placeholder='Comment...'
                      name='comment'
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type='submit'
                      className='ui button teal'
                      disabled={comment.trim() === ""}
                      onClick={(event) => {
                        event.preventDefault();
                        createComment();
                      }}
                    >
                      Create
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {!!user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : null;
};

export default SinglePost;
