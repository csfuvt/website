import { useState, ChangeEvent } from 'react';

const WordsCounter = ({
  id,
  name,
  limit,
  placeholder,
}: {
  id: string;
  name: string;
  limit: number;
  placeholder: string;
}) => {
  const [text, setText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= limit) {
      setText(e.target.value);
    } else {
      setText(words.slice(0, limit).join(' '));
    }
  };

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  return (
    <div>
      <textarea
        id={id}
        name={name}
        value={text}
        onChange={handleChange}
        rows={2}
        cols={10}
        placeholder={placeholder}
      />
      <p>
        Cuvinte: {wordCount} {wordCount >= limit && '(limita atinsa)'}
      </p>
    </div>
  );
};

export default WordsCounter;
