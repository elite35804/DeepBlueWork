import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {
  ActivityIndicator,
  Dimensions,
  FlatList, Keyboard,
  RefreshControl,
  SafeAreaView, Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Styles} from '@/styles';
import EmailAddFolderIcon from '@/assets/images/EmailAddFolderIcon.svg';
import EmailBackArrow from '@/assets/images/EmailBackArrow.svg';
import EmailBin from '@/assets/images/EmailBin.svg';
import EmailEye from '@/assets/images/EmailEye.svg';
import EmailHideEye from '@/assets/images/EmailHideEye.svg';
import EmailPathIcon from '@/assets/images/EmailPathIcon.svg';

import NavBarIcon from '@/assets/images/navBar.svg';
import Search from '@/assets/images/search.svg';
import Feather from "@/assets/images/Feather.svg";
import {MainBoldFont, MainSemiBoldFont} from '@/views/Components';
import EmailItem from '@/views/Components/EmailItem';
import UserLogo from '@/assets/images/icon_profile.svg';
import {useOvermind} from '@/store';
import {upperFirst} from 'lodash';
import ProfilePic from '@/views/Components/ProfilePic';
import {height, width} from 'react-native-dimension';
import Dropdown from '@/views/Components/Dropdown';
import InboxIcon from '@/assets/images/InboxIcon.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MoveFolder from '@/views/Modals/MoveFolder';
import CreateFolder from '@/views/Modals/CreateFolder';

