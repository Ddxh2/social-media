import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { useLazyQuery } from "@apollo/react-hooks";

import { GET_USER_PROFILE_IMAGE } from "../../graphql";

import "./CustomImage.css";

const CustomImage = ({ floated, size, src, username, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const [getUserProfileImage, { data }] = useLazyQuery(GET_USER_PROFILE_IMAGE);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  useEffect(() => {
    if (!src && !!username && username.trim() !== "") {
      getUserProfileImage({ variables: { username } });
    }
  }, [src, username, getUserProfileImage]);

  useEffect(() => {
    if (!!data) {
      setImageSrc(data.getUserProfile.profileImage);
    }
  }, [data]);

  return (
    <Image
      floated={floated || "right"}
      size={size || "mini"}
      src={
        !!imageSrc && imageSrc !== ""
          ? imageSrc
          : "https://cdn.onlinewebfonts.com/svg/img_336587.png"
      }
      {...props}
      circular
    />
  );
};

export default CustomImage;
