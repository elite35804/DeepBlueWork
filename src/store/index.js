import { merge, namespaced } from 'overmind/config';
import { createHook } from 'overmind-react';
import { state } from './state'
import * as actions from './actions';

// common
import * as alert from '@/store/namespaces/alert';
import * as hud from '@/store/namespaces/hud';
import * as email from '@/store/namespaces/email'

export const config = merge(
  {
    state,
    actions
  },
  namespaced({
    alert,
    hud,
    email,
  })
)

export const useOvermind = createHook();
