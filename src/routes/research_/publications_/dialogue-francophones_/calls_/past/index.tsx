import { createFileRoute } from '@tanstack/react-router'
import { KArchiveSection } from '../../../../../-components/KArchiveSection/KArchiveSection.tsx'
import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx'
import './styles.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { CallType } from '../-calls.model.ts'
import { Spin } from 'antd'
import { isEmpty } from 'lodash-es'
import { useEffect } from 'react'

const getCalls = () =>
  axios
    .get<CallType[]>('/contribution-calls/type/DIALOGUES_FRANCOPHONE')
    .then((res) => res.data)

export const Route = createFileRoute(
  '/research_/publications_/dialogue-francophones_/calls_/past/',
)({
  component: Calls,
})

function Calls() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['calls'],
    queryFn: getCalls,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    console.log('Data:', data)
  }, [data])

  const callsData = Array.isArray(data) ? data.slice(1) : []

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : isError ? (
        <span>Apelurile nu pot fi afișate momentan. Reveniți mai târziu!</span>
      ) : isEmpty(data) || data?.length === 1 ? (
        <div className="flex">
          <span>Nu există apeluri momentan.</span>
        </div>
      ) : (
        <div>
          <KBanner label="Dialogues Francophones - Apeluri trecute" />
          <div className="archives">
            {callsData.map((call) => (
              <KArchiveSection
                key={call.id}
                id={call.id}
                title={call.title}
                year={`${call.year}`}
                url={`/research/publications/dialogue-francophones/calls/${call.id}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
