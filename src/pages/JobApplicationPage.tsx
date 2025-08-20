import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import FileInput from "@/components/ui-custom/FileInput";
import NavLink from "@/components/ui-custom/NavLink";
import P from "@/components/ui-custom/P";
import PhoneNumberInput from "@/components/ui-custom/PhoneNumberInput";
import StringInput from "@/components/ui-custom/StringInput";
import { Avatar } from "@/components/ui/avatar";
import { Field } from "@/components/ui/field";
import { R_SPACING } from "@/constants/sizes";
import useActiveCareer from "@/context/useActiveCareer";
import useLang from "@/context/useLang";
import useRequest from "@/hooks/useRequest";
import { fileValidation } from "@/utils/validationSchemas";
import {
  Breadcrumb,
  Container,
  FieldRoot,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import {
  IconBriefcase,
  IconCircleFilled,
  IconHourglassLow,
  IconMapPin,
} from "@tabler/icons-react";
import { useFormik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import * as yup from "yup";

const JobAplicationForm = (props: any) => {
  // Props
  const { activeCareer } = props;

  // Hooks
  const { l } = useLang();
  const { req, loading } = useRequest({
    id: "apply_job",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      resume: undefined as any,
      name: "",
      email: "",
      phone_number: "",
    },
    validationSchema: yup.object().shape({
      resume: fileValidation({
        allowedExtensions: ["pdf"],
        maxSizeMB: 5,
      }).required(l.required_form),
      name: yup.string().required(l.required_form),
      email: yup
        .string()
        .email("Format email tidak valid")
        .required(l.required_form),
      phone_number: yup.string().required(l.required_form),
    }),
    onSubmit: async (values, { resetForm }) => {
      // console.log(values);

      if (!executeRecaptcha) {
        alert("Recaptcha not ready");
        return;
      }

      // 🔑 request token saat submit
      const token = await executeRecaptcha("job_application");
      if (!token) {
        alert("Recaptcha failed");
        return;
      }

      const payload = new FormData();
      payload.append("captcha_token", token);
      payload.append("carrier_id", `${activeCareer.id}`);
      payload.append("resume_id[]", values.resume[0] as any);
      payload.append("name", values.name as string);
      payload.append("email", values.email as string);
      payload.append("phone_number", values.phone_number as string);

      const config = {
        url: `/api/mamura/create-job-application`,
        method: "POST",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: () => {
            formik.setFieldValue("resume", undefined);
            resetForm();
          },
        },
      });
    },
  });

  return (
    <form id="job_application_form" onSubmit={formik.handleSubmit}>
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
            maxFileSize={5}
            accept=".pdf"
          />
        </Field>

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
          label={"Nomor Telepon"}
          invalid={!!formik.errors.phone_number}
          errorText={formik.errors.phone_number as string}
        >
          <PhoneNumberInput
            onChangeSetter={(input) => {
              formik.setFieldValue("phone_number", input);
            }}
            inputValue={formik.values.phone_number}
          />
        </Field>

        {/* <Recaptcha onChange={handleRecaptchaChange} /> */}
      </FieldRoot>

      <BButton
        type="submit"
        form="job_application_form"
        colorPalette={"p"}
        w={"full"}
        mt={6}
        loading={loading}
      >
        Kirim Lamaran
      </BButton>
    </form>
  );
};

const JobApplicationPage = () => {
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
              <CContainer w={["full", null, "40%"]} gap={4}>
                <HStack gap={4}>
                  <Avatar
                    name={activeCareer?.carrier_category?.name}
                    bg={"s.100"}
                    color={"p.600"}
                  />
                  <P fontWeight={"semibold"} lineHeight={1.4}>
                    {activeCareer.title}
                  </P>
                </HStack>

                <HStack gap={4}>
                  <HStack color={"fg.subtle"}>
                    <Icon boxSize={5}>
                      <IconBriefcase />
                    </Icon>

                    <P>{activeCareer.carrier_category?.name}</P>
                  </HStack>

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

              <CContainer w={["full", null, "60%"]} gap={8}>
                <P>KIRIMKAN LAMARAN ANDA</P>

                <JobAplicationForm activeCareer={activeCareer} />
              </CContainer>
            </Stack>
          </CContainer>
        )}
      </Container>
    </CContainer>
  );
};

export default JobApplicationPage;