const Email = (props) => {
  const {state, actions} = useOvermind()
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState([]);
  const [moveFolder, setMoveFolder] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(false)


  useEffect(() => {
    setSelectedEmailIds([]);
    actions.email.onChangePage(1);
    getEmails();
  }, [state.email.currentType, keyword])

  const getEmails = async () => {
    try {
      setLoading(true);
      const params = {
        userName: state.currentUser?.userName,
        pageNumber: state.email.emails[state.email.currentType]?.page,
        pageSize: state.email.emailPerPage,
        mailBoxFolder: state.email.currentType
      };
      if (keyword) {
        params.keyword = keyword;
      }
      await actions.email.getEmails(params)
    } catch (e) {
      console.log(e, 'error')
    } finally {
      setLoading(false)
    }
  }

  const starredEmail = async (item) => {
    let data = {
      uid: [item?.uid],
      mailBoxFolder: state.email.currentType,
      flag: 'Important',
      activationStatus: !item?.userFlags?.includes('Important'),
    };
    await actions.email.updateEmailUserFlags(data);
  }

  const handleSelectRegularEmail = uid => {

    let temp = [];

    if (selectedEmailIds.length === 0)
      setSelectedEmailIds([...selectedEmailIds, uid]);
    else {

      if (selectedEmailIds.includes(uid)) {

        let temp = [];
        temp = selectedEmailIds.filter(item => item !== uid);
        setSelectedEmailIds(temp);

      } else {

        temp.push(uid);
        setSelectedEmailIds([...selectedEmailIds, uid]);
      }
    }
  };

  const getReplyIds = (list) => {

    let modifiedList = list
    var replyIds = []

    const parseThread = (modifiedList) => {

      modifiedList.map((item) => {

        if (item.uid)
          replyIds.push(item.uid)

        parseThread(item?.referencedThreads)
      })
    }

    parseThread(modifiedList)

    return replyIds
  }
  const handleSelectThreadedEmail = (uid, referencedThreads) => {

    let replyIds = getReplyIds(referencedThreads)

    let uids = [...replyIds, uid]

    if (selectedEmailIds.includes(uid)) {

      let temp = [];
      temp = selectedEmailIds.filter(item => !uids.includes(item));
      setSelectedEmailIds(temp);

    } else
      setSelectedEmailIds([...selectedEmailIds, ...uids]);

  }
  const onLongPressItem  = (item) => {
    if (item?.referencedThreads?.length > 0) {
      handleSelectThreadedEmail(item?.uid, item?.referencedThreads)
    } else {
      handleSelectRegularEmail(item?.uid)
    }
  }

  const onPressItem = (item) => {
    if (selectedEmailIds?.length > 0) {
      if (item?.referencedThreads?.length > 0)
        handleSelectThreadedEmail(item?.uid, item?.referencedThreads)
      else
        handleSelectRegularEmail(item?.uid)
    }
    // else if (referencedThreads?.length > 0) {
    //
    //   navigation.navigate('EmailDetailsTreading', {
    //     item: {
    //       ...item,
    //       type: listType,
    //     },
    //   });
    //
    // } else {
    //
    //   navigation.navigate('EmailDetails', {
    //     emailDetails: {
    //       ...item,
    //       type: listType,
    //     },
    //   });
    // }
  }

  const handleReadEmails = async (isRead) => {
    if (selectedEmailIds?.length === 0) {
      actions.alert.showError({message: 'Please select at least an email!'});
      return false;
    }
    await actions.email.updateEmailUserFlags({
      uid: selectedEmailIds,
      activationStatus: isRead,
      flag: 'Seen',
      mailBoxFolder: 'INBOX',
      isRead: true
    });
    setSelectedEmailIds([])
  }

  const handleDeleteEmails = async () => {
    if (selectedEmailIds?.length === 0) {
      actions.alert.showError({message: 'Please select at least an email!'});
      return false;
    }
    try {
      actions.hud.show();
      await actions.email.deleteEmails({
        mailBoxFolder: state.email.currentType,
        uid: selectedEmailIds.toString()
      });
      actions.alert.showSuccess({message: 'Deleted the selected emails successfully!'});
      setSelectedEmailIds([])
    } catch (e) {
      console.log(e)
    } finally {
      actions.hud.hide();
    }
  }

  const onPressMenu = (name) => {
    if (name === 'logout') {
      actions.logout();
      props.navigation.navigate('SignIn')
    }
  }

  const handleOnScroll = ({nativeEvent}) => {
    // console.log(nativeEvent?.contentOffset?.y, 'error');
    const {y} = nativeEvent?.contentOffset;
    if (y >= -100 && y <= 100) {

      if (!state.bottomTabs)
        actions.setBottomTabs(true)

    } else if (y - scrollPosition >= 100) {

      setScrollPosition(y)
      if (state.bottomTabs)
        actions.setBottomTabs(false)

    } else if (y - scrollPosition <= -100) {

      setScrollPosition(y)
      if (!state.bottomTabs)
        actions.setBottomTabs(true)
    }
  }

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{backgroundColor: '#0F1326'}}/>
      <SafeAreaView style={{flex: 1}}>
        <Container>
          {selectedEmailIds?.length > 0 ? <Header style={{backgroundColor: '#202641'}}>
            <Left onPress={() => {
              Keyboard.dismiss();
              setSelectedEmailIds([])
            }}>
              <EmailBackArrow/>
              <QtyText>{selectedEmailIds?.length}</QtyText>
            </Left>
            <Right>
              <TouchableOpacity onPress={() => handleReadEmails(true)}>
                <EmailEye/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReadEmails(false)}>
                <EmailHideEye/>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteEmails}>
                <EmailBin/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMoveFolder(!moveFolder)}>
                <EmailPathIcon/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <EmailAddFolderIcon/>
              </TouchableOpacity>
            </Right>
          </Header> : <Header style={{paddingVertical: 0, paddingHorizontal: 0}}>
            <Row style={{flex: 1}}>
              <TouchableOpacity style={{paddingVertical: 14, paddingHorizontal: 10}} onPress={() => props.navigation.openDrawer()}>
                <NavBarIcon/>
              </TouchableOpacity>
              <Search style={{marginLeft: 25, marginRight: 12}}/>
              <SearchInput value={keyword} onChangeText={setKeyword}  placeholder={'Search in mail'} placeholderTextColor={'rgba(255, 255, 255, .67)'}/>
            </Row>
            <Profile style={{marginHorizontal: 10, }} onPress={() => setOpen(!isOpen)}>
              {/*<UserLogo width={35} height={35}/>*/}
              <ProfilePic userName={state.currentUser?.userName}/>
            </Profile>
            <Dropdown isOpen={isOpen} top={41} right={0} onPress={onPressMenu}/>
          </Header>}
          <Body>
            <FlatList
              onScroll={handleOnScroll}
              scrollEventThrottle={Platform.OS === 'ios' ? 40 : 1}
              data={state.email.emails[state.email.currentType]?.emails || []}
              bounces={true}
              keyExtractor={(_, index) => index?.toString()}
              renderItem={({item, index}) =>
                <EmailItem
                  {...item}
                  starredEmail={() => starredEmail(item)}
                  onLongPressItem={() => onLongPressItem(item)}
                  onPressItem={() => onPressItem(item)}
                  selectedEmailIds={selectedEmailIds}
                />}
              style={{flex: 1, paddingTop: 10}}
              ListEmptyComponent={() => !isLoading ? <Empty><EmptyText>No emails found</EmptyText></Empty>: null}
              ListFooterComponent={() => {
                return (
                  <View style={{ marginBottom: 20 }}>
                    {isLoading && (
                      <ActivityIndicator size={'small'} color={'white'} />
                    )}
                  </View>
                );
              }}
              onEndReached={async () => {
                console.log('onEndReached', state.email.emails[state.email.currentType].totalCount, state.email.emails[state.email.currentType].emails?.length);
                if (isLoading) return false;
                if (state.email.emails[state.email.currentType].totalCount > state.email.emails[state.email.currentType].emails?.length) {
                  actions.email.onChangePage(state.email.emails[state.email.currentType]?.page + 1);
                  await getEmails();
                }
                // emailsList?.length >= 50 &&
                // loadEmails(emailFilers?.pageNumber + 1, true);
              }}
              onEndReachedThreshold={0.1}
              refreshControl={
                <RefreshControl
                  tintColor={'white'}
                  refreshing={refreshing}
                  onRefresh={async () => {
                    actions.email.onChangePage(1);
                    await getEmails();
                  }}
                />
              }
            />
          </Body>
          <ComposeBtn>
            <Feather width={height(4.7)}
                     height={height(4.7)}/>
          </ComposeBtn>
          <MoveFolder
            isOpen={moveFolder}
            closeModal={() => setMoveFolder(false)}
            selectedEmailIds={selectedEmailIds}
            onRefresh={async () => {
              setSelectedEmailIds([]);
              actions.email.onChangePage(1);
              await getEmails();
            }}
          />
          <CreateFolder
            isOpen={modalVisible}
            closeModal={() => setModalVisible(false)}
            selectedEmailIds={selectedEmailIds}
            onRefresh={async () => {
              setSelectedEmailIds([]);
              actions.email.onChangePage(1);
              await getEmails();
            }}
          />
        </Container>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: '#0F1326'}}/>
    </View>
  );
};

