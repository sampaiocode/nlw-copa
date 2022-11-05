import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

import Image from 'next/image';
import Head from 'next/head';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import { GetStaticProps } from 'next';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      setPoolTitle('');
      alert('Bolão criando com sucesso, o código foi copiado para a área de transferência!');
    } catch (err) {
      console.log(err);
      alert('Falha ao criar o bolão');
    }
  }

  return (
    <>
      <Head>
        <title>Home | NLW Copa</title>
      </Head>

      <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
        <main className="max-w-[490px]">
          <Image src={logoImg} alt="Logo do NLW Copa" />

          <h1 className="text-white font-bold text-5xl leading-tight mt-14">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarExampleImg} alt="" />

            <strong className="text-xl text-gray-100">
              <span className="text-green-500">+{props.userCount}</span> pessoas já estão usando
            </strong>
          </div>

          <form onSubmit={createPool} className="mt-10 flex gap-2">
            <input
              type="text"
              required
              placeholder="Qual nome do seu bolão?"
              className="bg-gray-800 text-gray-100 border border-gray-600 text-sm px-6 py-4 rounded flex-1"
              onChange={e => setPoolTitle(e.target.value)}
              value={poolTitle}
            />
            <button
              type="submit"
              className="bg-yellow-500 text-gray-900 text-sm font-bold uppercase px-6 py-4 rounded hover:bg-yellow-700"
            >
              Criar meu bolão
            </button>
          </form>

          <p className="max-w-[400px] text-sm text-gray-300 leading-relaxed mt-4">
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras
            pessoas 🚀
          </p>

          <div className="mt-10 pt-10 text-gray-100 border-t border-gray-600 flex justify-between">
            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+{props.poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className="w-px h-14 bg-gray-600" />

            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">+{props.guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>

        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia da aplicação movél do NLW Copa"
          quality={100}
        />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    },
    revalidate: 900
  };
};
