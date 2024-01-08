import { Fields } from '@/api/constants';
import React, { memo, useCallback } from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  Input,
} from '@/components/ui';
import { useForm } from 'react-hook-form';
import { FormContainer } from './UpdateEventParamsModal.style';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export type UpdateEventParamsModalProps = {
  onConfirm: (fields: Fields[]) => void;
  onCancel: () => void;
  fields: Fields[];
};

const UpdateEventParamsModalComponent: React.FC<
  UpdateEventParamsModalProps
> = ({ onConfirm, onCancel, fields }) => {
  const formParam = (field: Fields) => {
    if (field.required) {
      return z.string().min(1, { message: `${field.name} is required` });
    }
    return z.string().optional();
  };

  const formSchema = z.object({
    ...Object.fromEntries(
      fields.map((field) => [field.name, formParam(field)]),
    ),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fields.map((field) => [field.name, ''])),
  });

  const formatLabel = (field: Fields) => {
    const label = field.name.charAt(0).toUpperCase() + field.name.slice(1);
    if (field.required) {
      return `${label}*`;
    }
    return label;
  };

  const onSubmit = useCallback((values: FormValues) => {
    const newFields = fields.map((field) => ({
      ...field,
      value: values[field.name] || field.value,
    }));
    onConfirm(newFields);
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update event params</DialogTitle>
        <DialogDescription>(*) required</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((fieldValue, index) => (
            <FormField
              key={index}
              control={form.control}
              name={fieldValue.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formatLabel(fieldValue)}</FormLabel>
                  <FormControl>
                    <Input placeholder={fieldValue.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <DialogFooter>
            <Button type="submit">Confirm</Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </FormContainer>
      </Form>
    </>
  );
};

export const UpdateEventParamsModal = memo(UpdateEventParamsModalComponent);
