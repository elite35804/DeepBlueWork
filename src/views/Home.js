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
import {useOvermind} from '@/store';
import ProfilePic from '@/views/Components/ProfilePic';
import Dropdown from '@/views/Components/Dropdown';


const Home = (props) => {
  const {state, actions} = useOvermind();
  const [isOpen, setOpen] = useState(false);

  const onPressNav = (name) => {
    props.navigation.navigate('Main', {
      screen: 'Home',
      params: {
        screen: 'Home',
        params: {
          screen: name,
        }
      }
    })
  }

  const onPressMenu = (name) => {
    if (name === 'logout') {
      actions.logout();
      props.navigation.navigate('SignIn')
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
              <Profile onPress={() => setOpen(!isOpen)}>
                {/*<UserLogo width={35} height={35}/>*/}
                <ProfilePic userName={state.currentUser?.userName} toRecipients={[]}/>
              </Profile>
            </Right>
          </Header>
          <Content>
            <Dropdown isOpen={isOpen} top={0} right={0} onPress={onPressMenu}/>
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
                <TabItem onPress={() => onPressNav('Email')} style={{marginRight: '20%'}}>
                  <EmailDashboardSVG height={60}/>
                  <MainText style={{color: 'white', opacity: 1, marginTop: 3}}>Email</MainText>
                </TabItem>
                <TabItem onPress={() => onPressNav('Calendar')} >
                  <CalendarDashboardSVG height={60}/>
                  <MainText style={{color: 'white', opacity: 1, marginTop: 3}}>Calendar</MainText>
                </TabItem>
              </TabsRow>
              <TabsRow>
                <TabItem onPress={() => onPressNav('Notes')} style={{marginRight: '20%'}}>
                  <NotesDashboardSVG height={60}/>
                  <MainText style={{color: 'white', opacity: 1, marginTop: 3}}>Notes</MainText>
                </TabItem>
                <TabItem onPress={() => onPressNav('Workflow')} >
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

const Profile = styled.TouchableOpacity`
  width: 35px; height: 35px;
  border-radius: 20px;
  ${Styles.center};
  background-color: #202641;
  border-width: 3px;
  border-color: darkgreen;
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
