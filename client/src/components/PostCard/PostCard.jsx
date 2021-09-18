import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import { LikeButton, CommentButton, DeleteButton, CustomImage } from "../";

const PostCard = ({
  profileImage,
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <CustomImage
          as={Link}
          to={`/user/${username}`}
          floated='right'
          size='mini'
          username={username}
          src={profileImage}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <CommentButton postId={id} commentCount={commentCount} />
        {!!user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
