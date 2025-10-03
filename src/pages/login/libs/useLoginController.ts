import { useMutationLogin } from "@/hooks/auth";
import { toast } from "@/components/default-toast";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import authStore from "@/store/auth";


const useLoginController = () => {
    const navigate = useNavigate();
    const setToken = useSetAtom(authStore.token);
    const setUser = useSetAtom(authStore.user);
    const { mutateAsync } = useMutationLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        await mutateAsync(form, {
            onSuccess: (response) => {
                toast.success('Berhasil!', 'Login berhasil');
               
                setToken(response.data.token);
                setUser(response.data.user);
                navigate('/');
            },   
        });
    };

  return {
    showPassword,
    handleShowPassword,
    form,
    handleChangeForm,
    handleLogin,
  };
};

export default useLoginController;