import React, {useRef, useState} from 'react';
import {Alert, Modal, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useOvermind} from '@/store';
import styled from 'styled-components';

import Timed from '@/assets/images/Timed.svg'
import Junk from '@/assets/images/Junk.svg'
import Inbox from '@/assets/images/Inbox.svg'
import Delete from '@/assets/images/Delete.svg'
import All from '@/assets/images/All.svg'
import Sent from '@/assets/images/Sent.svg'
import WhiteStar from '@/assets/images/whiteStar.svg';
import EmailAddFolder from '@/assets/images/EmailAddFolderIcon.svg';
import {MainRegularFont} from '@/views/Components';
import {Styles} from '@/styles';
import {json} from 'overmind';


const MenuScreen = props => {
  const {state, actions} = useOvermind();

  const onPressItem = (type) => {
    actions.email.setType(type);
    props.navigation.closeDrawer()
  }
  const userFolders = json(state.email.folders)?.reverse()?.filter(item => item?.includes('user-folders'));
  return (
    <Container>
      <ScrollView style={{flex: 1}}>
        <Category>Deep Blue Work</Category>
        {state.email.folders?.filter(item => !item?.includes('user-folders'))?.map((folder, index) => <Row isSelected={folder === state.email.currentType} key={index} onPress={() => onPressItem(folder)}>
          {folder?.toLowerCase() === 'inbox' ? <Inbox width={22} height={22}/> : null}
          {folder?.toLowerCase() === 'sent' ? <Sent width={22} height={22}/> : null}
          {folder?.toLowerCase() === 'timed' ? <Timed width={22} height={22}/> : null}
          {folder?.toLowerCase() === 'delete' ? <Delete width={22} height={22}/> : null}
          {folder?.toLowerCase() === 'all' ? <All width={22} height={22}/> : null}
          {folder?.toLowerCase() === 'starred' ? <WhiteStar width={22} height={22}/> : null}
          {folder?.toLowerCase() === 'junk' ? <Junk width={22} height={22}/> : null}
          <Category style={{marginLeft: 10, marginBottom: 0}}>{folder}</Category>
        </Row>)}
        <Category>User Folders</Category>
        {userFolders?.map((user, index) => {
          const label = user?.replace?.('user-folders.', '')?.replace?.('user-folders', '');
          return <Row isSelected={user === state.email.currentType} key={index} onPress={() => onPressItem(user)}>
            <EmailAddFolder width={22} height={22}/>
            <Category style={{marginLeft: 10, marginBottom: 0}}>{label}</Category>
          </Row>
        })}
      </ScrollView>
    </Container>
  );
};

export default MenuScreen;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
  padding-vertical: 8px;
  padding-horizontal: 10px;
  border-radius: 8px;
  background-color: ${props => props.isSelected ? 'rgba(23, 65, 128, 1)': 'transparent'};
`

const Container = styled.View`
  flex: 1;
  padding-horizontal: 10px;
  padding-vertical: 34px;
  background-color: #181F3B;
`

const Category = styled(MainRegularFont)`
  color: #DEDFE1;
  font-size: 16px;
  margin-bottom: 15px;
  padding-horizontal: 4px;
`
