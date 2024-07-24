import './styles.css';
import { Button, Dropdown, MenuProps, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Route } from '../../research_/publications_/dialogue-francophones_/volumes/$volumeId.tsx';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

const deleteChapter = (id: number) =>
  axios.delete(`/chapters/${id}`).then(res => res.data);

export enum ActionableButton {
  DELETE = 'delete',
  EDIT = 'edit',
}

export const KChapter = ({
  chapterId,
  title,
  url,
  authors,
  pageStart,
  pageEnd,
}: {
  chapterId: number;
  title: string;
  url: string;
  authors: string;
  pageStart: number;
  pageEnd: number;
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { volumeId } = Route.useParams();

  const { mutate: deleteChapterMutation, isPending: isDeleteChapterPending } =
    useMutation({
      mutationFn: deleteChapter,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('Capitolul a fost șters cu succes');
      },
      onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
    });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere capitol',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți capitolul?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        deleteChapterMutation(chapterId);
      },
    });
  };
  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === ActionableButton.DELETE) {
      showPropsConfirm();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: ActionableButton.EDIT,
      label: 'Editează capitolul',
      icon: <EditOutlined />,
    },
    {
      key: ActionableButton.DELETE,
      danger: true,
      label: 'Șterge capitolul',
      icon: <DeleteOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
    loading: isDeleteChapterPending,
  };
  const handleContainerClick = () => {
    window.location.href = url;
  };

  return (
    <div className="chapterContainer">
      <div className="details" onClick={handleContainerClick}>
        <span className="chapterTitle">{title}</span>
        <span className="desc">{authors}</span>
      </div>
      <div className="pages">
        <span>
          pag. {pageStart} - {pageEnd}
        </span>
        {isLoggedIn && (
          <Dropdown
            menu={menuProps}
            placement="bottomLeft"
            arrow
            trigger={['click']}>
            <Button type="primary" size="large">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </Button>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
