import "./HealthBar.css";

const HealthBar = ({ maxHp = 100, hp = 100 } = {}) => {
  const barWidth = (hp / maxHp) * 100;

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Hamburguer health</h2>
      <div className="health-bar">
        <div className="bar" style={{ width: `${barWidth}%` }}></div>
        <div className="hit" style={{ width: `${0}%` }}></div>

        <div
          style={{
            position: "absolute",
            top: "5px",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          {hp.toFixed(2)} / {maxHp.toFixed(2)}
        </div>
      </div>

      <br />
    </div>
  );
};

export default HealthBar;
