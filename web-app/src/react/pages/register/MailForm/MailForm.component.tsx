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
} from '@/components/ui/form';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { FormContainer } from './MailForm.style';

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

  const onSubmit = useCallback((values: AccountFormValues) => {
    // eslint-disable-next-line no-console
    console.log(values);
    // TODO: handle submit
    onNextStep();
  }, []);

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