export default Email;

const ComposeBtn = styled.TouchableOpacity`
  width: ${height(7.4)};
  height: ${height(7.4)};
  position: absolute;
  bottom: 20px; right: 25px;
  border-radius: ${height(7.4)};
  background-color: #266CD5;
  ${Styles.center}
`

const Profile = styled.TouchableOpacity`
  width: 35px; height: 35px;
  border-radius: 20px;
  ${Styles.center};
  background-color: #202641;
  border-width: 3px;
  border-color: darkgreen;
`

const EmptyText = styled(MainSemiBoldFont)`
  color: gray;
  font-size: 20px;
`

const Empty = styled.View`
  ${Styles.center};
  flex: 1;
`

const SearchInput = styled.TextInput`
  color: white;
  font-family: Rubik-Regular;
  padding-vertical: 0px;
  flex: 1;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Body = styled.View`
  padding-top: 3px;
  flex: 1;
`

const Right = styled.View`
  flex-direction: row;
  ${Styles.between_center};
  flex-grow: 1;
  margin-left: 15%;
`;

const QtyText = styled(MainBoldFont)`
  font-size: 14px;
  color: #D4DAE5;
  margin-left: 4px;
`;

const Left = styled.TouchableOpacity`
  ${Styles.start_center};
  flex-direction: row;
`;

const Header = styled.View`
  flex-direction: row;
  ${Styles.between_center};
  background-color: rgba(23, 65, 128, 1);
  border-radius: 10px;
  margin-top: 10px;
  margin-horizontal: 16px;
  padding-vertical: 10px;
  padding-horizontal: 22px;
  z-index: 10;
`;

const Container = styled.View`
  background-color: #0F1326;
  flex: 1;
`;
