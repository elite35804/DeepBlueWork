import React, {useRef, useState} from 'react';
import {get} from 'lodash';
import moment from 'moment';
import {StyleSheet, View, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import VersionNumber from 'react-native-version-number';
import {Constants} from '@/Constants';
import {Styles, Images, Sizes} from '@/styles';
import {Spacing, FontSize} from '@/styles/Dimension';

const Menu = props => {

  const renderInfo = () => {
    return (
      <ProfileContainer>
      </ProfileContainer>
    )
  }

  // if(!props.currentUser) return (<View />)

  return (
    <MenuContainer>
      <HeaderContainer>
      </HeaderContainer>

    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const BackgroudImage = styled.Image`
  ${Styles.absolute_full}
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.View`
  padding-top: ${Constants.ToolbarHeight}px;
  height: ${Constants.ToolbarHeight + Constants.NavBarHeight}px;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #d6d6d6;
  background-color: white;
`;

const ProfileContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const UserName = styled.Text`
  font-weight: bold;
  font-size: ${FontSize.Huge}px;
  line-height: ${Sizes.scale(27)}px;
  margin-top: ${Spacing.MD}px;
`;

const Employ = styled.Text`
  font-size: ${FontSize.Medium}px;
  line-height: ${Sizes.scale(17)}px;
`;

const Address = styled.Text`
  font-style: normal;
  color: #757575;
  line-height: ${Sizes.scale(16)}px;
  font-size: ${FontSize.Small}px;
`;

const LunchTimeContainer = styled.View`
  background-color: #f3e322;
  border-radius: ${Spacing.MD}px;
  height: ${Sizes.scale(27)}px;
  width: 168px;
  margin-top: ${Spacing.XS}px;
  ${Styles.center};
`;

const LunchTime = styled.Text`
  font-weight: bold;
  font-size: ${FontSize.Small}px;
  line-height: ${Sizes.scale(15)}px;
`;

const Bottom = styled.View`
  align-items: center;
  padding-bottom: ${Sizes.bottomSafeArea1}px;
`

const AppVersion = styled.Text`
  color: #c9c9c9;
  font-size: ${FontSize.Small}px;
  margin-vertical: ${Spacing.SM}px;
`;
