import { Heading, VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Find() {
  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading color="white" fontSize="xl" fontFamily="heading" textAlign="center" mb={8}>
          Encontre um bolão atráves de {'\n'} seu código único
        </Heading>

        <Input placeholder="Qual o código do bolão?" mb={2} />
        <Button title="BUSCAR O BOLÃO" />
      </VStack>
    </VStack>
  );
}
