import { Button } from '@/components/ui';
import React, { memo } from 'react';

const Login = () => {
  return (
    <div>
      <Button>Login</Button>
    </div>
  );
};

export const LoginPage = memo(Login);
