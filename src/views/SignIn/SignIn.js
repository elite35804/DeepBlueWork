import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Styles} from '@/styles';
import {Images} from '@/styles/Images';
import {useOvermind} from '@/store';
import {MainRegularFont} from '@/views/Components';
import {KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ConfirmButton from '@/views/Components/ConfirmButton';
import * as Animatable from 'react-native-animatable';
import {height, width, totalSize} from 'react-native-dimension';
import Logo from '@/assets/images/Logo.svg'
import LockIcon from '@/assets/images/LockIcon.svg'
import PasswordShow from '@/assets/images/PasswordShow.svg'
import PasswordHide from '@/assets/images/PasswordHide.svg'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {emailRegex} from '@/utils/Utils';
import axios from '@/utils/axios';

const SignIn = props => {
  const {state, actions} = useOvermind();
  const {window, isLoggedIn} = state;
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    handleAutoLogin()
  }, []);

  const handleAutoLogin = async () => {
    try {
      actions.hud.show();
      const res = await actions.loginWithToken();
      if (res) {
        props.navigation.navigate('Home')
      }
    } catch (e) {
      console.log(e)
    } finally {
      actions.hud.hide();
    }
  }

  const onPressLogin = async () => {
    if (!email) {
      actions.alert.showError({message: 'Please enter email'});
      return false
    }
    if (!emailRegex.test(email)) {
      actions.alert.showError({message: 'Please enter valid email'});
      return false;
    }
    if (!password) {
      actions.alert.showError({message: 'Please enter password'});
      return false;
    }
    try {
      actions.hud.show();
      const res = await actions.login({username: email, password: password});
      console.log(res, 'res');
      if (res?.id) {
        actions.alert.showSuccess({message: 'Logged In Successfully!'});
        props.navigation.navigate('Home')
      }
    } catch (e) {
      console.log(e)
    } finally {
      actions.hud.hide()
    }

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F1326' }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 25, alignItems: 'center', justifyContent: 'center' }}
        // contentInset={{ bottom: 0 }}
      >
        <Animatable.View
          animation="slideInUp"
          duration={1500}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: height(5),
          }}>
          <Logo />
        </Animatable.View>
        <InputContainer>
          <EmailIcon source={Images.icon_email}/>
          <Input autoCapitalize={'none'} placeholderTextColor={'rgba(222, 223, 225, .62)'} value={email} onChangeText={setEmail} placeholder={'Email'}/>
        </InputContainer>
        <InputContainer>
          <LockIcon width={16} height={16}/>
          <Input placeholderTextColor={'rgba(222, 223, 225, .62)'} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} placeholder={'Password'}/>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <PasswordShow width={16} height={16}/> : <PasswordHide width={16} height={16}/>}
          </TouchableOpacity>
        </InputContainer>
        <LoginButton onPress={onPressLogin}>
          <LoginText>Login</LoginText>
        </LoginButton>
        <ForgotBtn>
          <ForgotText>Forgot Your Password?</ForgotText>
        </ForgotBtn>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const ForgotBtn = styled.TouchableOpacity`
  ${Styles.center};
  margin-top: 14px;
`

const ForgotText = styled(MainRegularFont)`
  color: rgba(241, 242, 244, .4)
`

const LoginText = styled(MainRegularFont)`
  color: rgba(241, 242, 244, .84)
`

const Input = styled.TextInput`
  padding-horizontal: 7px;
  font-size: ${totalSize(1.8)}px;
  font-family: Rubik-Regular;
  flex: 1;
  color: white;
  padding-vertical: 0px;
`

const EmailIcon = styled.Image`
  width: 16px; height: 16px;
  tint-color: #DEDFE1;
  resize-mode: contain;
`

const InputContainer = styled.View`
  border-color: #707070;
  border-width: 1px;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  border-radius: 20px;
  width: 80%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 28px;
`

const LoginButton = styled.TouchableOpacity`
  padding-vertical: 10px;
  backgroundColor: rgba(38, 108, 213, 1);
  borderRadius: 40px;
  ${Styles.center}
  height: ${height(4.5)}px;
  width: 80%;
`
const Container = styled.ScrollView`
  flex: 1;
  background-color: #0F1326;
  
`;
