import PropTypes from "prop-types";
import { FaArrowDown, FaArrowUp, FaHeart, FaTachometerAlt, FaTint, FaLungs } from "react-icons/fa";

interface CardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
  type: string;
  signRate: string;
}

const Card = ({ title, value, change, icon, bgColor, type, signRate }: CardProps) => {
  return (
    <div className="dashboard-card-section" style={{ backgroundColor: bgColor }}>
      <div className="dashboard-card-section-2">
        <h3>{title} ({type})</h3>
        {icon}
      </div>
      <div className="dashboard-card-section-3">
        <p>{value}</p>
        <div className="sign-choice">
          <span className={`text-sm ${signRate === "+" ? "green-style" : "red-style"}`}>
            {signRate}{change}
          </span>
          {signRate === "+" ? <FaArrowUp className="green-style" /> : <FaArrowDown className="red-style" />}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  bgColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  signRate: PropTypes.string.isRequired,
};

const CardsSection = () => {
  return (
    <div className="dashboard-card-main">
      <Card title="Heart Rate" value="72 BPM" signRate="+" change="3%" icon={<FaHeart className="icon-style icon-style-1" />} bgColor="#FDE7E5" type="Vital Sign" />
      <Card title="Blood Pressure" value="120/80 mmHg" signRate="-" change="1%" icon={<FaTachometerAlt className="icon-style icon-style-2" />} bgColor="#E3ECFA" type="Vital Sign" />
      <Card title="Blood Sugar" value="98 mg/dL" signRate="+" change="5%" icon={<FaTint className="icon-style icon-style-3" />} bgColor="#EDE4F3" type="Glucose Level" />
      <Card title="Oxygen Saturation" value="97% SpO2" signRate="-" change="2%" icon={<FaLungs className="icon-style icon-style-4" />} bgColor="#E3ECFA" type="Oxygen Level" />
    </div>
  );
};

export default CardsSection;
