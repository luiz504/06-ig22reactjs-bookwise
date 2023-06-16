import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'

import IconGoogle from '~/assets/google-icon.svg'
import IconGithub from '~/assets/github-fill-icon.svg'
import iconRocket from '~/assets/rocket-icon.svg'
import logoFull from '~/assets/logo-full.png'
import previewImg from '~/assets/preview.png'

import { Heading, Text } from '~/components/texts'

import { BoxHero, Container, Hero, Preview, SignInOption } from './styles'

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
              <SignInOption as="button">
                <Image src={IconGoogle} alt="Google logo" />

                <Text size="lg">Entrar com Google</Text>
              </SignInOption>

              <SignInOption as="button">
                <Image src={IconGithub} alt="Github logo" />

                <Text size="lg">Entrar com Github</Text>
              </SignInOption>

              <SignInOption as="button" onClick={() => router.push('/start')}>
                <Image src={iconRocket} alt="Rocket icon" />

                <Text size="lg">Acessar como visitante</Text>
              </SignInOption>
            </section>
          </BoxHero>
        </Hero>
      </Container>
    </>
  )
}
