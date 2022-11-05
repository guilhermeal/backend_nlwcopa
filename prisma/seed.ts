import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Chuck Norris',
      email: 'chuck.norris@gmail.com',
      avatarUrl: 'https://github.com/chucknorris.png',
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Example Poll 1',
      code: 'BOL123',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-08T16:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'DE',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-10T14:30:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              }
            }
          }
        }
      }
    }
  })

}

main()