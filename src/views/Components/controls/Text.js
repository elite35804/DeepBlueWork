import { Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { themeProp as theme } from '@/utils/CssUtil';

export const StyledText = styled.Text`
  ${props => props.theme.font ? `font-family: ${props.theme.font};` : ''}
  color: ${props => props.theme.colorText};
`;

/**
 * Define most commonly used components here.
 */

export const MainBoldFont = styled.Text`
  font-family: Rubik-Bold;
`

export const MainRegularFont = styled.Text`
  font-family: Rubik-Regular;
`

export const MainLightFont = styled.Text`
  font-family: Rubik-Light;
`

export const MainSemiBoldFont = styled.Text`
  font-family: Rubik-SemiBold;
`

export const MainMediumFont = styled.Text`
  font-family: Rubik-Medium;
`
