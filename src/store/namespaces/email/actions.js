import axios from '@/utils/axios';
import {rearrangeFilters} from '@/utils/Utils';
import {json} from 'overmind';
import {get} from 'lodash'
import * as Storage from '@/utils/AsyncStorage';

/*
*
*/

export const getEmails = async ({state}, data) => {
  let url = `/user/mailbox/emails${rearrangeFilters(data)}`;
  console.log(url, 'url')
  let res = await axios.get(url, {
    headers: {'Content-Type': 'application/json'},
    access_token: state?.access_token
  });
  console.log(res?.data?.emails, 'emails');
  if (state.email.emails[state.email.currentType].page === 1) {
    if (state.email.emails[state.email.currentType].emails?.length > 0) {
      const items = json(state.email.emails[state.email.currentType].emails)?.slice(state.email.emailPerPage);
      state.email.emails[state.email.currentType].emails = [...res?.data?.emails, ...items]
    } else {
      state.email.emails[state.email.currentType].emails = res?.data?.emails;
    }

  } else {
    state.email.emails[state.email.currentType].emails = [...state.email.emails[state.email.currentType].emails, ...res?.data?.emails];
  }
  state.email.emails[state.email.currentType].totalCount = res?.data?.size;
}

export const deleteEmails = async ({state}, data) => {
  const ids = data.uid?.split(',');
  ids.map(id => {
    const index = state.email.emails[state.email.currentType].emails.findIndex(e => e.uid === parseInt(id));
    state.email.emails[state.email.currentType].emails.splice(index, 1)
  })
  let url = `/user/mailbox/emails${rearrangeFilters(data)}`;
  console.log(url, 'url')
  let res = await axios.delete(url, {
    headers: {'Content-Type': 'application/json'},
    access_token: state?.access_token
  });
  console.log(res, 'res')
}

export const moveEmailToFolder = async ({state}, data) => {
  let url = `/user/mailbox/emails/changeFolder${rearrangeFilters(data)}`;
  console.log(url, 'url')
  let res = await axios.put(url, data, {
    access_token: state?.access_token
  });
  console.log(res, 'res')
}

export const createEmailToFolder = async ({state}, data) => {
  let url = `/user/mailbox/createFolder`;
  console.log(url, 'url')
  let res = await axios.post(url, data, {
    access_token: state?.access_token
  });
  console.log(res, 'res')
}

export const getAllFolders = async ({state}) => {
  try {
    let items = JSON.parse(await Storage.getObject('email_all_folders'));
    console.log(items, 'items')
    // state.email.folders = items;
    // if (items) {
    let res = await axios.get(`/user/mailbox/getAllFolders`, {
      headers: {
        'Content-Type': 'application/json',
      },
      access_token: state?.access_token
    });
    console.log(res, 'getAllFolders');
    items = res?.data;
    state.email.currentType = items?.find(d => d?.toLowerCase() === 'inbox');
    // }

    state.email.folders = items;
    const emails = {}
    items?.map(d => {
      emails[d] = {
        emails: [],
        page: 1,
        totalCount: 0,
      }
    })
    state.email.emails = emails;
    await Storage.putObject('email_all_folders', JSON.stringify(items))
  } catch (e) {
    console.log(e)
  }
}

export const setType = async({state}, currentType) => {
  state.email.currentType = currentType;
}

export const onChangePage = async({state}, page) => {
  state.email.emails[state.email.currentType].page = page;
}

export const updateEmailUserFlags = async ({state, actions}, data) => {
  try {
    if (!data?.isRead) {
      const items = json({...state.email.emails[state.email.currentType]}).emails;
      console.log(items, 'items')
      const index = items.findIndex(e => e.uid === data.uid[0])
      const item = items[index];
      console.log(item, 'item')
      const i = item?.userFlags?.findIndex(f => f === 'Important');
      if (i > -1) {
        item?.userFlags?.splice(i, 1)
      } else {
        const flags = item?.userFlags || []
        flags.push('Important');
        item.userFlags = flags;
      }
      console.log(item, 'updateItem')
      state.email.emails[state.email.currentType].emails = [...items];
    } else {
      const items = json({...state.email.emails[state.email.currentType]}).emails;
      data?.uid?.map(id => {
        console.log(id, 'id', items)
        const index = items.findIndex(e => e.uid === id)
        const item = items[index];
        console.log(item, 'item')
        const i = item?.systemFlags?.findIndex(f => f === '/Seen');
        if (data?.activationStatus) {
          if (i > -1) {
          } else {
            const flags = item?.systemFlags || []
            flags.push('/Seen');
            item.systemFlags = flags;
          }
        } else {
          if (i > -1) {
            item?.systemFlags?.splice(i, 1)
          } else {
          }
        }
        console.log(item, 'updateItem')
      })
      state.email.emails[state.email.currentType].emails = [...items];
    }
    // if (data.isRead) delete data.isRead;
    const res = await axios.put('/user/mailbox/flag/email', data, {access_token: state?.access_token});
    actions.alert.showSuccess({message: 'Updated successfully!'})
    console.log(res, 'res')
  } catch (e) {
    console.log(e)
  }
}
