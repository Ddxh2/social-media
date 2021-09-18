import React, { useMemo } from "react";
import { Grid, Transition } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_POSTS_QUERY } from "../../graphql";
import { PostCard } from "..";

import "./UserPosts.css";

const UserPosts = ({ username, profileImage }) => {
  const { loading, data: { getPosts } = {} } = useQuery(FETCH_POSTS_QUERY);
  const processedPosts = useMemo(() => {
    if (!!loading) {
      return [];
    } else {
      const userPosts = getPosts.filter(
        ({ username: postUsername }) => username === postUsername
      );
      return userPosts.reduce(
        (acc, curr) => {
          if (acc[acc.length - 1].length === 3) {
            acc.push([curr]);
          } else {
            acc[acc.length - 1].push(curr);
          }
          return acc;
        },
        [[]]
      );
    }
  }, [username, loading, getPosts]);
  return (
    <Grid className='userPosts__grid' columns={3} divided>
      <Grid.Row className='userPosts__title'>
        <h2>{username}'s Posts</h2>
      </Grid.Row>
      {!!processedPosts &&
        processedPosts.map((postsRow, index) => (
          <Grid.Row key={index}>
            <Transition.Group>
              {postsRow.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} profileImage={profileImage} />
                </Grid.Column>
              ))}
            </Transition.Group>
          </Grid.Row>
        ))}
    </Grid>
  );
};

export default UserPosts;
