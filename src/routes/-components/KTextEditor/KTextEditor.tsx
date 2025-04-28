import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  status?: 'error' | '';
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  placeholder,
  status,
}) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  return (
    <div
      className={`${status === 'error' ? 'border border-red-500 rounded' : ''}`}>
      <ReactQuill
        className="h-[10rem]"
        theme="snow"
        onChange={onChange}
        formats={['bold', 'italic', 'underline', 'list', 'bullet']}
        placeholder={placeholder}
        value={value}
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;
