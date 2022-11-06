import { Heading, VStack, Text } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import Logo from '../assets/logo.svg';

export function New() {
  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading color="white" fontSize="xl" fontFamily="heading" textAlign="center" my={8}>
          Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
        </Heading>

        <Input placeholder="Qual nome do seu bolão?" mb={2} />
        <Button title="CRIAR MEU BOLÃO" />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá {'\n'} um código único que poderá usar para {'\n'}{' '}
          convidar outras pesssoas.
        </Text>
      </VStack>
    </VStack>
  );
}
