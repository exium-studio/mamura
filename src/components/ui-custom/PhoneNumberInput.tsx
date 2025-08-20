import { Interface__SelectOption } from "@/constants/interfaces";
import { HStack, StackProps } from "@chakra-ui/react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { useEffect, useState } from "react";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";

interface Props extends StackProps {
  inputValue?: string;
  onChangeSetter?: (inputValue: string) => void;
  placeholder?: string;
}

const SelectCountry = ({
  inputValue,
  onConfirm,
}: {
  inputValue: Interface__SelectOption[] | undefined;
  onConfirm: (inputValue: Interface__SelectOption[] | undefined) => void;
}) => {
  const countries = getCountries();
  const options = countries.map((code) => {
    return {
      id: `+${getCountryCallingCode(code)}`,
      label: `+${getCountryCallingCode(code)} (${code})`,
    };
  });

  return (
    <SelectInput
      inputValue={inputValue}
      onConfirm={(input) => onConfirm(input)}
      initialOptions={options}
      w={"fit"}
      variant={"surface"}
      border="none !important"
      borderRadius={"full"}
      nonNullable
      // backdrop={false}
    />
  );
};

const PhoneNumberInput = (props: Props) => {
  const { inputValue, onChangeSetter, placeholder, ...restProps } = props;
  const [country, setCountry] = useState<Interface__SelectOption[] | undefined>(
    [
      {
        id: "+62",
        label: "+62 (ID)",
      },
    ]
  );
  const [phone, setPhone] = useState<number | null | undefined>(
    parseInt(inputValue?.split(" ")[1] as string)
      ? parseInt(inputValue?.split(" ")[1] as string)
      : null
  );
  useEffect(() => {
    onChangeSetter?.(`${country?.[0]?.id} ${phone}`);
  }, [phone]);

  return (
    <HStack
      border={"1px solid {colors.border.muted}"}
      borderRadius={"full"}
      w={"full"}
      {...restProps}
    >
      <SelectCountry inputValue={country} onConfirm={setCountry} />
      {/* <DatePickerInput /> */}

      <NumberInput
        noFormat
        w={"full"}
        border="none !important"
        onChangeSetter={(input) => {
          setPhone(input);
        }}
        inputValue={phone}
        placeholder={placeholder}
      />
    </HStack>
  );
};

export default PhoneNumberInput;
