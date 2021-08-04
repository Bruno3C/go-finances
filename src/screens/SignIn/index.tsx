import React from 'react';

import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';
import { ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { Platform } from 'react-native';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { 
    signInWithGoogle,
    signInWithApple
  } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.error('login with google', error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.error('login with apple', error);
      Alert.alert('Não foi possível conectar a conta Apple');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>

          <SignInTitle>
            Faça seu login com {'\n'}
            uma das contas abaixo 
          </SignInTitle>
        </TitleWrapper>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          { 
            Platform.OS === 'ios' &&
            <SignInSocialButton 
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          }
        </FooterWrapper>
        {
          isLoading &&
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        }
      </Footer>
    </Container>
  );
}