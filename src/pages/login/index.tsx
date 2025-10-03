import Container from '@/components/container';
import Text from '@/components/Text';
import { Button, Input } from '@material-tailwind/react';
import { ProfileCircle, Lock, Eye, EyeClosed } from 'iconoir-react';
import useLoginController from './libs/useLoginController';

const Login = () => {
  const { showPassword, handleShowPassword, form, handleChangeForm, handleLogin } =
    useLoginController();
  return (
    <Container className="items-center justify-center">
      <Text text="Hawwary Owner" className="text-2xl mb-5 font-bold" />
      <div className="flex flex-col w-full lg:w-[400px] bg-white rounded-md border border-gray-200 gap-4 px-8 py-12 shadow-md">
        <Input
          autoComplete="new-password"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChangeForm}
        >
          <Input.Icon>
            <ProfileCircle className="h-full w-full" />
          </Input.Icon>
        </Input>
        <div className="flex flex-row w-full relative items-center">
          <Input
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            className="rounded-r-none"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChangeForm}
          >
            <Input.Icon>
              <Lock className="h-full w-full" />
            </Input.Icon>
          </Input>
          <div
            className="p-2 cursor-pointer rounded-r-md shadow-sm bg-gray-100 border-1 border-gray-200"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <Eye className="h-full text-gray-400 w-full" />
            ) : (
              <EyeClosed className="h-full text-gray-400 w-full" />
            )}
          </div>
        </div>
        <Button onClick={handleLogin} className="cursor-pointer">
          Login
        </Button>
      </div>
    </Container>
  );
};

export default Login;
