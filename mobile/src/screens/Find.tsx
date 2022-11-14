import { useState } from 'react';
import { Heading, useToast, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código!',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      await api.post('/pools/join', { code });

      toast.show({
        title: 'Bolão encontrado!',
        placement: 'top',
        bgColor: 'green.500'
      });

      navigate('pools');
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === 'Pool not found') {
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      if (error.response?.data?.message === 'You alredy joined this pool') {
        return toast.show({
          title: 'Você já está nesse!',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      toast.show({
        title: 'Não foi impossível encontrar o bolão!',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading color="white" fontSize="xl" fontFamily="heading" textAlign="center" mb={8}>
          Encontre um bolão atráves de {'\n'} seu código único
        </Heading>

        <Input
          placeholder="Qual o código do bolão?"
          mb={2}
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button title="BUSCAR O BOLÃO" isLoading={isLoading} onPress={handleJoinPool} />
      </VStack>
    </VStack>
  );
}
