import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import {
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
  FETCH_POSTS_QUERY,
} from "../../../graphql";
import { CustomPopup } from "../..";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const MUTATION = !!commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(MUTATION, {
    variables: { postId, commentId },
    update: (proxy) => {
      setConfirmOpen(false);

      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: data.getPosts.filter(({ id }) => id !== postId) },
        });
      }

      if (!!callback) {
        callback();
      }
    },
  });
  return (
    <>
      <CustomPopup content={`Delete ${commentId ? "Comment" : "Post"}`}>
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </CustomPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePostOrComment()}
      />
    </>
  );
};

export default DeleteButton;
