import React from "react";
import styled from "styled-components";
import {Styles} from '@/styles';
import {MainRegularFont, MainSemiBoldFont} from '@/views/Components/controls/Text';
import ProfileDashBoardSvg from '@/assets/images/ProfileDashBoardSvg.svg';
import StorageDashBoardSvg from '@/assets/images/StorageDashBoardSvg.svg';
import SettingsDashboardSVG from '@/assets/images/SettingsDashboardSVG.svg';
import LogoutDashboardSVG from '@/assets/images/LogoutDashboardSVG.svg';
import {useOvermind} from '@/store';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Dropdown = ({isOpen, onPress, top, right, ...props}) => {
  const {state, actions} = useOvermind();
  // const fadeIn = {
  //   from: {
  //     height: 0,
  //   },
  //   to: {
  //     height: 100,
  //   },
  // };
  // const fadeOut = {
  //   from: {
  //     height: 100,
  //   },
  //   to: {
  //     height: 0,
  //   }
  // }
  if (!isOpen) return null;
  return (<Menu top={top} right={right} animation={isOpen}>
    <MenuItem onPress={() => onPress('profile')}>
      <ProfileDashBoardSvg width={22} height={22}/>
      <PText style={{fontSize: 12, marginLeft: 6, color: '#D1D8E3'}}>{state.currentUser?.userName}</PText>
    </MenuItem>
    <MenuItem onPress={() => onPress('usage')} style={{backgroundColor: '#1A203C'}}>
      <StorageDashBoardSvg width={22} height={22}/>
      <MainText style={{color: '#D1D8E3', opacity: 1, marginLeft: 8, }}>1GB Used</MainText>
    </MenuItem>
    <MenuItem onPress={() => onPress('settings')} style={{backgroundColor: '#1A203C'}}>
      <SettingsDashboardSVG width={22} height={22}/>
      <MainText style={{color: '#D1D8E3', opacity: 1, marginLeft: 8, }}>Settings</MainText>
    </MenuItem>
    <MenuItem onPress={() => onPress('logout')} style={{backgroundColor: '#1A203C', paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
      <LogoutDashboardSVG width={22} height={22}/>
      <MainText style={{color: '#D1D8E3', opacity: 1, marginLeft: 8, }}>Logout</MainText>
    </MenuItem>
  </Menu>
)};

export default Dropdown;

const MainText = styled(MainRegularFont)`
  color: #F1F2F4;
  font-size: 18px;
`

const PText = styled(MainRegularFont)`
  font-size: 10px;
  color: white
`
const MenuItem = styled(TouchableOpacity)`
  flex-direction: row;
  ${Styles.start_center};
  background-color: #14192E;
  padding-horizontal: 13px;
  padding-vertical: 10px;
  z-index: 100;
`

const Menu = styled.View`
  position: absolute;
  right: ${props => props.right ? props.right : 0}px; 
  top: ${props => props.top ? props.top : 0}px;
  background-color: #1A203C;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 50;
`
