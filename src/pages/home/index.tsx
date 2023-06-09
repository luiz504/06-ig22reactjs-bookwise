import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

import IconGoogle from '~/assets/google-icon.svg'
import IconGithub from '~/assets/github-fill-icon.svg'
import IconRocket from '~/assets/rocket-icon.svg'
import logoFull from '~/assets/logo-full.png'
import previewImg from '~/assets/preview.png'

import { Heading, Text } from '~/components/texts'

import { BoxHero, Container, Hero, Preview, SignInOption } from './styles'

import { buildAuthOptions } from '../api/auth/[...nextauth].api'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <NextSeo
        title="Welcome to BookWise"
        description="BookWise é uma aplicacão web para avalição e gerencimento de leituras"
      />

      <Container>
        <Preview>
          <Image
            src={previewImg}
            className="preview"
            alt="Uma imagem de uma pessoa reclinada em um sofá, imersa em um livro e lendo com uma expressão serena"
          />{' '}
          <Image
            src={logoFull}
            alt="Bookwise logo"
            height={58}
            className="logo"
          />
        </Preview>

        <Hero>
          <BoxHero>
            <Heading as="h1" size="lg">
              Boas vindas!
            </Heading>
            <Text>Faça seu login ou acesse como visitante.</Text>

            <section>
              <SignInOption as="button" onClick={() => signIn('google')}>
                <IconGoogle />

                <Heading>Entrar com Google</Heading>
              </SignInOption>

              <SignInOption as="button" onClick={() => signIn('github')}>
                <IconGithub />

                <Heading>Entrar com Github</Heading>
              </SignInOption>

              <SignInOption as="button" onClick={() => router.push('/start')}>
                <IconRocket />

                <Heading>Acessar como visitante</Heading>
              </SignInOption>
            </section>
          </BoxHero>
        </Hero>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, buildAuthOptions(req, res))

  if (session) {
    return {
      redirect: {
        destination: '/start',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
