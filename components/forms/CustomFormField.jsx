'use client';
import { FormFieldTypes } from '@/constants';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Select from 'react-select';

const RenderField = ({ field, props }) => {
  const { fieldType, placeholder, selectItems, label, onChange, inputType } =
    props;
  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <>
          {inputType === 'hidden' ? (
            <Input type={inputType} {...field} />
          ) : (
            <div className="flex rounded-md border">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  className="border"
                />
              </FormControl>
            </div>
          )}
        </>
      );

    case FormFieldTypes.TEXTAREA:
      return (
        <div className="flex rounded-md border">
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.SELECT:
      const options = (selectItems || []).map((item) => ({
        value: item.id,
        label: label === 'Objective' ? item.description : item.name,
      }));

      const handleChange = (selectedOption) => {
        field.onChange(selectedOption ? selectedOption.value : null);
        if (onChange) {
          onChange(selectedOption);
        }
      };

      const customStyles = {
        placeholder: (provided) => ({
          ...provided,
          fontStyle: 'italic',
        }),
      };

      return (
        <div className="flex rounded-md border">
          <Select
            value={options.find((option) => option.value === field.value)}
            onChange={handleChange}
            options={options}
            placeholder={placeholder}
            isClearable
            className="w-full"
            styles={customStyles}
          />
        </div>
      );
    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="KE"
            placeholder={placeholder}
            internationalwithCountryCallingCodevalue={field.value}
            onChange={field.onChange}
            className=""
          />
        </FormControl>
      );

    case FormFieldTypes.EDITOR:
      return (
        <div className="flex rounded-md border">
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="border-0"
            />
          </FormControl>
        </div>
      );

    default:
      break;
  }
};
const CustomFormField = (props) => {
  const { control, name, label, fieldType, iconSrc, iconAlt } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <div className="flex items-center space-x-1 ">
              {iconSrc && (
                <Image
                  src={iconSrc}
                  height={20}
                  width={20}
                  alt={iconAlt || 'icon'}
                  className="ml-2 mr-2"
                />
              )}
              <FormLabel className="font-semibold text-md">{label}</FormLabel>
            </div>
          )}
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CustomFormField;
