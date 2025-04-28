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

  const handleUpdate = (val: string) => {
    // Curăță tagurile <p> și <br> din textul introdus
    const cleanedValue = val
      .replace(/<\/?p[^>]*>/g, '') // Elimină orice tag <p>
      .replace('<br>', ''); // Elimină tagurile <br>

    // Trimite valoarea curățată în funcția onChange
    onChange(cleanedValue);
  };

  return (
    <div
      className={`${status === 'error' ? 'border border-red-500 rounded' : ''}`}>
      <ReactQuill
        className="h-[10rem]"
        theme="snow"
        onChange={handleUpdate}
        formats={['bold', 'italic', 'underline', 'list', 'bullet']}
        placeholder={placeholder}
        value={!value ? '<br>' : `<p>${value}</p>`}
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;
