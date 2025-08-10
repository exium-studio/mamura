import CContainer from "@/components/ui-custom/CContainer";
import { HStack, Icon, StackProps } from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as yup from "yup";
import BButton from "../ui-custom/BButton";
import NumberInput from "../ui-custom/NumberInput";
import P from "../ui-custom/P";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu";
import { toaster } from "../ui/toaster";
import { Dispatch } from "react";

interface Props extends Omit<StackProps, "page"> {
  pagination: any;
  page: number;
  setPage: Dispatch<number>;
}

const PaginationControl = (props: Props) => {
  const { pagination, page, setPage, ...restProps } = props;

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      page: page || pagination?.meta?.current_page,
    },
    validationSchema: yup.object().shape({
      page: yup.number(),
    }),
    onSubmit: (values) => {
      if (
        values.page &&
        values.page > 0 &&
        values.page <= pagination?.meta?.last_page
      ) {
        setPage?.(values.page);
      } else {
        toaster.create({
          type: "error",
          title: `Lompat Page Gagal`,
          description: `Input harus lebih dari 0 dan kurang dari/sama dengan halaman terakhir`,
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
    },
  });

  return (
    <HStack justify={"center"} gap={0} {...restProps}>
      <BButton
        iconButton
        variant={"ghost"}
        size={"sm"}
        onClick={() => {
          if (page > 1) {
            setPage?.(page - 1);
          }
        }}
      >
        <Icon>
          <IconChevronLeft />
        </Icon>
      </BButton>

      <MenuRoot>
        <MenuTrigger asChild>
          <Button
            variant={"ghost"}
            fontSize={"16px !important"}
            borderRadius={"full"}
          >
            {`${1} of ${pagination?.meta?.last_page || "?"}`}
          </Button>
        </MenuTrigger>

        <MenuContent w={"140px"}>
          <CContainer px={2} py={1} mb={1}>
            <P fontSize={"sm"} opacity={0.5} fontWeight={500} color={"light"}>
              {`Terakhir : ${pagination?.meta?.last_page || "?"}`}
            </P>
          </CContainer>

          <form id="page-jump-form" onSubmit={formik.handleSubmit}>
            <Field>
              <NumberInput
                inputValue={formik.values.page}
                onChangeSetter={(input) => {
                  formik.setFieldValue("page", input);
                }}
                color={"light"}
                textAlign={"center"}
                borderColor={"d3 !important"}
                // _focus={{ borderColor: themeConfig.primaryColor }}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    formik.submitForm();
                  }
                }}
              />
            </Field>
          </form>

          <BButton
            type="submit"
            form="page-jump-form"
            w={"full"}
            mt={1}
            className="btn-solid"
            borderColor={"d3"}
            borderRadius={6}
            // variant={"outline"}
            color={"white"}
          >
            Go
          </BButton>
        </MenuContent>
      </MenuRoot>

      <BButton
        iconButton
        variant={"ghost"}
        size={"sm"}
        onClick={() => {
          if (page < pagination?.meta?.last_page) {
            setPage?.(page + 1);
          }
        }}
      >
        <Icon>
          <IconChevronRight />
        </Icon>
      </BButton>
    </HStack>
  );
};

export default PaginationControl;
