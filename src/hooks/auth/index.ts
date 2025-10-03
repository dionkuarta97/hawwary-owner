import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/service/auth';

export const useMutationLogin = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postLogin,
  });
  return {
    mutateAsync,
  };
};
