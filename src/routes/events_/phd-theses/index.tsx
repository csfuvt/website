import { KBanner } from '../../-components/KBanner/KBanner.tsx'
import styles from './PhdThesisPage.module.css'
import axios from 'axios'
import { PhdThesis } from './-phd-thesis.model.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Modal, Space, Spin } from 'antd'
import { isEmpty } from 'lodash-es'
import { createFileRoute } from '@tanstack/react-router'
import { KAddButton } from '../../-components/KAddButton/KAddButton.tsx'
import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth.ts'
import { toast } from 'react-toastify'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import KPhdThesisCard from '../../-components/KPhdThesisCard/KPhdThesisCard.tsx'

export interface PhdThesisForm {
  title: string
  candidate: string
  leader: string
  organizers: string
  meetingDate: string
  councilMembers: string
  thesisSummary: string
  links: string
}

const addPhdThesis = ({
  title,
  candidate,
  leader,
  organizers,
  meetingDate,
  councilMembers,
  thesisSummary,
  links,
}: PhdThesisForm) => {
  return axios
    .post<PhdThesis>(`/phd-thesis`, {
      title,
      candidate,
      leader,
      organizers,
      meetingDate,
      councilMembers,
      thesisSummary,
      links,
    })
    .then((res) => res.data)
}

const getPhdThesis = () =>
  axios.get<PhdThesis[]>('/phd-thesis').then((res) => res.data.reverse())

const PhdThesisPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isLoggedIn } = useAuth()

  const {
    data: phdThesis,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['phd-thesis'],
    queryFn: getPhdThesis,
  })

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<PhdThesisForm>({
    defaultValues: {
      title: '',
      candidate: '',
      leader: '',
      organizers: '',
      meetingDate: '',
      councilMembers: '',
      thesisSummary: '',
      links: '',
    },
  })

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const resetForm = () => {
    reset()
  }

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: addPhdThesis,
    onError: () => toast.error('Nu s-a putut adăuga teza de doctorat!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['phd-thesis'] })
      setIsModalOpen(false)
      resetForm()
      toast.success('Teza de doctorat a fost adăugată cu succes.')
    },
  })

  const onSubmit: SubmitHandler<PhdThesisForm> = (data) => {
    mutate(data)
  }

  return (
    <div className={styles.page}>
      <KBanner label="SUSȚINERI DE TEZE DOCTORALE" />
      <div className={styles.section}>
        <div className={styles.cardsContainer}>
          {isLoggedIn && (
            <KAddButton className={'position'} onClick={showModal} />
          )}
          <Modal
            title="Creează o teză de doctorat"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Renunță
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isPending}
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
              >
                Salvează
              </Button>,
            ]}
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
            >
              <Controller
                name="title"
                control={control}
                rules={{
                  required: 'Titlul tezei de doctorat este un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.title ? 'error' : ''}
                    placeholder={
                      errors.title?.message ?? 'Titlul tezei de doctorat'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="candidate"
                control={control}
                rules={{
                  required: 'Doctorandul tezei este un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.candidate ? 'error' : ''}
                    placeholder={
                      errors.candidate?.message ?? 'Doctorandul tezei'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="leader"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.leader ? 'error' : ''}
                    placeholder={
                      errors.leader?.message ?? 'Coordonatorul tezei'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="organizers"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.organizers ? 'error' : ''}
                    placeholder={errors.organizers?.message ?? 'Organizatori'}
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="meetingDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.meetingDate ? 'error' : ''}
                    placeholder={
                      errors.meetingDate?.message ?? 'Data susținerii'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="councilMembers"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.councilMembers ? 'error' : ''}
                    placeholder={
                      errors.councilMembers?.message ?? 'Membri comisiei'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="thesisSummary"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.thesisSummary ? 'error' : ''}
                    placeholder={
                      errors.thesisSummary?.message ??
                      'Rezumatul tezei de doctorat'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="links"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input.TextArea
                    status={errors.links ? 'error' : ''}
                    placeholder={errors.links?.message ?? 'Link-uri'}
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
            </Space>
          </Modal>
          <div className="flex">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <span>
                Tezele de doctorat nu pot fi afișate momentan. Reveniți mai
                târziu!
              </span>
            ) : isEmpty(phdThesis) ? (
              <div className="flex">
                <span>Nu există teze de doctorat momentan.</span>
              </div>
            ) : (
              phdThesis?.map((PhdThesis) => {
                return (
                  <KPhdThesisCard
                    key={PhdThesis.id}
                    id={PhdThesis.id}
                    title={PhdThesis.title}
                    candidate={PhdThesis.candidate}
                    leader={PhdThesis.leader}
                    organizers={PhdThesis.organizers}
                    meetingDate={PhdThesis.meetingDate}
                    councilMembers={PhdThesis.councilMembers}
                    thesisSummary={PhdThesis.thesisSummary}
                    links={PhdThesis.links}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/events_/phd-theses/')({
  component: PhdThesisPage,
})

export default PhdThesisPage
