import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nome: z
    .string()
    .min(3, "Deve ser maior do que 3 caracteres")
    .nonempty("Nome é obrigatorio")
    .regex(/^[A-Za-z\s]+$/i, "Apenas letras são permitidas"),
  sobrenome: z.string(),
  email: z.email("Formato de E-mail inválido!"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  termos: z.boolean().refine((val) => val === true, {
    message: "Obrigatorio aceitar para continuar"
  }),
});

type schemaData = z.infer<typeof schema>;

export function NovoFormulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input
        {...register("nome", {})}
        type="text"
        placeholder="Nome:"
        className="border-8"
      />
      {errors.nome && <span>{errors.nome.message}</span>}
      <input
        {...register("sobrenome")}
        type="text"
        placeholder="Sobrenome:"
        className="border-8"
      />
      {errors.sobrenome && <span>{errors.sobrenome.message}</span>}
      <input
        {...register("email")}
        type="text"
        placeholder="E-mail:"
        className="border-8"
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        {...register("telefone")}
        type="number"
        placeholder="Telefone:"
        className="border-8"
      />
      {errors.telefone && <span>{errors.telefone.message}</span>}
      <br />
      <label>
        Aceite os termos?
        <input
          {...register("termos")}
          type="checkbox"
          placeholder="Aceita os termos?"
          className="border-8"
        />
        {errors.termos && <span>{errors.termos.message}</span>}
      </label>
      <Button type="submit">Enviar</Button>

    </form>
  );
}
