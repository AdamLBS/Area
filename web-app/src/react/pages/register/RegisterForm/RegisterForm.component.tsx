'use client';
import React, { memo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Button,
  Input,
} from '@/components/ui';
import { FormContainer } from './RegisterForm.style';

export type RegisterFormProps = {
  onCancel: () => void;
};

const accountFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(32, {
      message: 'Name must not be longer than 32 characters.',
    }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(255, {
      message: 'Password must not be longer than 255 characters.',
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(255, {
      message: 'Password must not be longer than 255 characters.',
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  username: '',
  password: '',
  confirmPassword: '',
};

const RegisterFormComponent: React.FC<RegisterFormProps> = ({ onCancel }) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const onSubmit = useCallback((values: AccountFormValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
    // TODO: handle submit
  }, []);

  return (
    <Form {...form}>
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="username" {...field} />
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
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Confirm your account</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </FormContainer>
    </Form>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
