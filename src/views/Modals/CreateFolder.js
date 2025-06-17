import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components/native';
import {useOvermind} from '@/store';
import Modal from 'react-native-modal';
import {Images, Styles} from '@/styles';
import {FlatList, Image, Keyboard, Text, TouchableWithoutFeedback, View, TouchableOpacity} from 'react-native';
import {MainBoldFont, MainSemiBoldFont} from '@/views/Components';
import InboxIcon from '@/assets/images/InboxIcon.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {height, width} from 'react-native-dimension';
// import {TouchableOpacity} from 'react-native-gesture-handler'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreateFolder = props => {
  const {state, actions} = useOvermind();
  const [folderName, setFolderName] = useState(null);

  const createFolder = async () => {
    if (!folderName) return;
    if (folderName?.length > 12) {
      actions.alert.showError({message: 'Folder name too long!'});
      return false;
    }


    try {
      props.closeModal();
      actions.hud.show()
      let payload = { folderName: folderName.toString() };
      await actions.email.createEmailToFolder(payload);
      let selectedFolder = folderName.toString();

      const IDs = props.selectedEmailIds.map(id => {
        return Number(id);
      });

      let data = {
        uids: IDs,
        crrFolderName: state.email.currentType?.toUpperCase(),
        newFolderName: 'user-folders.' + selectedFolder,
      };
      await actions.email.moveEmailToFolder(data);
      actions.alert.showSuccess({message: 'Moved emails successfully!'});
      actions.email.getAllFolders()

      props.onRefresh();
    } catch (e) {
      console.log(e)
    } finally {
      actions.hud.hide();
    }
    if (res?.status >= 200 && res?.status < 300) {
      moveEmailsToFolder(folderName.toString())
    }

  }
  return (
    <MainModal
      isVisible={props.isOpen}
      onBackdropPress={() => {props.closeModal()}}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 25, alignItems: 'center', justifyContent: 'center' }}
        // contentInset={{ bottom: 0 }}
      >
      <Container>
        <Row>
          <View style={{width: 20}}/>
          <Title>
            Create Folder
          </Title>
          <TouchableOpacity style={{marginTop: -10}} onPress={() => props.closeModal()}>
            <MaterialCommunityIcons
              name='close'
              size={20}
              color="#D4DAE5"/>
          </TouchableOpacity>
        </Row>
        <Label>
          Folder Name
        </Label>
        <Input
          folderName={folderName}
          value={folderName}
          placeholder={'Folder Name'}
          placeholderTextColor={'gray'}
          onChangeText={val => setFolderName(val?.replace(/[^a-zA-Z0-9]/gi, ''))}
        />
        <Bottom>
          <Btn onPress={createFolder}>
            <BtnText>Create</BtnText>
          </Btn>
        </Bottom>
      </Container>
      </KeyboardAwareScrollView>
    </MainModal>
  );
};

export default CreateFolder;

const BtnText = styled(MainSemiBoldFont)`
  color: white;
  font-size: 12px;
`

const Btn = styled.TouchableOpacity`
  background-color: #075595;
  margin-top: 20px;
  height: 30px;
  border-radius: 5px;
  justify-content: center;
  padding-horizontal: 20px;
`

const Bottom = styled.View`
  width: 100%;
  ${Styles.center}
`

const Input = styled.TextInput`
  border-width: 1px;
  border-color: ${props => props.folderName?.length > 12 ? 'red': 'gray'};
  width: 100%;
  borderRadius: 5px;
  color: black;
  height: 35px;
  padding-horizontal: 10px;
  margin-top: 5px;
  color: white;
`

const Label = styled(MainSemiBoldFont)`
  color: white;
  font-size: 13px;
  
`

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
  width: 100%;
`;
