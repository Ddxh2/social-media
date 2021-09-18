import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { PostCard, PostForm } from "../../components";
import { FETCH_POSTS_QUERY } from "../../graphql";
import { AuthContext } from "../../context/auth";
import { Page } from "..";

import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY);

  return (
    <Page>
      <Grid columns={3} divided>
        <Grid.Row className='home__title'>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {!!user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </Page>
  );
};

export default Home;
