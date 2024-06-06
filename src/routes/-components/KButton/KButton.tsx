import './styles.css';

export const KButton = ({
  onClick = () => {},
  disabled = false,
  label = 'Label',
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className="custom-button">
      {label}
    </button>
  );
};
