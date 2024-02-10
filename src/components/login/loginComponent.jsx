import "./loginComponent.style.css";
import CustomButton from "./../customButton";
import { createNotification, authAtom } from "../../atoms";
import { useAtom } from "jotai";

const LoginComponent = () => {
  const [_, setUser] = useAtom(authAtom);
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const bodyData = { username, password };

    const response = await fetch("api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const responseData = await response.json();
    if (response.status === 200) {
      setUser(responseData.user);
    } else {
      createNotification({ text: responseData.message, type: "error" });
    }
  };

  return (
    <div className="login">
      <h5 className="login-info">
        Norėdami naudotis šia aplikacija, pirmiau turite prisijungti
      </h5>

      <form onSubmit={(e) => handleLogin(e)}>
        <div className="form-control">
          <label htmlFor="username">Vartotojo vardas</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Slaptažodis</label>
          <input type="password" id="password" name="password" required />
        </div>
        <CustomButton customClass={"login-submit"} text={"Prisijungti"} />
      </form>
    </div>
  );
};

export default LoginComponent;
