import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components/native';
import {useOvermind} from '@/store';
import Modal from 'react-native-modal';
import {Images, Styles} from '@/styles';
import {FlatList, Image, Keyboard, Text, TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import {MainBoldFont, MainSemiBoldFont} from '@/views/Components';
import InboxIcon from '@/assets/images/InboxIcon.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {height, width} from 'react-native-dimension';
// import {TouchableOpacity} from 'react-native-gesture-handler'

const MoveFolder = props => {
  const {state, actions} = useOvermind();
  const moveEmailsToFolder = async folder => {
    try {
      // setNavBarDropDownStatus(false);
      // setMoveFolder(false);
      props.closeModal();
      actions.hud.show()
      let selectedFolder = folder;

      const IDs = props.selectedEmailIds.map(id => {
        return Number(id);
      });

      let data = {
        uids: IDs,
        crrFolderName: state.email.currentType,
        newFolderName: selectedFolder,
      };
      await actions.email.moveEmailToFolder(data);
      actions.alert.showSuccess({message: 'Moved emails successfully!'});

      props.onRefresh();

      // await dispatch(moveEmailToFolder(data));
      // loadEmails(1);
      //
      // loader === false && setSelectedEmailIds([]);
    } catch (e) {
      console.log(e)
    } finally {
      actions.hud.hide();
    }

  };
  const renderMoveFolders = ({ item, index }) => {

    if (!item.includes('user-folders'))
      return null

    const itemText = item?.toLowerCase?.();

    let label = item
      ?.replace
      ?.('user-folders.', '')
      ?.replace
      ?.('user-folders', '')

    if (!label)
      return null

    let icon = <InboxIcon />;

    if (itemText === 'sent')
      icon =
        <MaterialCommunityIcons
          name='send-outline'
          size={20}
          color="#D4DAE5"
        />
    else if (itemText === 'delete')
      icon =
        <MaterialCommunityIcons
          name='delete'
          size={20}
          color="#D4DAE5"
        />
    else if (itemText === 'inbox')
      icon =
        <MaterialCommunityIcons
          name='inbox'
          size={20}
          color="#D4DAE5"
        />
    else if (itemText.includes('user-folders'))
      icon =
        <MaterialCommunityIcons
          name='folder'
          size={20}
          color="#D4DAE5"
        />

    return (
      <TouchableOpacity
        key={index}
        onPress={() => moveEmailsToFolder(item)}
        style={[
          state.email.currentType === item && {backgroundColor: 'rgba(38, 108, 213, 0.38)',},
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: width(3),
            height: height(5),
            marginBottom: height(0.4),
          }
        ]}>
        <View>{icon}</View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: width(1),}}>
          <Text numberOfLines={1} style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontFamily: 'Rubik-Regular',
            marginLeft: width(3),
          }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <MainModal
      isVisible={props.isOpen}
      onBackdropPress={() => {props.closeModal()}}
    >
      <Container>
        <Row>
          <View style={{width: 20}}/>
          <Title>
            Move Folder
          </Title>
          <TouchableOpacity style={{marginTop: -10}} onPress={() => props.closeModal()}>
            <MaterialCommunityIcons
              name='close'
              size={20}
              color="#D4DAE5"/>
          </TouchableOpacity>
        </Row>

        <FlatList
          data={state.email.folders || []}
          bounces={true}
          keyExtractor={(_, index) => index?.toString()}
          renderItem={renderMoveFolders}
        />
      </Container>
    </MainModal>
  );
};

export default MoveFolder;

const Row = styled.View`
  ${Styles.between_center};
  flex-direction: row;
  width: 100%;
`

const Title = styled(MainSemiBoldFont)`
  color: white;
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`

const MainModal = styled(Modal)`
  flex: 1;
  margin: 0;
`;

const Container = styled.View`
  padding: 20px;
  ${Styles.center_start};
  background-color: #0F1326;
  border-radius: 20px;
  margin-horizontal: 10px;
`;
