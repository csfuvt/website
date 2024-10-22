import { useState, ChangeEvent } from 'react';
import styles from './WordsCounter.module.css';

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
    <div className={styles.wordsCounterContainer}>
      <textarea
        id={id}
        name={name}
        value={text}
        onChange={handleChange}
        rows={2}
        cols={10}
        placeholder={placeholder}
        required
        className={styles.wordCounterTextarea}
      />

      <div className={styles.wordCountContainer}>
        <div className={styles.wordCount}>
          {wordCount}/{limit}
        </div>
        {wordCount >= limit && (
          <div className={styles.limitReached}>
            Limita de cuvinte a fost atinsa!
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsCounter;
