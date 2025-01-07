import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../../research_/publications_/dialogue-francophones_/volumes/VolumePage.module.css';
import { Spin } from 'antd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import KVolumeCard from './KVolumeCard.tsx';
import { BASE_URL } from '../../../constants.ts';

const fetchVolumes = (volumeCategory: string) =>
  axios.get(`/volumes/type/${volumeCategory}`).then(res => res.data);

const updateVolumesOrder = (
  volumes: { id: number; newOrder: number }[],
  id: string
) => axios.post(`/volumes/${id}/reorder`, { volumes });

type Volume = {
  id: number;
  title: string;
  buttonText: string;
  url: string;
  cover: string;
  volumeImageUrl: string;
};

export const KVolumeCardFinal = ({
  volumeCategory,
  isLoggedIn,
}: {
  volumeCategory: 'DIALOGUES_FRANCOPHONE';
  isLoggedIn: boolean;
}) => {
  const {
    data: volumes,
    isLoading,
    error,
  } = useQuery<Volume[]>({
    queryKey: ['volumes', volumeCategory],
    queryFn: () => fetchVolumes(volumeCategory),
  });

  const mutation = useMutation({
    mutationFn: (updatesVolumes: { id: number; newOrder: number }[]) =>
      updateVolumesOrder(updatesVolumes, volumeCategory),
    onError: error => {
      console.error('Failed to update volume order:', error);
    },
  });

  const [localVolumes, setLocalVolumes] = useState<Volume[]>([]);

  useEffect(() => {
    if (volumes) {
      setLocalVolumes(volumes);
    }
  }, [volumes]);

  const groupedVolumes: Volume[][] = [];
  for (let i = 0; i < localVolumes.length; i += 3) {
    const group = localVolumes.slice(i, i + 3);

    // Add invisible cards for alignment
    if (group.length === 1) {
      group.push({
        id: -1,
        title: '',
        buttonText: '',
        url: '',
        cover: '',
        volumeImageUrl: '',
      });
      group.push({
        id: -2,
        title: '',
        buttonText: '',
        url: '',
        cover: '',
        volumeImageUrl: '',
      });
    } else if (group.length === 2) {
      group.push({
        id: -1,
        title: '',
        buttonText: '',
        url: '',
        cover: '',
        volumeImageUrl: '',
      });
    }

    groupedVolumes.push(group);
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceGroupIndex = parseInt(source.droppableId, 10);
    const destinationGroupIndex = parseInt(destination.droppableId, 10);

    if (
      sourceGroupIndex < 0 ||
      sourceGroupIndex >= groupedVolumes.length ||
      destinationGroupIndex < 0 ||
      destinationGroupIndex >= groupedVolumes.length
    )
      return;

    const newGroupedVolumes = [...groupedVolumes];
    newGroupedVolumes[sourceGroupIndex] = [...groupedVolumes[sourceGroupIndex]];
    newGroupedVolumes[destinationGroupIndex] = [
      ...groupedVolumes[destinationGroupIndex],
    ];

    const [movedItem] = newGroupedVolumes[sourceGroupIndex].splice(
      source.index,
      1
    );
    newGroupedVolumes[destinationGroupIndex].splice(
      destination.index,
      0,
      movedItem
    );

    const updatesVolumesList = newGroupedVolumes
      .flat()
      .filter(volume => volume.id > 0) // Filter out invisible cards
      .map((volume, index) => ({
        ...volume,
        order: index,
      }));

    setLocalVolumes(updatesVolumesList);

    try {
      mutation.mutate(
        updatesVolumesList.map(volume => ({
          id: volume.id,
          newOrder: volume.order,
        }))
      );
    } catch (error) {
      console.error('Eroare la actualizarea bazei de date:', error);
    }
  };

  if (isLoading) return <Spin />;
  if (error) return <div>A apărut o eroare la încărcarea volumelor.</div>;

  return isLoggedIn ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.volumesGrid}>
        {groupedVolumes.map((group, groupIndex) => (
          <Droppable
            key={groupIndex}
            droppableId={groupIndex.toString()}
            direction="horizontal">
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.rowContainer}>
                {group.map((volume, index) => (
                  <Draggable
                    key={volume.id.toString()}
                    draggableId={volume.id.toString()}
                    index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.volumeCardContainer} ${volume.id < 0 ? styles.invisibleCard : ''}`}>
                        {volume.id > 0 && (
                          <KVolumeCard
                            key={volume.id}
                            id={volume.id}
                            title={volume.title}
                            buttonText="Deschide >"
                            url={`/research/publications/dialogue-francophones/volumes/${volume.id}`}
                            volumeImageUrl={
                              BASE_URL + `/files/volumes/${volume.cover}`
                            }
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  ) : (
    <div className={styles.volumesGrid}>
      {groupedVolumes.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.rowContainer}>
          {group.map(volume => (
            <div
              key={volume.id}
              className={`${styles.volumeCardContainer} ${volume.id < 0 ? styles.invisibleCard : ''}`}>
              {volume.id > 0 && (
                <KVolumeCard
                  key={volume.id}
                  id={volume.id}
                  title={volume.title}
                  buttonText="Deschide >"
                  url={`/research/publications/dialogue-francophones/volumes/${volume.id}`}
                  volumeImageUrl={BASE_URL + `/files/volumes/${volume.cover}`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KVolumeCardFinal;
