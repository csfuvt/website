import Styles from './KTitle.module.css';

export const KTitle = ({ label }: { label: string }) => {
  return <div className={Styles.title}>{label}</div>;
};
