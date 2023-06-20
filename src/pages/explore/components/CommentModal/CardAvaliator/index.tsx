import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, X } from 'phosphor-react'

import { ProfileImage } from '~/components/ProfileImage'
import { Heading, Text } from '~/components/texts'
import { Dialog, DialogOptions } from '~/components/Dialog'
import { TextArea } from '~/components/TextArea'
import { Button } from '~/components/Button'
import { RATE_OPTIONS, RateOption, RateAvaliator } from './RateAvaliator'

import { ActionsRow, Container, Header } from './styles'

const avaliationFormSchema = z.object({
  rate: z
    .number()
    .min(0, { message: 'Rate must be between 0 and 5.' })
    .max(5, { message: 'Rate must be between 0 and 5.' })
    .refine((val) => RATE_OPTIONS.includes(val as RateOption), {
      message: 'Rate must be one of the valid options.',
    }),
  description: z.string().nonempty('Campo obrigatório.'),
})

type AvaliationFormType = z.infer<typeof avaliationFormSchema>

type CardAvaliatorProps = {
  onCancelAvaliation: () => void
}

export const CardAvaliator: FC<CardAvaliatorProps> = ({
  onCancelAvaliation,
}) => {
  const user = {
    avatar_url: 'https://github.com/luiz504.png',
    name: 'Luiz Bueno',
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AvaliationFormType>({
    resolver: zodResolver(avaliationFormSchema),
    defaultValues: {
      rate: 0,
    },
  })
  const [confirmRateDialogOpen, setConfirmRateDialogOpen] = useState(false)

  const dialogOptions: DialogOptions = {
    title: 'Alerta',
    description:
      'Avaliacao com valor igual a ZERO, deseja continuar com este valor?',
    confirmButtonText: 'Sim',
    closeButtonText: 'Não',
  }

  const onSubmit = async (
    data: AvaliationFormType,
    source: 'form' | 'dialog',
  ) => {
    if (source === 'form' && data.rate === 0) {
      setConfirmRateDialogOpen(true)
      return
    }
    const sleep = (time = 5000) =>
      new Promise((resolve, reject) => setTimeout(() => resolve('ff'), time))

    await sleep()
  }

  return (
    <>
      <Container
        onSubmit={handleSubmit((onValid) => onSubmit(onValid, 'form'))}
      >
        <Header>
          <ProfileImage src={user.avatar_url} alt="User Avatar Profile Image" />
          <Heading size="sm">{user.name}</Heading>
          <Controller
            name="rate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RateAvaliator
                value={value}
                onSelectRate={onChange}
                disabled={isSubmitting}
              />
            )}
          />
        </Header>

        {errors.rate && <Text size={'sm'}>{errors.rate.message}</Text>}

        <TextArea
          placeholder="Escreva a sua avaliação"
          caracterCounter={0}
          maxLength={450}
          {...register('description')}
          disabled={isSubmitting}
        />

        {errors.description && (
          <Text size={'sm'} css={{ color: '$red300' }}>
            {errors.description.message}
          </Text>
        )}

        <ActionsRow>
          <Button
            variant={'terceary'}
            disabled={isSubmitting}
            loading={isSubmitting}
            onClick={onCancelAvaliation}
          >
            <X size="24" className="icon-x" />
          </Button>

          <Button
            type="submit"
            variant={'terceary'}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            <Check size="24" className="icon-check" />
          </Button>
        </ActionsRow>
      </Container>

      {confirmRateDialogOpen && (
        <Dialog
          open={confirmRateDialogOpen}
          onOpenChange={(value) => setConfirmRateDialogOpen(value)}
          onConfirm={() => {
            setConfirmRateDialogOpen(false)

            handleSubmit((onValid) => onSubmit(onValid, 'dialog'))()
          }}
          {...dialogOptions}
        />
      )}
    </>
  )
}
