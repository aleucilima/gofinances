import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary };

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular };
  color: ${({ theme }) => theme.colors.shape };
  font-size: ${RFValue(18)}px;
`;

export const Content = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + RFValue(30),
  }
})`
  flex: 1;
  padding: 24px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;