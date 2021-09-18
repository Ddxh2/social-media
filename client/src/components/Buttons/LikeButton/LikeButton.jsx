import React, { useState, useEffect } from "react";
import { Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { LIKE_POST_MUTATION } from "../../../graphql";
import { CustomPopup } from "../..";

import "./LikeButton.css";

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  useEffect(() => {
    if (!!user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  return (
    <CustomPopup content={`${!!liked ? "Unlike" : "Like"} Post`}>
      <Button
        as='div'
        labelPosition='right'
        onClick={!!user ? likePost : () => {}}
      >
        <Button
          color='teal'
          basic={!user || !liked}
          {...(!user ? { as: Link, to: "/login" } : {})}
        >
          <Icon name='heart' />
        </Button>
        <Label as='a' basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>
    </CustomPopup>
  );
};

export default LikeButton;
