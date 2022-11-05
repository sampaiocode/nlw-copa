import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'JohnMax XXX',
      email: 'xxx.johnmax123@gmail.com',
      avatarUrl: 'https://github.com/sampaiocode.png'
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'MAXBOOL',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-07T12:20:00.371Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'DE'
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-18T15:20:00.371Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });
}

main();
