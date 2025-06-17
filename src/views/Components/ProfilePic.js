import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import {PROFILE_ICONS, SERVER_BASE_URL} from '@/Constants';
import {useOvermind} from '@/store';
import {getFistCapital} from '@/utils/Utils';
import {MainMediumFont} from '@/views/Components/index';
import styled from 'styled-components/native'

const ProfilePic = ({ userName, userFlags, toRecipients }) => {
  const {state, actions} = useOvermind()
  const [error, setError] = useState(false)

  const _onImageLoadError = (event) => {
    setError(true);
  }

  const getAvatarIcon = () => {
    const styledAvatarIndex = userFlags?.findIndex(flag => flag?.includes('avatar_'))
    if (styledAvatarIndex > -1) {
      const flag = userFlags[styledAvatarIndex].split('_');
      if (flag.length > 0) {
        return PROFILE_ICONS[Number(flag[2]) - 1];
      }
    }
    return null;
  }

  return (
    <>
      {getAvatarIcon() != null ? getAvatarIcon() : <ProfileText>
        {getFistCapital(userName, state.currentUser?.userName, toRecipients)}
      </ProfileText>
      }
    </>
  );
};

export default ProfilePic;

const ProfileText = styled(MainMediumFont)`
  font-size: 20px;
  color: white;
  opacity: 0.7;
`
