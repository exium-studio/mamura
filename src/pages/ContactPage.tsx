import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import Heading2 from "@/components/ui-custom/Heading2";
import Img from "@/components/ui-custom/Img";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import StringInput from "@/components/ui-custom/StringInput";
import Textarea from "@/components/ui-custom/Textarea";
import { Field } from "@/components/ui/field";
import Container from "@/components/widget/Container";
import EditableContentContainer from "@/components/widget/EditableContentContainer";
import { R_SPACING } from "@/constants/sizes";
import useContents from "@/context/useContents";
import { Breadcrumb, FieldRoot, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";

const ContactForm = () => {
  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      message: "",
    },
    validationSchema: yup.object().shape({}),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <form id="contact_form">
      <FieldRoot mt={2} gap={4}>
        <Field
          label={"Nama Lengkap"}
          invalid={!!formik.errors.name}
          errorText={formik.errors.name as string}
        >
          <StringInput
            onChangeSetter={(input) => {
              formik.setFieldValue("name", input);
            }}
            inputValue={formik.values.name}
          />
        </Field>

        <Field
          label={"Nomor Telepon Aktif"}
          invalid={!!formik.errors.phone}
          errorText={formik.errors.phone as string}
        >
          <StringInput
            onChangeSetter={(input) => {
              formik.setFieldValue("phone", input);
            }}
            inputValue={formik.values.phone}
          />
        </Field>

        <Field
          label={"Email"}
          invalid={!!formik.errors.email}
          errorText={formik.errors.email as string}
        >
          <StringInput
            onChangeSetter={(input) => {
              formik.setFieldValue("email", input);
            }}
            inputValue={formik.values.email}
          />
        </Field>

        <Field
          label={"Alamat Lengkap"}
          invalid={!!formik.errors.address}
          errorText={formik.errors.address as string}
        >
          <Textarea
            onChangeSetter={(input) => {
              formik.setFieldValue("address", input);
            }}
            inputValue={formik.values.address}
          />
        </Field>

        <Field
          label={"Pesan"}
          invalid={!!formik.errors.message}
          errorText={formik.errors.message as string}
        >
          <Textarea
            onChangeSetter={(input) => {
              formik.setFieldValue("message", input);
            }}
            inputValue={formik.values.message}
          />
        </Field>
      </FieldRoot>
    </form>
  );
};

const ContactPage = () => {
  // Contexts
  const allContents = useContents((s) => s.data);

  // States
  const contents = allContents?.contents;

  return (
    <CContainer pt={R_SPACING}>
      <Container>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <NavLink to="/">
                <Breadcrumb.Link>Beranda</Breadcrumb.Link>
              </NavLink>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Link color={"p.500"} fontWeight={"semibold"}>
                Kontak
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <CContainer mt={6} pb={"80px"}>
          <Stack flexDir={["column-reverse", null, "row"]} gap={R_SPACING}>
            <CContainer w={["full", null, "60%"]} gap={4}>
              <EditableContentContainer contentId={64} content={contents?.[64]}>
                <Heading2 fontWeight={"bold"}>{contents?.[64]}</Heading2>
              </EditableContentContainer>

              <EditableContentContainer contentId={65} content={contents?.[65]}>
                <P color={"fg.subtle"}>{contents?.[65]}</P>
              </EditableContentContainer>

              <ContactForm />

              <CContainer gap={2}>
                <EditableContentContainer
                  contentId={66}
                  content={contents?.[66]}
                >
                  <P>{contents?.[66]}</P>
                </EditableContentContainer>

                <EditableContentContainer
                  contentId={67}
                  content={contents?.[67]}
                >
                  <P>{contents?.[67]}</P>
                </EditableContentContainer>

                <BButton colorPalette={"p"} mt={4}>
                  Kirim Sekarang
                </BButton>
              </CContainer>
            </CContainer>

            <CContainer w={["full", null, "40%"]}>
              <EditableContentContainer
                contentId={63}
                content={contents?.[63]}
                fileInput
                w={"full"}
              >
                <Img src={contents?.[63]} w={"full"} />
              </EditableContentContainer>
            </CContainer>
          </Stack>
        </CContainer>
      </Container>
    </CContainer>
  );
};

export default ContactPage;
