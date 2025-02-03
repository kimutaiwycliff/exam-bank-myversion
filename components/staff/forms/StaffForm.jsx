'use client';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { staffSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { staffFormFields } from './fields';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import CustomFormField from '@/components/forms/CustomFormField';
import { createStaff, updateStaff } from '@/lib/actions/Staff';

const StaffForm = ({ setOpen, isEditSession, editId, editValues }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: editValues,
  });
  const onSubmit = async (data) => {
    if (isEditSession) {
      const success = await updateStaff(editId, data);
      if (success) {
        toast({
          description: 'Staff updated successfully!',
        });
        setOpen(false);
      } else {
        toast({
          variant: 'destructive',
          description: 'Failed to update staff.',
        });
      }
    } else {
      const success = await createStaff(data);
      if (success) {
        toast({
          description: 'Staff created successfully!',
        });
        setOpen(false);
      } else {
        toast({
          variant: 'destructive',
          description: 'Failed to create staff.',
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form action={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {staffFormFields.map((field) => (
          <CustomFormField
            key={field.name}
            control={form.control}
            name={field.name}
            label={field.label}
            fieldType={field.fieldType}
            placeholder={field.placeholder}
            iconSrc={field.iconSrc}
            iconAlt={field.iconAlt}
          />
        ))}
        <SubmitButton />
      </form>
    </Form>
  );
};
const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className=" w-full pl-9 disabled:bg-gray-500" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
};
export default StaffForm;
