'use client';
import React, { memo, useCallback } from 'react';
import {
  FormContainer,
  HeaderContainer,
  InputsContainer,
  LoginButton,
  MainContainer,
  PageContainer,
  RightContainer,
  Subtitle,
  Title,
} from './LoginPage.style';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { ColumnLayout } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const Login = () => {
  const router = useRouter();

  const handleRegsiter = useCallback(() => {
    router.push('/register');
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  type FormValues = z.infer<typeof formSchema>;

  const onSubmit = useCallback((values: FormValues) => {
    // Do something with the form values.
    console.log(values.email, values.password);
  }, []);
  return (
    <PageContainer>
      <ColumnLayout />
      <RightContainer>
        <LoginButton onClick={handleRegsiter}>Create an Account</LoginButton>
        <MainContainer>
          <FormContainer>
            <HeaderContainer>
              <Title>Sign In</Title>
              <Subtitle>Enter your account access below to sign in</Subtitle>
            </HeaderContainer>
            <InputsContainer>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    alignSelf: 'center',
                  }}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="name@exemple.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button>Sign In</Button>
                </form>
              </Form>
            </InputsContainer>
          </FormContainer>
        </MainContainer>
      </RightContainer>
    </PageContainer>
  );
};

export const LoginPage = memo(Login);
