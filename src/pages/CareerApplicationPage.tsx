import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import FileInput from "@/components/ui-custom/FileInput";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import StringInput from "@/components/ui-custom/StringInput";
import { Avatar } from "@/components/ui/avatar";
import { Field } from "@/components/ui/field";
import { R_SPACING } from "@/constants/sizes";
import useActiveCareer from "@/context/useActiveCareer";
import useLang from "@/context/useLang";
import {
  Breadcrumb,
  Container,
  FieldRoot,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import {
  IconCircleFilled,
  IconHourglassLow,
  IconMapPin,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import * as yup from "yup";

const JobAplicationForm = () => {
  // Hooks
  const { l } = useLang();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: { resume: undefined as any, name: "", email: "", phone: "" },
    validationSchema: yup.object().shape({
      resume: yup.array().required(l.required_form),
      name: yup.string().required(l.required_form),
      email: yup.string().required(l.required_form),
      phone: yup.string().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <form id="job_application_form">
      <FieldRoot gap={4}>
        <Field
          label="Resume"
          invalid={!!formik.errors.resume}
          errorText={formik.errors.resume as string}
        >
          <FileInput
            dropzone
            onChangeSetter={(input) => {
              formik.setFieldValue("resume", input);
            }}
            inputValue={formik.values.resume}
          />
        </Field>

        <Field
          label={"Nama Lengkap"}
          invalid={!!formik.errors.resume}
          errorText={formik.errors.resume as string}
        >
          <StringInput
            onChangeSetter={(input) => {
              formik.setFieldValue("name", input);
            }}
            inputValue={formik.values.name}
          />
        </Field>

        <Field
          label={"Email"}
          invalid={!!formik.errors.resume}
          errorText={formik.errors.resume as string}
        >
          <StringInput
            onChangeSetter={(input) => {
              formik.setFieldValue("email", input);
            }}
            inputValue={formik.values.email}
          />
        </Field>

        <Field
          label={"Nomor Telepon"}
          invalid={!!formik.errors.resume}
          errorText={formik.errors.resume as string}
        >
          <StringInput
            onChangeSetter={(input) => {
              formik.setFieldValue("phone", input);
            }}
            inputValue={formik.values.phone}
          />
        </Field>
      </FieldRoot>

      <BButton
        type="submit"
        form="job_application_form"
        colorPalette={"p"}
        w={"full"}
        mt={6}
      >
        Kirim Lamaran
      </BButton>
    </form>
  );
};

const CareerApplicationPage = () => {
  // Contexts
  const activeCareer = useActiveCareer((s) => s.activeCareer);

  return (
    <CContainer pt={R_SPACING}>
      <Container pb={["32px", null, "80px"]}>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <NavLink to="/">
                <Breadcrumb.Link>Beranda</Breadcrumb.Link>
              </NavLink>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <NavLink to="/karir">
                <Breadcrumb.Link>Karir</Breadcrumb.Link>
              </NavLink>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Link color={"p.500"} fontWeight={"semibold"}>
                Formulir
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        {activeCareer && (
          <CContainer mt={6}>
            <Stack flexDir={["column", null, "row"]}>
              <CContainer w={"30%"} gap={4}>
                <HStack gap={4}>
                  <Avatar
                    name={activeCareer?.carrier_category?.name}
                    bg={"s.100"}
                    color={"p.600"}
                  />
                  <P fontWeight={"semibold"}>
                    {activeCareer?.carrier_category?.name}
                  </P>
                </HStack>

                <HStack gap={4}>
                  <HStack color={"fg.subtle"}>
                    <Icon boxSize={5}>
                      <IconHourglassLow />
                    </Icon>

                    <P>{activeCareer.employee_status?.name}</P>
                  </HStack>

                  <HStack color={"fg.subtle"}>
                    <Icon boxSize={5}>
                      <IconMapPin />
                    </Icon>

                    <P>{activeCareer.job_location?.name}</P>
                  </HStack>
                </HStack>

                <CContainer gap={2}>
                  <P>Kualifikasi:</P>

                  <CContainer>
                    {activeCareer?.qualification?.map((qual, i) => {
                      return (
                        <HStack key={i}>
                          <Icon boxSize={1}>
                            <IconCircleFilled />
                          </Icon>
                          <P>{qual}</P>
                        </HStack>
                      );
                    })}
                  </CContainer>
                </CContainer>
              </CContainer>

              <CContainer w={"70%"} gap={8}>
                <P>KIRIMKAN LAMARAN ANDA</P>

                <JobAplicationForm />
              </CContainer>
            </Stack>
          </CContainer>
        )}
      </Container>
    </CContainer>
  );
};

export default CareerApplicationPage;
