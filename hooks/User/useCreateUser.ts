import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "./useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type RegisterData = z.infer<typeof RegisterSchema>;

export const useCreateUser = () => {
  const { handleSubmit, ...restForm } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
  });
  const { createUser } = useAuth();

  const onSubmit: SubmitHandler<RegisterData> = useCallback(
    (data) => {
      createUser(data);
    },
    [createUser]
  );

  const handler = useMemo(
    () => handleSubmit(onSubmit),
    [handleSubmit, onSubmit]
  );

  return {
    form: { handleSubmit: handler, ...restForm },
  };
};
