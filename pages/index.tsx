import { NextPage } from 'next';
import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';
import FirebaseClient from '@/models/firebase_client';

const provider = new GoogleAuthProvider();

const IndexPage: NextPage = function () {
  return (
    <ServiceLayout title="test">
      <Box maxW="md" mx="auto">
        <img src="/main_logo.svg" alt="메인 로고" />
        <Flex justify="center">
          <Heading> #Blind</Heading>
        </Flex>
      </Box>
      <Center mt="20">
        <GoogleLoginButton
          onClick={() => {
            signInWithPopup(FirebaseClient.getInstance().Auth, provider)
              .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const { user } = result;
                console.log(result.user);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                const { email } = error.customData;

                const credential = GoogleAuthProvider.credentialFromError(error);
              });
          }}
        />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
