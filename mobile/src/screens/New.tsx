import { useState } from 'react';
import { Heading, VStack, Text, useToast } from 'native-base';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import Logo from '../assets/logo.svg';

export function New() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão!',
        placement: 'top',
        bgColor: 'red.500'
      });
    }

    try {
      setIsLoading(true);

      await api.post('/pools', {
        title
      });

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      });

      setTitle('');
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível criar o bolão!',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading color="white" fontSize="xl" fontFamily="heading" textAlign="center" my={8}>
          Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
        </Heading>

        <Input placeholder="Qual nome do seu bolão?" mb={2} onChangeText={setTitle} value={title} />
        <Button title="CRIAR MEU BOLÃO" onPress={handlePoolCreate} isLoading={isLoading} />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá {'\n'} um código único que poderá usar para {'\n'}{' '}
          convidar outras pesssoas.
        </Text>
      </VStack>
    </VStack>
  );
}
