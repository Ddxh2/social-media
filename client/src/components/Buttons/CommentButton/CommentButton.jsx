import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { CustomPopup } from "../..";

const CommentButton = ({ postId, commentCount, onClick }) => {
  return (
    <CustomPopup content={`${!!onClick ? "Comment on Post" : "Comments"}`}>
      <Button
        labelPosition='right'
        {...(!!onClick
          ? { as: "div", onClick }
          : { as: Link, to: `/posts/${postId}` })}
      >
        <Button color='blue' basic>
          <Icon name='comments' />
        </Button>
        <Label basic color='blue' pointing='left'>
          {commentCount}
        </Label>
      </Button>
    </CustomPopup>
  );
};

export default CommentButton;
