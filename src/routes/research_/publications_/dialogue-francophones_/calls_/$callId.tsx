import { createFileRoute } from '@tanstack/react-router'
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx'
import './styles.css'
import { KTitle } from '../../../../-components/KTitle/KTitle.tsx'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Spin } from 'antd'
import { isEmpty } from 'lodash-es'
import { BASE_URL } from '../../../../../constants.ts'
import { CallType } from './-calls.model.ts'

const getCallById = (id: string) =>
  axios.get<CallType>(`/contribution-calls/${id}`).then((res) => res.data)

export const Route = createFileRoute(
  '/research_/publications_/dialogue-francophones_/calls_/$callId',
)({
  component: Call,
})

function Call() {
  const { callId } = Route.useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: [`contribution-call/${callId}`],
    queryFn: () => getCallById(callId),
  })

  return (
    <div>
      {isLoading ? (
        <div className="flex">
          <Spin />
        </div>
      ) : isError ? (
        <div className="flex">
          <span>
            Apelul la contribuții nu poate fi afișat momentan. Reveniți mai
            târziu!
          </span>
        </div>
      ) : isEmpty(data) ? (
        <div className="flex">
          <span>Nu există apelul la contribuții.</span>
        </div>
      ) : (
        <div>
          <KBanner label={`Dialogues Francophones NO. ${data.title}`} />
          <div className="iframeContainer">
            <KTitle label={`Apel la contribuții - ${data.year}`} />
            <iframe
              src={BASE_URL + `/files/contribution-calls/${data.pdf}`}
              className="iframe"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}
