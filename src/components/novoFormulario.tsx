import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Astronalta from "@/assets/img/Image.png";
import { useState } from "react";
import Foguete from "@/assets/img/foguete.png";

const schema = z.object({
  nome: z
    .string()
    .min(3, "Deve ser maior do que 3 caracteres")
    .nonempty("Nome é obrigatorio")
    .regex(/^[A-Za-z\s]+$/i, "Apenas letras são permitidas"),
  sobrenome: z
    .string()
    .min(3, "Deve ser maior do que 3 caracteres")
    .nonempty("Sobrenome é obrigatorio")
    .regex(/^[A-Za-z\s]+$/i, "Apenas letras são permitidas"),
  email: z.email("Formato de E-mail inválido!"),
  telefone: z
    .string()
    .max(11, "Deve ter 11 Números")
    .regex(/^[0-9+\-()\s ]+$/, "Apenas números são permitidas")
    .nonempty("Telefone é obrigatório"),
  termos: z.boolean().refine((val) => val === true, {
    message: "Obrigatorio aceitar para continuar",
  }),
});

type schemaData = z.infer<typeof schema>;

export function NovoFormulario() {
  const [dados, setDados] = useState<schemaData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="h-screen bg-[#0A0D17] ">
      <div className="flex flex-col items-center justify-center p-15  ">
        <h1 className="text-5xl font-inter font-extrabold bg-linear-to-r from-[#FFFFFF] via-[#763AF5] to-[#A604F2] text-transparent bg-clip-text">
          Entre em contato
        </h1>
        <p>Vamos criar juntos um universo de possibilidades!</p>
      </div>

      <div className="flex flex-wrap justify-center bg-[#141621] rounded-2xl max-w-[800px] mx-auto relative z-10">
        <form
          className="flex flex-col justify-evenly w-100 p-10 gap-3 "
          onSubmit={handleSubmit((data) => {
            console.log(data);
            setDados(data);
          })}
        >
          <div className="flex flex-col ">
            <input
              {...register("nome", {})}
              type="text"
              placeholder="Nome:"
              className="border border-[#45454F] rounded-lg p-2"
            />
            {errors.nome && (
              <span className="text-red-500 text-sm">
                {errors.nome.message}
              </span>
            )}
          </div>
          <div className="flex flex-col ">
            <input
              {...register("sobrenome")}
              type="text"
              placeholder="Sobrenome:"
              className="border border-[#45454F] rounded-lg p-2 "
            />
            {errors.sobrenome && (
              <span className="text-red-500 text-sm">
                {errors.sobrenome.message}
              </span>
            )}
          </div>
          <div className="flex flex-col ">
            <input
              {...register("email")}
              type="text"
              placeholder="E-mail:"
              className="border border-[#45454F] rounded-lg p-2 "
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              {...register("telefone")}
              type="number"
              placeholder="Telefone:"
              className="border border-[#45454F] rounded-lg p-2 [appearance:textfield] 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-webkit-inner-spin-button]:appearance-none"
            />
            {errors.telefone && (
              <span className="text-red-500 text-sm">
                {errors.telefone.message}
              </span>
            )}
          </div>
          <div className="flex ">
            <label className="flex items-center gap-2">
              <input
                {...register("termos")}
                type="checkbox"
                placeholder="Aceita os termos?"
                className=" size-4 accent-blue-600"
              />
              Aceite os termos?
              {errors.termos && (
                <span className="text-red-500 text-sm">
                  {errors.termos.message}
                </span>
              )}
            </label>
          </div>
          <Button
            className="w-full flex bg-linear-to-r items-center justify-center from-[#763AF5] to-[#A604F2] py-3 rounded-lg text-lg"
            type="submit"
          >
            Envie para a lua
            <img className="w-6" src={Foguete} />
          </Button>
        </form>
        <div className="relative w-100 h-100">
          <img className="absolute p-10 w-100 h-100" src={Astronalta} alt="" />
          <span className="absolute top-10 left-10 font-Roboto text-white">
            {dados && (
              <pre className="text-white m-3 ">{JSON.stringify(dados, null, 2)}</pre>
            )}
          </span>
        </div>
      </div>
      <span className="fixed top-11 left-30 rounded-full size-40 blur-[100px] bg-[#A604F2] z-1"></span>
      <span className="fixed bottom-11 right-120 rounded-full size-80 blur-[200px] bg-[#A604F2] z-1"></span>
      <span className="fixed bottom-1 left-30 rounded-full size-40 blur-[150px] bg-[#A604F2] z-1"></span>
    </div>
  );
}
