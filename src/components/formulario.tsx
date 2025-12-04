import { useForm, type SubmitHandler } from "react-hook-form";

type InputData = {
  nome: string;
  sobreNome: string;
  idade: number;
};

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputData>();
  const onSubmit: SubmitHandler<InputData> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("nome", {
            required: { value: true, message: "Este campo é obrigatorio" },
            minLength: {
              value: 10,
              message: "Campo precisa ter no minimo 10 caracteres",
            },
          
          })}
          type="text"
          placeholder="primeiro nome:"
          className="border-8"
        />
        <br />
        {errors.nome && <span>{errors.nome.message}</span>}
        <input
          {...register("sobreNome")}
          type="text"
          placeholder="sobrenome"
          className="border-8"
        />
        <br />
        <input
          {...register("idade")}
          type="number"
          placeholder="idade: "
          className="border-8"
        />
        <br />
        <button type="submit" className="border">
          Enviar
        </button>
      </form>
    </div>
  );
}
