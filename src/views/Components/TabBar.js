import React, {useEffect, useState} from 'react';
import {Animated, Image, Platform, SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';
import {Colors, Images, Styles} from '@/styles';
import {MainBoldFont, MainRegularFont} from '@/views/Components';
import BellBlue from '@/assets/images/BellBlue.svg';
import BellGrey from '@/assets/images/BellGrey.svg';
import CalenderBlue from '@/assets/images/CalenderBlue.svg';
import CalenderGrey from '@/assets/images/CalenderGrey.svg';
import EmailBlue from '@/assets/images/EmailBlue.svg';
import EmailGrey from '@/assets/images/EmailGrey.svg';
import NotesBlue from '@/assets/images/NotesBlue.svg';
import NotesGrey from '@/assets/images/NotesGrey.svg';
import WorkFlowBlue from '@/assets/images/WorkFlowBlue.svg';
import WorkFlowGrey from '@/assets/images/WorkFlowGrey.svg';
import {useOvermind} from '@/store';
import {height} from 'react-native-dimension';
import Logo from '@/assets/images/Logo.svg';
import * as Animatable from 'react-native-animatable';

/*
*
*/
export const BottomTabBar = (props) => {

  const [slideHeight, setSlideHeight] = useState(new Animated.Value(0.01));
  const {state, actions} = useOvermind();
  // useEffect(() => {
  //   console.log('===============')
  //   if (state.bottomTabs) {
  //     Animated.timing(slideHeight, {
  //       toValue: Platform.OS ==='ios' ? 100: 100,
  //       duration: 250,
  //       useNativeDriver: false
  //     }).start();
  //     // Animated.spring(
  //     //   slideHeight,
  //     //   {
  //     //     toValue: Platform.OS ==='ios' ? 0 : 0.01,
  //     //     velocity: 10,
  //     //     tension: 10,
  //     //     useNativeDriver: false
  //     //   },
  //     // ).start();
  //   } else {
  //     Animated.timing(slideHeight, {
  //       toValue: Platform.OS === 'ios' ? 0: 0,
  //       duration: 250,
  //       useNativeDriver: false
  //     }).start();
  //     // Animated.spring(
  //     //   slideHeight,
  //     //   {
  //     //     toValue: Platform.OS === 'ios' ? -90 : -65,
  //     //     velocity: 10,
  //     //     tension: 10,
  //     //     useNativeDriver: false
  //     //   },
  //     // ).start();
  //   }
  // }, [state.bottomTabs])
  return (
      <Container
        // style={{marginBottom: state.bottomTabs ? (Platform.OS ==='ios' ? 0 : 0.01) : (Platform.OS === 'ios' ? -90 : -65)}}
      >
        <Animatable.View animation={state.bottomTabs ? "slideInUp" : 'slideOutDown'} useNativeDriver={true} duration={state.bottomTabs ? 100: 0} delay={0} style={{
          height: state.bottomTabs ? 60: 0,
          backgroundColor: '#0F1326'
        }}>
        <BottomTabBarContainer>
          <TabItem onPress={() => props.navigation.navigate('Email')}>
            {props.state.index === 0 ? <EmailBlue width={37} height={28}/> : <EmailGrey width={37} height={28}/>}
            <TabTitle style={{color: props.state.index === 0 ? '#266CD5' : '#A1AAB2'}}>Email</TabTitle>
          </TabItem>
          <TabItem onPress={() => props.navigation.navigate('Calendar')}>
            {props.state.index === 1 ? <CalenderBlue width={37} height={28}/> : <CalenderGrey width={37} height={28}/>}
            <TabTitle style={{color: props.state.index === 1 ? '#266CD5' : '#A1AAB2'}}>Calendar</TabTitle>
          </TabItem>
          <TabItem onPress={() => props.navigation.navigate('Notes')}>
            {props.state.index === 2 ? <NotesBlue width={37} height={28}/> : <NotesGrey width={37} height={28}/>}
            <TabTitle style={{color: props.state.index === 2 ? '#266CD5' : '#A1AAB2'}}>Notes</TabTitle>
          </TabItem>
          <TabItem onPress={() => props.navigation.navigate('Workflow')}>
            {props.state.index === 3 ? <WorkFlowBlue width={37} height={28}/> : <WorkFlowGrey width={37} height={28}/>}
            <TabTitle style={{color: props.state.index === 3 ? '#266CD5' : '#A1AAB2'}}>Workflow</TabTitle>
          </TabItem>
          <TabItem onPress={() => props.navigation.navigate('Notifications')}>
            {props.state.index === 4 ? <BellBlue width={37} height={28}/> : <BellGrey width={37} height={28}/>}
            <TabTitle style={{color: props.state.index === 4 ? '#266CD5' : '#A1AAB2'}}>Notifications</TabTitle>
          </TabItem>
        </BottomTabBarContainer>
        </Animatable.View>
      </Container>
  );
};

/*
*
*/
export const tabBarOptions = {
  showLabel: true,
  tabStyle: {backgroundColor: '#0F1326'},
};

const TabTitle = styled(MainRegularFont)`
  color: #266CD5;
  font-size: 11px;
  line-height: 16px;
`;

const TabItem = styled.TouchableOpacity`
  ${Styles.center};
  flex: 1;
`;

const BottomTabBarContainer = styled.View`
  padding-top: ${props => Platform.OS ===  'android' ? '10px': '18px'};
  padding-bottom: ${props => Platform.OS === 'ios' ? '25px': '8px'};
  flex-direction: row;
  justify-content: space-between;
  background-color: #D1D8E3;
  align-items: center;
  width: 100%;
  padding-horizontal: 5px;
`;

const Container = styled.View`
  background-color: #0F1326;
`;
