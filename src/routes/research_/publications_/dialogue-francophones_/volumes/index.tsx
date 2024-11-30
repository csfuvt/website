import { KBanner } from '../../../../-components/KBanner/KBanner'
import { KVolumeCard } from '../../../../-components/KVolumeCard/KVolumeCard'
import styles from './VolumePage.module.css'
import axios from 'axios'
import { Volume } from './-volumes.model.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Modal, Space, Spin, Upload, UploadFile } from 'antd'
import { isEmpty } from 'lodash-es'
import { createFileRoute } from '@tanstack/react-router'
import { KAddButton } from '../../../../-components/KAddButton/KAddButton.tsx'
import { useState } from 'react'
import { useAuth } from '../../../../../hooks/useAuth.ts'
import { UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../../../constants.ts'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  AntDFileType,
  FileType,
  useFileUpload,
} from '../../../../../hooks/useFileUpload.ts'

export interface VolumeForm {
  title: string
}

const addVolume = ({
  title,
  cover,
  pdf,
}: VolumeForm & { cover: UploadFile; pdf: UploadFile }) => {
  const formData = new FormData()
  formData.append('cover', cover as AntDFileType)
  formData.append('pdf', pdf as AntDFileType)
  formData.append('title', title)
  return axios
    .post<Volume>(`/volumes`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)
}

const getVolumes = () =>
  axios
    .get<Volume[]>('/volumes/type/DIALOGUES_FRANCOPHONE')
    .then((res) => res.data.reverse())

const VolumesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { isLoggedIn } = useAuth()

  const {
    data: volumes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['volumes'],
    queryFn: getVolumes,
  })

  const {
    fileList: pdfList,
    resetFileList: resetPdfList,
    uploadFileProps: uploadPdfProps,
  } = useFileUpload(FileType.PDF)

  const {
    fileList: coverList,
    resetFileList: resetCoverList,
    uploadFileProps: uploadCoverProps,
  } = useFileUpload(FileType.IMAGE)

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<VolumeForm>({
    defaultValues: {
      title: '',
    },
  })

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    resetAllForm()
  }

  const resetAllForm = () => {
    reset()
    resetPdfList()
    resetCoverList()
  }

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: addVolume,
    onError: () => toast.error('Nu s-a putut adăuga volumul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['volumes'] })
      setIsModalOpen(false)
      resetAllForm()
      toast.success('Volumul a fost adăugat cu succes.')
    },
  })

  const onSubmit: SubmitHandler<VolumeForm> = (data) => {
    mutate({ ...data, cover: coverList[0], pdf: pdfList[0] })
  }

  return (
    <div>
      <KBanner label="Dialogues Francophones - VOLUME" />
      <div className={styles.cardsContainer}>
        {isLoggedIn && (
          <KAddButton className={'position'} onClick={showModal} />
        )}
        <Modal
          title="Creează un volum"
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
              disabled={isEmpty(coverList) || isEmpty(pdfList) || !isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Salvează
            </Button>,
          ]}
        >
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Controller
              name="title"
              defaultValue=""
              control={control}
              rules={{
                required: 'Nr. și anul volumului este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={errors.title ? 'error' : ''}
                  placeholder={
                    errors.title?.message ?? 'Număr volum / Anul volumului'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Upload {...uploadCoverProps}>
              <Button icon={<UploadOutlined />}>Selectează coperta</Button>
            </Upload>
            <Upload {...uploadPdfProps}>
              <Button icon={<UploadOutlined />}>Selectează pdf</Button>
            </Upload>
          </Space>
        </Modal>
        <div className="flex">
          {isLoading ? (
            <Spin />
          ) : isError ? (
            <span>
              Volumele nu pot fi afișate momentan. Reveniți mai târziu!
            </span>
          ) : isEmpty(volumes) ? (
            <div className="flex">
              <span>Nu există volume momentan.</span>
            </div>
          ) : (
            volumes?.map((volume) => (
              <KVolumeCard
                key={volume.id}
                id={volume.id}
                title={volume.title}
                buttonText="Deschide >"
                url={`/research/publications/dialogue-francophones/volumes/${volume.id}`}
                volumeImageUrl={BASE_URL + `/files/volumes/${volume.cover}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute(
  '/research_/publications_/dialogue-francophones_/volumes/',
)({
  component: VolumesPage,
})

export default VolumesPage
