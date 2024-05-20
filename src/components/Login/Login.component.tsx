import { useForm, SubmitHandler } from "react-hook-form";
import "./Login.scss";

type Inputs = {
  login: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO: call backend here
    console.log(data);
  };

  return (
    <>
      <form className="login-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Connexion</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            {...register("login", { required: true })}
            placeholder="login"
          />
          <label>Login</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          <label>Mot de passe</label>
        </div>
        {errors.password && <span>This field is required</span>}

        <button className="submit-btn btn btn-primary w-100 py-2" type="submit">
          Connexion
        </button>
      </form>
    </>
  );
};
