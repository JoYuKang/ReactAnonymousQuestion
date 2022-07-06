import { NextPage } from 'next';
import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';
import FirebaseClient from '@/models/firebase_client';

const provider = new GoogleAuthProvider();

console.log(process.env.publicApiKey); //YOU_API_KEY
console.log(process.env.FIREBASE_AUTH_HOST); //undefind
console.log(process.env.projectId); //projectId
//console.log(process.env.privateKey); //projectId

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
                console.log(result.user);
              })
              .catch((error) => {});
          }}
        />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
