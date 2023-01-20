import { useMemo, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { string, z } from "zod";
import { useAuth } from "./useAuth";

const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInData = z.infer<typeof SignInSchema>;

export const useSignIn = () => {
  const { handleSubmit, ...restForm } = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
  });
  const { signInUser } = useAuth();

  const onSubmit: SubmitHandler<SignInData> = useCallback(
    (data) => {
      signInUser(data);
    },
    [signInUser]
  );

  const handler = useMemo(
    () => handleSubmit(onSubmit),
    [handleSubmit, onSubmit]
  );

  return {
    form: {
      handleSubmit: handler,
      ...restForm,
    },
  };
};
