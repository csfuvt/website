import './styles.css';
import { KButton } from '../KButton/KButton.tsx';
import { Dispatch, SetStateAction } from 'react';
import { KTitle } from '../KTitle/KTitle.tsx';
import { KAddCover } from '../KAddCover/KAddCover.tsx';

import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Translation {
  description: string;
  link: string;
}
export const KAddTranslationModal = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handleSubmit, control } = useForm<Translation>({
    defaultValues: {
      description: '',
      link: '',
    },
  });

  const onSubmit: SubmitHandler<Translation> = data => {
    console.log(data);
  };

  return (
    <div>
      <div className="modal">
        <KTitle label="Adauga o noua traducere" />
        <form>
          <KAddCover
            onClick={() => {
              console.log('Upload cover');
            }}
          />
          <div className="vertical">
            <div className="inputs">
              <Controller
                name="description"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    value={value}
                    onChange={onChange}
                    placeholder="Description"
                    autoSize={{ minRows: 6, maxRows: 8 }}
                    allowClear
                  />
                )}
              />

              <Controller
                name="link"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    size="large"
                    placeholder="Link"
                    allowClear
                  />
                )}
              />

              <div className="horizontal">
                <KButton label="Save" onClick={handleSubmit(onSubmit)} />
                <KButton
                  label="Cancel"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
