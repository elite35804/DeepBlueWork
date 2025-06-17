import { Dimensions, Platform, StatusBar } from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const isIphoneX =
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || height === 896 || width === 896);

/*
*
*/
export const TabBarStyle = {
  top: 'TOP',
  bottom: 'BOTTOM',
};

/*
*
*/
export const Constants = {
  NavBarHeight: 50,
  ToolbarHeight: Platform.OS === 'ios' ? (isIphoneX ? 35 : 22) : StatusBar.currentHeight,
  ScreenWidth: width,
  ScreenHeight: height,
  tabBarStyle: TabBarStyle.top,
};

// import Icon from 'react-native-vector-icons/FontAwesome';
export const user = <FontAwesomeIcon name="user-circle-o" size={25} light color="#F2F3F7" />;
export const snowflake = <FontAwesome5Icon name="snowflake" size={25} light color="#F2F3F7" />;
export const contacts = <MaterialCommunityIcon name="contacts" size={25} light color="#F2F3F7" />;
// export const face = <MaterialCommunityIcon name="face-man" size={25} light color="#F2F3F7" />;
export const ladybug = <MaterialCommunityIcon name="ladybug" size={25} light color="#F2F3F7" />;
export const bank = <MaterialCommunityIcon name="bank" size={25} light color="#F2F3F7" />;
// export const umbrella = <MaterialCommunityIcon name="umbrella-beach" size={25} light color="#F2F3F7" />;
// export const airplanemode = <MaterialIcons name="airplanemode-on" size={25} light color="#F2F3F7" />;


export const SERVER_BASE_URL = 'https://gateway.dev-stag.deepbluework.com';
export const USER_FOLDERS = 'user-folders'

export const PROFILE_ICONS = [user, contacts, snowflake, ladybug, bank]

export const REPEAT_OPTIONS = [
  {
    label: 'Does Not Repeat',
    value: 'N',
  },
  {
    label: 'Daily',
    value: 'D',
  },
  {
    label: 'Monthly',
    value: 'M',
  },
];


export const NOTIFICATIONS_OPIONS = [
  {
    label: 'None',
    value: 'N',
  },
  {
    label: '15 Minutes',
    value: '15',
  },
  {
    label: '30 Minutes',
    value: '30',
  },
]
