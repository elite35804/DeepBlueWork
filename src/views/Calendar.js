import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Styles} from '@/styles';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import Logo from '@/assets/images/headeraAppLogo.svg'
import Bell from '@/assets/images/BellWhite.svg'
import UserLogo from '@/assets/images/icon_profile.svg'
import {MainRegularFont} from '@/views/Components';
import EmailDashboardSVG from '@/assets/images/EmailDashBoardSVG.svg';
import CalendarDashboardSVG from '@/assets/images/CalendarDashboardSVG.svg';
import NotesDashboardSVG from '@/assets/images/NotesDashboardSVG.svg';
import WorkFlowDashboardSVG from '@/assets/images/WorkFlowDashboardSVG.svg';

import SettingsDashboardSVG from '@/assets/images/SettingsDashboardSVG.svg';
import LogoutDashboardSVG from '@/assets/images/LogoutDashboardSVG.svg';
import StorageDashBoardSvg from '@/assets/images/StorageDashBoardSvg.svg';
import ProfileDashBoardSvg from '@/assets/images/ProfileDashBoardSvg.svg';

import * as Animatable from 'react-native-animatable';


const Home = (props) => {
  const [isOpen, setOpen] = useState(false);
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  const fadeOut = {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    }
  }
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{backgroundColor: '#266CD5', zIndex: 20}}/>
      <SafeAreaView style={{flex: 1}}>
        <Container>
          <Header>
            <Logo/>
            <Right>
              <TouchableOpacity style={{marginRight: 12}}>
                <Bell width={14}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpen(!isOpen)}>
                <UserLogo width={35}/>
              </TouchableOpacity>
            </Right>
          </Header>
          <Content>
            <Menu animation={isOpen ? fadeIn : fadeOut} direction="alternate">
              <MenuItem>
                <ProfileDashBoardSvg width={22} height={22}/>
                <PText style={{fontSize: 12, marginLeft: 6, color: '#D1D8E3'}}>devran@fastworkblue.com</PText>
              </MenuItem>
              <MenuItem style={{backgroundColor: '#1A203C'}}>
                <StorageDashBoardSvg width={22} height={22}/>
                <MainText style={{color: '#D1D8E3', opacity: 1, marginLeft: 8, }}>1GB Used</MainText>
              </MenuItem>
              <MenuItem style={{backgroundColor: '#1A203C'}}>
                <SettingsDashboardSVG width={22} height={22}/>
                <MainText style={{color: '#D1D8E3', opacity: 1, marginLeft: 8, }}>Settings</MainText>
              </MenuItem>
              <MenuItem style={{backgroundColor: '#1A203C', paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                <LogoutDashboardSVG width={22} height={22}/>
                <MainText style={{color: '#D1D8E3', opacity: 1, marginLeft: 8, }}>Logout</MainText>
              </MenuItem>
            </Menu>
            <MainText>Updated Recently</MainText>
            <Row>
              <Circle>
                <EmailDashboardSVG width={20} height={14}/>
              </Circle>
              <MainText>You have 12 unread emails</MainText>
            </Row>
            <Row>
              <Circle>
                <CalendarDashboardSVG width={20} height={14}/>
              </Circle>
              <MainText>You have 3 events today</MainText>
            </Row>
            <Row>
              <Circle>
                <WorkFlowDashboardSVG width={20} height={14}/>
              </Circle>
              <MainText>You have 2 workflow docs waiting for approval</MainText>
            </Row>
            <Body>
              <TabsRow style={{marginBottom: '20%'}}>
                <TabItem style={{marginRight: '20%'}}>
                  <EmailDashboardSVG height={60}/>
                  <MainText style={{color: 'white', opacity: 1, marginTop: 3}}>Email</MainText>
                </TabItem>
                <TabItem>
                  <CalendarDashboardSVG height={60}/>
                  <MainText style={{color: 'white', opacity: 1, marginTop: 3}}>Calendar</MainText>
                </TabItem>
              </TabsRow>
              <TabsRow>
                <TabItem style={{marginRight: '20%'}}>
                  <NotesDashboardSVG height={60}/>
                  <MainText style={{color: 'white', opacity: 1, marginTop: 3}}>Notes</MainText>
                </TabItem>
                <TabItem>
                  <WorkFlowDashboardSVG height={60}/>
                  <MainText style={{color: 'white', opacity: 1, marginTop: 3}}>Workflow</MainText>
                </TabItem>
              </TabsRow>
            </Body>
          </Content>
        </Container>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: '#0F1326'}}/>
    </View>
    )
};

export default Home;

const PText = styled(MainRegularFont)`
  font-size: 10px;
  color: white
`


const Profile = styled.View`
  width: 20px; height: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: white;
  ${Styles.center};
  margin-right: 6px;
`


const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  ${Styles.start_center};
  background-color: #14192E;
  padding-horizontal: 13px;
  padding-vertical: 10px;
`

const Menu = styled(Animatable.View)`
  position: absolute;
  right: 0; top: 0;
  background-color: #1A203C;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 10;
`

const TabItem = styled.TouchableOpacity`
  ${Styles.center}
`

const TabsRow = styled.View`
  flex-direction: row;
`

const Body = styled.View`
  ${Styles.center};
  flex: 1;
`

const Circle = styled.View`
  width: 40px; height: 40px;
  border-radius: 20px;
  ${Styles.center};
  background-color: #2A2D3A;
  margin-right: 10px;
`

const Row = styled.View`
  flex-direction: row;
  ${Styles.start_center}
  margin-top: 23px;
  margin-right: 40px;
`

const MainText = styled(MainRegularFont)`
  color: #F1F2F4;
  opacity: .4;
  font-size: 18px;
`

const Content = styled.View`
  padding-horizontal: 14px;
  padding-top: 40px;
  flex: 1;
`

const Right = styled.View`
  flex-direction: row;
  ${Styles.center}
`

const Header = styled.View`
  flex-direction: row;
  ${Styles.between_center};
  padding-horizontal: 17px;
  padding-vertical: 10px;
  background-color: #266CD5;
  z-index: 100
`

const Container = styled.View`
  background-color: #0F1326;
  flex: 1;
`;
