import { createFileRoute } from '@tanstack/react-router'
import { KBanner } from '../../../-components/KBanner/KBanner'
import { KActeColocvii } from '../../../-components/KActeColocvii/KActeColocvii'
import styles from './LingvisticConfPage.module.css'
import axios from 'axios'
import { LingvisticConference } from './-lingvistic-conference.model.ts'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../../../../constants.ts'
import { Spin } from 'antd'
import { isEmpty } from 'lodash-es'

const getLingvisticConferences = () =>
  axios.get<LingvisticConference[]>('/lingvistics-docs').then((res) => res.data)

const LingvisticConfPage = () => {
  const {
    data: lingvisticsConferences,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lingvistics-docs'],
    queryFn: getLingvisticConferences,
  })

  return (
    <>
      <KBanner label="ACTELE COLOCVIILOR FRANCO-ROMANE DE LINGVISTICA" />
      <div className={styles.container}>
        <div className={styles.flex}>
          {isLoading ? (
            <Spin />
          ) : isError ? (
            <span>Actele nu pot fi afișate momentan. Reveniți mai târziu!</span>
          ) : isEmpty(lingvisticsConferences) ? (
            <span>Nu există acte momentan.</span>
          ) : (
            lingvisticsConferences?.map((item) => (
              <KActeColocvii
                key={item.id}
                summaryText={item.description}
                link={item.links[0]?.url}
                bookImage={
                  BASE_URL +
                  `/files/lingvistics-documents/${item.id}${item.coverExtension}`
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute(
  '/research_/publications_/lingvistic-conferences/',
)({
  component: LingvisticConfPage,
})

export default LingvisticConfPage
