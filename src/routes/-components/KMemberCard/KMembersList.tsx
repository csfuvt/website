import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../../about_/members/MembersPage.module.css';
import { Spin } from 'antd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import KMembersCardNew from './KMemberCardNew.tsx';
import { useEffect, useState } from 'react';

const fetchMembers = (memberCategory: string) =>
  axios.get(`/members/${memberCategory}`).then(res => res.data);

const updateMembersOrder = (
  members: { id: number; newOrder: number }[],
  memberCategory: string
) => axios.post(`/members/${memberCategory}/reorder`, { members });

type Member = {
  id: number;
  name: string;
  description: string;
  role: string;
  link: string;
  documentUrl?: string;
  pictureUrl?: string;
  links?: { id: number; label: string; pageUrl: string; memberId: number }[];
};

export const KMembersList = ({
  memberCategory,
  openCard,
  toggleDescription,
  isLoggedIn,
}: {
  memberCategory:
    | 'FOUNDER'
    | 'BASE_TEAM'
    | 'COLLABORATOR'
    | 'STUDENTS'
    | 'ASSOCIATE_MEMBER';
  openCard: string | null;
  toggleDescription: (name: string) => void;
  isLoggedIn: boolean;
}) => {
  const {
    data: members,
    isLoading,
    error,
  } = useQuery<Member[]>({
    queryKey: ['members', memberCategory],
    queryFn: () => fetchMembers(memberCategory),
  });

  const mutation = useMutation({
    mutationFn: (updatedMembers: { id: number; newOrder: number }[]) =>
      updateMembersOrder(updatedMembers, memberCategory),
    onError: error => {
      console.error('Failed to update member order:', error);
    },
  });

  const [localMembers, setLocalMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (members) {
      setLocalMembers(members);
    }
  }, [members]);

  const groupedMembers: Member[][] = [];
  for (let i = 0; i < localMembers.length; i += 3) {
    groupedMembers.push(localMembers.slice(i, i + 3));
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceGroupIndex = parseInt(source.droppableId, 10);
    const destinationGroupIndex = parseInt(destination.droppableId, 10);

    if (
      sourceGroupIndex < 0 ||
      sourceGroupIndex >= groupedMembers.length ||
      destinationGroupIndex < 0 ||
      destinationGroupIndex >= groupedMembers.length
    )
      return;

    const newGroupedMembers = [...groupedMembers];
    newGroupedMembers[sourceGroupIndex] = [...groupedMembers[sourceGroupIndex]];
    newGroupedMembers[destinationGroupIndex] = [
      ...groupedMembers[destinationGroupIndex],
    ];

    const [movedItem] = newGroupedMembers[sourceGroupIndex].splice(
      source.index,
      1
    );
    newGroupedMembers[destinationGroupIndex].splice(
      destination.index,
      0,
      movedItem
    );

    const updatedMembersList = newGroupedMembers
      .flat()
      .map((member, index) => ({
        ...member,
        order: index,
      }));

    setLocalMembers(updatedMembersList);

    try {
      mutation.mutate(
        updatedMembersList.map(member => ({
          id: member.id,
          newOrder: member.order,
        }))
      );
    } catch (error) {
      console.error('Eroare la actualizarea bazei de date:', error);
    }
  };

  if (isLoading) return <Spin />;
  if (error) return <div>A apărut o eroare la încărcarea membrilor.</div>;

  return isLoggedIn ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.membersGrid}>
        {groupedMembers.map((group, groupIndex) => (
          <Droppable
            key={groupIndex}
            droppableId={groupIndex.toString()}
            direction="horizontal">
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.rowContainer}>
                {group.map((member, index) => (
                  <Draggable
                    key={member.id.toString()}
                    draggableId={member.id.toString()}
                    index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.memberCardContainer}>
                        <KMembersCardNew
                          key={member.id}
                          id={member.id}
                          name={member.name}
                          description={member.description}
                          role={member.role}
                          link={member.link}
                          pictureUrl={member.pictureUrl}
                          documentUrl={member.documentUrl}
                          memberCategory={memberCategory}
                          isOpen={openCard === member.name}
                          toggleDescription={() =>
                            toggleDescription(member.name)
                          }
                          links={member.links ?? []}
                        />
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
    <div className={styles.membersGrid}>
      {groupedMembers.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.rowContainer}>
          {group.map(member => (
            <div key={member.id} className={styles.memberCardContainer}>
              <KMembersCardNew
                key={member.id}
                id={member.id}
                name={member.name}
                description={member.description}
                role={member.role}
                link={member.link}
                pictureUrl={member.pictureUrl}
                documentUrl={member.documentUrl}
                memberCategory={memberCategory}
                isOpen={openCard === member.name}
                toggleDescription={() => toggleDescription(member.name)}
                links={member.links ?? []}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KMembersList;
