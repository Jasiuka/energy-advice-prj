import { removeNotificationWithClick } from "../../atoms";
const NotificationComponent = ({ text, type, id }) => {
  return (
    <li className={`notification notification-${type}`}>
      <button
        role="button"
        title="Panaikinti pranešimą"
        onClick={() => removeNotificationWithClick(id)}
      >
        X
      </button>
      <p>{text}</p>
    </li>
  );
};

export default NotificationComponent;
