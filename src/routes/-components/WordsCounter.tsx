import { useState, ChangeEvent } from 'react';

const WordsCounter = ({
  limit,
  placeholder,
}: {
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
        value={text}
        onChange={handleChange}
        rows={2}
        cols={10}
        placeholder={placeholder}
      />
      <p>
        Words: {wordCount} {wordCount >= limit && '(Limit reached)'}
      </p>
    </div>
  );
};

export default WordsCounter;
