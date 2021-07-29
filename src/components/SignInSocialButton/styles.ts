import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;

  background-color: ${({theme}) => theme.colors.shape};

  flex-direction: row;
  align-items: center;

  border-radius: 5px;

  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-color: ${({theme}) => theme.colors.background};
  border-right-width: 1px;
  border-style: solid;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
`;
