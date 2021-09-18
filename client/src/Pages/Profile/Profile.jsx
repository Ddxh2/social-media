import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Button, Card, Icon } from "semantic-ui-react";
import moment from "moment";
import FileBase from "react-file-base64";

import { AuthContext } from "../../context/auth";
import { GET_USER_PROFILE, UPDATE_USER } from "../../graphql";
import { CustomImage, UserPosts } from "../../components";
import { Page } from "..";

import "./Profile.css";

const Profile = (props) => {
  const { user } = useContext(AuthContext);
  const username = props.match.params.username;
  const canUpdate = !!user && user.username === username;

  const [userProfile, setUserProfile] = useState({});
  const [newUserProfile, setNewUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { loading, data } = useQuery(GET_USER_PROFILE, {
    variables: { username },
    onError: (error) => console.log(error),
  });

  const [updateUserProfile] = useMutation(UPDATE_USER, {
    variables: { user: newUserProfile },
    update: (proxy) => {
      proxy.writeQuery({
        query: GET_USER_PROFILE,
        variables: { username },
        data: {
          getUserProfile: { ...userProfile, ...newUserProfile },
        },
      });
      setIsEditing(false);
    },
  });

  const onProfileImageClick = () => {
    const fileInput = document.querySelector(
      ".profile__edit__imageUpload > input"
    );
    fileInput.click();
  };

  useEffect(() => {
    if (!loading) {
      setUserProfile(data.getUserProfile);
    }
  }, [loading, data]);

  useEffect(() => {
    setNewUserProfile(() => {
      const { id, email, username, profileImage, bio, createdAt } = userProfile;
      return { id, email, username, profileImage, bio, createdAt };
    });
  }, [userProfile]);

  return (
    <Page>
      <div className='profile'>
        <div className='profile__container'>
          <h1>{`${userProfile.username}'s Profile`}</h1>
          <Card className='profile__card'>
            <CustomImage
              className={!!isEditing ? "profile__image" : ""}
              src={
                !!isEditing
                  ? newUserProfile.profileImage
                  : userProfile.profileImage
              }
              wrapped={true}
              ui={false}
              onClick={!!isEditing ? onProfileImageClick : () => {}}
            />
            {!!canUpdate && (
              <div className='profile__edit__imageUpload'>
                <FileBase
                  type='file'
                  multiple={false}
                  onDone={({ base64 }) =>
                    setNewUserProfile((prev) => ({
                      ...prev,
                      profileImage: base64,
                    }))
                  }
                />
              </div>
            )}
            <Card.Content>
              <Card.Header>{userProfile.username}</Card.Header>
              <Card.Meta>
                <span className='date'>
                  Joined {moment(userProfile.createdAt).fromNow()}
                </span>
              </Card.Meta>
              <Card.Description>
                {!!isEditing ? (
                  <textarea
                    cols='50'
                    rows='5'
                    value={newUserProfile.bio}
                    onChange={(event) =>
                      setNewUserProfile((prev) => ({
                        ...prev,
                        bio: event.target.value,
                      }))
                    }
                  />
                ) : (
                  userProfile.bio || "Bio..."
                )}
              </Card.Description>
            </Card.Content>
            {!!canUpdate && (
              <Card.Content extra>
                {!!isEditing ? (
                  <>
                    <Button
                      color='blue'
                      onClick={() => updateUserProfile()}
                      disabled={Object.keys(userProfile).every(
                        (key) => userProfile[key] === newUserProfile[key]
                      )}
                    >
                      Submit
                    </Button>
                    <Button
                      color='teal'
                      onClick={() => {
                        setIsEditing(false);
                        setNewUserProfile(() => {
                          const {
                            id,
                            email,
                            username,
                            profileImage,
                            bio,
                            createdAt,
                          } = userProfile;
                          return {
                            id,
                            email,
                            username,
                            profileImage,
                            bio,
                            createdAt,
                          };
                        });
                      }}
                      floated='right'
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    color='blue'
                    floated='left'
                    onClick={() => setIsEditing(true)}
                  >
                    <Icon name='edit' />
                    Edit
                  </Button>
                )}
              </Card.Content>
            )}
          </Card>
          <br />
          <UserPosts
            username={username}
            profileImage={userProfile.profileImage}
          />
        </div>
      </div>
    </Page>
  );
};

export default Profile;
