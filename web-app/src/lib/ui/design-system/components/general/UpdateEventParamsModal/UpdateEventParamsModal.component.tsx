import { Fields } from '@/api/constants';
import React, { memo, useCallback } from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { FormContainer } from './UpdateEventParamsModal.style';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { DialogDescriptionStyled } from './UpdateEventParamsModal.style';
import { useTriggerVariablesState } from '@/context/TriggerContext';

export type UpdateEventParamsModalProps = {
  onConfirm: (fields: Fields[]) => void;
  onCancel: () => void;
  fields: Fields[];
  type?: 'trigger' | 'response' | 'additional';
};

const UpdateEventParamsModalComponent: React.FC<
  UpdateEventParamsModalProps
> = ({ onConfirm, onCancel, fields, type }) => {
  const { triggerVariablesState } = useTriggerVariablesState();
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

  const getFieldType = (
    fieldValue: Fields,
    field: ControllerRenderProps<{ [x: string]: string | undefined }, string>,
  ) => {
    if (fieldValue.type === 'input') {
      return <Input placeholder={fieldValue.value} {...field} />;
    }
    if (fieldValue.type === 'textarea') {
      return (
        <Textarea
          placeholder={fieldValue.value}
          className="resize-none"
          {...field}
        />
      );
    }
    if (fieldValue.type === 'select') {
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={fieldValue.value} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {fieldValue.values &&
              fieldValue.values.map((value, index) => (
                <SelectItem key={index} value={value.value}>
                  {value.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      );
    }
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
        <DialogDescriptionStyled>
          (*) required
          {(type === 'additional' || type === 'response') &&
            Object.keys(triggerVariablesState.variables).length > 0 && (
              <span>
                You can use the following variables in the fields to personalize
                the message:
              </span>
            )}
          {(type === 'additional' || type === 'response') &&
            Object.keys(triggerVariablesState.variables).length > 0 &&
            Object.entries(triggerVariablesState.variables).map(
              ([key, value]) => (
                <span key={key}>
                  - {value}: ${key}
                  <br />
                </span>
              ),
            )}
        </DialogDescriptionStyled>
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
                  <FormControl>{getFieldType(fieldValue, field)}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <DialogFooter>
            <Button type="submit">Confirm</Button>
            <Button variant="outline" onClick={onCancel}>
              Back
            </Button>
          </DialogFooter>
        </FormContainer>
      </Form>
    </>
  );
};

export const UpdateEventParamsModal = memo(UpdateEventParamsModalComponent);
