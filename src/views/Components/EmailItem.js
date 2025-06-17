import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import {MainBoldFont, MainRegularFont, MainSemiBoldFont} from '@/views/Components/controls/Text';
import {Colors, Styles} from '@/styles';
import {Images} from '@/styles/Images';
import RowCheck from '@/assets/images/RowCheck.svg';
import UseDisk from '@/assets/images/UseDisk.svg';
import WhiteStar from '@/assets/images/whiteStar.svg';
import YellowStar from '@/assets/images/YellowStar.svg';
import Attachment from '@/assets/images/attachment.svg';
import moment from 'moment';
import colors from '@/styles/Colors';
import ProfilePic from '@/views/Components/ProfilePic';
import {useOvermind} from '@/store';
import {height, totalSize} from 'react-native-dimension';

const getMinutesPassed = (date) => {
  try {

    // const utcMoment = moment.utc();
    // const utcDate = moment(new Date(utcMoment.format()));
    const now = moment(new Date()); //todays date

    // console.log(date, 'datem now', now);
    const duration = moment.duration(now.diff(date));
    return duration.asMinutes();
  } catch (error) {
    console.error('getMinutesPassed error===>', error);
  }
};
const getReplyTime = (userFlags, sentDate = '2022-10-15T06:53:25.000+00:00') => {
  const styledAvatarIndex = userFlags?.findIndex(flag => flag?.includes('reply_'));
  if (styledAvatarIndex > -1) {
    const flag = userFlags[styledAvatarIndex]?.split('_');
    if (flag.length > 0) {
      const hours = flag[1];
      const minutes = hours * 60;
      const diff = getMinutesPassed(sentDate);
      const timeLeft = minutes - diff;
      const percentage = timeLeft / minutes;
      let color = 'red';
      if (percentage < 0) {
        color = 'red';
      } else if (percentage <= 0.25) {
        color = 'red';
      } else if (percentage <= 0.75) {
        color = 'yellow';
      } else if (percentage <= 1) {
        color = 'green';
      }
      return {
        color,
        progress: percentage < 0 ? 0 : percentage,
      };
    }
  }
  return null;
};

const getRepliesCount = (list) => {
  let modifiedList = list;
  let totalReplies = 1;
  const parseThread = (modifiedList) => {
    modifiedList.map((item) => {
      totalReplies = totalReplies + 1;
      parseThread(item?.referencedThreads);
    });
  };
  parseThread(modifiedList);
  return totalReplies;
};

const getAvatarStyle = (userFlags) => {
  const styledAvatarIndex = userFlags?.findIndex(flag => flag?.includes('avatar_'));
  if (styledAvatarIndex > -1) {
    const flag = userFlags[styledAvatarIndex]?.split('_');
    if (flag.length > 0) {
      return flag[1];
    }
  }
  return Colors.darkBlue;
};

