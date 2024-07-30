const HederButton = ({ name, icon, onClick }: any) => {
  return (
    <div style={{ cursor: "pointer" }} onClick={onClick}>
      {name}
    </div>
  );
};

export default HederButton;
