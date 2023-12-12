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
import { FormContainer } from './MailForm.style';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/api/user';

export type MailFormProps = {
  onNextStep: () => void;
};

const accountFormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email.',
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  email: '',
};

const MailFormComponent: React.FC<MailFormProps> = ({ onNextStep }) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const mutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      if (!data) {
        onNextStep();
      } else {
        form.setError('email', {
          type: 'manual',
          message: 'Email already exists.',
        });
      }
    },
  });

  const onSubmit = useCallback(
    async (values: AccountFormValues) => {
      mutation.mutate(values);
    },
    [onNextStep],
  );
  return (
    <Form {...form}>
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up with Email</Button>
      </FormContainer>
    </Form>
  );
};

export const MailForm = memo(MailFormComponent);