const timeSpecific = dateTime => {
  if (!dateTime) {
    return '--';
  }
  const momentDateTime = moment(dateTime);
  const date = moment(moment(dateTime).format('YYYY-MM-DD'));
  const dateToday = moment(moment().format('YYYY-MM-DD'));
  const diff = dateToday.diff(date, 'days');
  if (diff < 1) {
    return momentDateTime.format('h:mm a');
  } else if (diff === 1) {
    return `Yesterday ${momentDateTime.format('h:mm a')}`;
  } else if (diff > 1 && diff < 8) {
    return `${momentDateTime.format('dddd')} ${momentDateTime.format(
      'h:mm a',
    )}`;
  } else if (diff >= 8) {
    return momentDateTime.format('DD MMM, h:mm a');
  }
};
const EmailItem = ({
                     attachments,
                     body,
                     ccList,
                     hasAttachment,
                     messageNumber,
                     quotedText,
                     referencedThreads,
                     sender,
                     sentDate,
                     subject,
                     systemFlags,
                     toRecipients,
                     uid,
                     userFlags,
                     selectedEmailIds,
                     ...props
                   }) => {
  const {state, actions} = useOvermind();
  const getEmailTitle = (sender, toRecipients) => {
    let title = sender;
    if (sender === state.currentUser?.userName) {
      title = toRecipients.toString();
    }
    const titleArr = title?.split('<');
    if (titleArr?.length > 1) {
      title = titleArr[0];
      title = title.replace(/"/g, '');
    }
    return title;
  };
  const replyProgress = getReplyTime(userFlags, sentDate);
  let showBadge = (referencedThreads && referencedThreads?.length > 0);

  return (<ItemContainer isSelected={selectedEmailIds.includes(uid)} onLongPress={props.onLongPressItem}
                         onPress={props.onPressItem}>
    {selectedEmailIds.includes(uid) ?
      <RowCheck width={55} height={55}/> :
      <ProfileView style={{backgroundColor: getAvatarStyle(userFlags)}}>
        <ProfilePic userName={sender} userFlags={userFlags} toRecipients={toRecipients}/>
      </ProfileView>}
    {showBadge ? <Badge>
      <BadgeText>{getRepliesCount(referencedThreads)}</BadgeText>
    </Badge> : null}
    <Body>
      <BHeader>
        <Title style={{color: systemFlags?.includes('/Seen') ? '#8491a5' : '#faf2f4'}} numberOfLines={1}
               ellipsizeMode="tail">{getEmailTitle(sender, toRecipients)}</Title>
        <Time>
          <TimeText
            style={{fontSize: timeSpecific(sentDate).startsWith('Yes') ? totalSize(1.1) : totalSize(1.2)}}>{timeSpecific(sentDate)}</TimeText>
          <TouchableOpacity onPress={props.starredEmail}>
            {userFlags?.includes('Important') ? (
              <YellowStar width={height(2.2)} height={height(2.2)}/>
            ) : (
              <WhiteStar width={height(2.2)} height={height(2.2)}/>
            )}
          </TouchableOpacity>
        </Time>
      </BHeader>
      <BBody>
        <Desc style={{color: systemFlags?.includes('/Seen') ? '#8491a5' : '#faf2f4'}} numberOfLines={1}
              ellipsizeMode="tail">{subject}</Desc>
        <Row>
          {replyProgress ? <Progress style={{backgroundColor: replyProgress?.color}}>
            <ProgressLine style={{backgroundColor: 'white', width: 45 * replyProgress?.progress}}/>
          </Progress> : null}
          {hasAttachment ? <Attachment width={20} height={15}/> : <View style={{width: 20}}/>}
        </Row>
      </BBody>
    </Body>
  </ItemContainer>);
};

export default EmailItem;

const ProfileView = styled.View`
  width: 55px;
  height: 55px;
  border-radius: 30px;
  ${Styles.center}
`;

const BadgeText = styled(MainRegularFont)`
  color: black;
  font-size: 12px;
`;

const Badge = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: white;
  ${Styles.center};
  position: absolute;
  top: 8px;
  left: 55px;
`;

const ProgressLine = styled.View`
  position: absolute;
  right: 0;
  width: 20px;
  height: 6px;
  border-radius: 10px;
`;

const Progress = styled.View`
  width: 45px;
  height: 6px;
  border-radius: 10px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  ${Styles.start_center};
`;

const Desc = styled(MainRegularFont)`
  color: white;
  padding-right: 5px;
  flex: 1;
`;

const TimeText = styled(MainRegularFont)`
  color: #0EAF29;
  font-size: 12px;
  margin-right: 7px;
`;

const Time = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled(MainRegularFont)`
  font-size: 18px;
  color: #F1F2F4;
  flex: 1;
`;

const BHeader = styled.View`
  flex-direction: row;
  ${Styles.between_center};
  flex-grow: 1;
`;

const BBody = styled.View`
  flex-direction: row;
  ${Styles.between_center};
  flex-shrink: 1;
  flex-grow: 1;
`;

const Body = styled.View`
  padding-left: 2%;
  flex: 1;
`;

const ItemContainer = styled.TouchableOpacity`
  padding-vertical: 12px;
  padding-horizontal: 15px;
  ${Styles.start_center};
  flex-direction: row;
  width: ${Dimensions.get('window').width}px;
  background-color: ${props => props.isSelected ? 'rgba(38, 108, 213, 0.4)' : 'transparent'};
  border-bottom-width: 1px;
  border-bottom-color: #0f1326;
`;
