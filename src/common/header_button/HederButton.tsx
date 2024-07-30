import "./hederbutton.css";
const HederButton = ({ name, icon, onClick }: any) => {
  return (
    <div className="outer tooltip-container" onClick={onClick}>
      {icon && name !== "refresh" && <img src={icon} alt={name} />}
      {name === "show notebook" && <span className="background">{name}</span>}
      {name === "refresh" && (
        <img className="background" src={icon} alt={name} />
      )}
      <div className="tooltip-text">{name}</div>
    </div>
  );
};

export default HederButton;
