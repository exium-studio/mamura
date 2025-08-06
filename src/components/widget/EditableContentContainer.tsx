import CContainer from "@/components/ui-custom/CContainer";
import { Interface__Content } from "@/constants/interfaces";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { CONTENT_TYPES } from "@/static/selectOptions";
import empty from "@/utils/empty";
import { SimpleGrid, StackProps, useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Dispatch, useEffect, useState } from "react";
import * as yup from "yup";
import BackButton from "../ui-custom/BackButton";
import BButton from "../ui-custom/BButton";
import ComponentSpinner from "../ui-custom/ComponentSpinner";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "../ui-custom/Disclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import FeedbackNoData from "../ui-custom/FeedbackNoData";
import FeedbackRetry from "../ui-custom/FeedbackRetry";
import FileInput from "../ui-custom/FileInput";
import P from "../ui-custom/P";
import StringInput from "../ui-custom/StringInput";
import Textarea from "../ui-custom/Textarea";
import { Field } from "../ui/field";
import ExistingFileItem from "./ExistingFIleItem";

interface Props extends StackProps {
  contentId: number;
  setData?: Dispatch<any>;
  contentProps?: any;
}

const DUMMY = {
  id: 0,
  content: "Mamura",
  content_type: CONTENT_TYPES[0],
  content_file: [] as any,
};
const CONTENT_TYPE_FILE_INPUT_IDS = [2, 3, 4, 5];

const ContentEditor = (props: any) => {
  // Props
  const { contentId, data, setData } = props;

  // Hooks
  const { req } = useRequest({
    id: "crud_content",
  });

  // States
  const fileInput = data
    ? CONTENT_TYPE_FILE_INPUT_IDS.includes(data.content_type.id as number)
    : false;
  const [existingFile, setExistingFile] = useState<any[]>([]);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      content: "" as any,
      file: [] as any,
      deleted_file: [] as any,
    },
    validationSchema: yup.object().shape({}),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      const payload = new FormData();
      payload.append("_method", "patch");
      payload.append("content", values.content as string);

      const config = {
        url: ``,
        method: "POST",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: () => {
            const newData = {
              ...data,
              [contentId]: { ...data[contentId], content: values.content },
            };
            setData?.(newData);
            resetForm();
          },
        },
      });
    },
  });

  // Handle initial values
  useEffect(() => {
    if (data) {
      if (fileInput) {
        setExistingFile(data.content_file);
      } else {
        formik.setValues({
          content: data.content,
          file: [],
          deleted_file: [],
        });
      }
    }
  }, [data]);

  return (
    <CContainer>
      <form id="edit_content_form" onSubmit={formik.handleSubmit}>
        <Field label={"Konten"}>
          {fileInput && (
            <>
              {!empty(existingFile) && (
                <CContainer>
                  {existingFile?.map((item: any, i: number) => {
                    return (
                      <ExistingFileItem
                        key={i}
                        data={item}
                        onDelete={() => {
                          setExistingFile((prev) =>
                            prev.filter((f) => f !== item)
                          );
                          formik.setFieldValue("deleted_file", [
                            ...formik.values.deleted_file,
                            item,
                          ]);
                        }}
                      />
                    );
                  })}
                </CContainer>
              )}

              {empty(existingFile) && (
                <FileInput
                  dropzone
                  name="file"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("file", input);
                  }}
                  inputValue={formik.values.file}
                  accept=".png, .jpg, .jpeg,"
                />
              )}

              {!empty(formik.values.deleted_file) && (
                <CContainer gap={2} mt={2}>
                  <P color={"fg.muted"}>File dihapus</P>

                  {formik.values.deleted_file?.map((item: any, i: number) => {
                    return (
                      <ExistingFileItem
                        key={i}
                        data={item}
                        withDeleteButton={false}
                        withUndobutton
                        onUndo={() => {
                          setExistingFile((prev) => [...prev, item]);

                          formik.setFieldValue(
                            "deleted_file",
                            formik.values.deleted_file.filter(
                              (f: any) => f !== item
                            )
                          );

                          formik.setFieldValue("icon", undefined);
                        }}
                      />
                    );
                  })}
                </CContainer>
              )}
            </>
          )}

          {!fileInput && (
            <Textarea
              onChangeSetter={(input) => {
                formik.setFieldValue("content", input);
              }}
              inputValue={formik.values.content}
            />
          )}
        </Field>
      </form>
    </CContainer>
  );
};

const EditableContentContainer = (props: Props) => {
  // Props
  const { children, contentId, setData, contentProps, ...restProps } = props;

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`edit-content-${contentId}`, open, onOpen, onClose);

  // States
  const cmsActive = true;
  const { error, loading, data, makeRequest } =
    useDataState<Interface__Content>({
      initialData: DUMMY,
      url: ``,
    });
  const [hover, setHover] = useState<boolean>(false);
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer gap={2}>
        <SimpleGrid columns={2} gap={4}>
          <Field label={"ID Konten"} readOnly>
            <StringInput inputValue={`${contentId}`} />
          </Field>

          <Field label={"Tipe Konten"} readOnly>
            <StringInput inputValue={`${data?.content_type?.name}`} />
          </Field>
        </SimpleGrid>

        <ContentEditor contentId={contentId} data={data} setData={setData} />
      </CContainer>
    ),
  };

  useEffect(() => {
    if (open) {
      makeRequest();
    }
  }, [open]);

  return (
    <>
      <CContainer
        w={"fit"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        pos={"relative"}
        cursor={cmsActive ? "pointer" : "auto"}
        onClick={() => {
          if (cmsActive) {
            onOpen();
          }
        }}
        {...restProps}
      >
        {cmsActive && (
          <>
            {hover && (
              <CContainer
                w={"full"}
                h={"full"}
                bg={"s.500"}
                pos={"absolute"}
                top={0}
                left={0}
                opacity={0.5}
              />
            )}
          </>
        )}

        {children}
      </CContainer>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={`Edit Konten`} />
          </DisclosureHeader>

          <DisclosureBody>
            {loading && render.loading}
            {!loading && (
              <>
                {error && render.error}
                {!error && (
                  <>
                    {data && render.loaded}
                    {(!data || empty(data)) && render.empty}
                  </>
                )}
              </>
            )}
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />

            <BButton type="submit" form="edit_content_form" colorPalette={"p"}>
              Simpan
            </BButton>
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};

export default EditableContentContainer;
