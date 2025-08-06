import BackButton from "@/components/ui-custom/BackButton";
import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui-custom/Disclosure";
import DisclosureHeaderContent from "@/components/ui-custom/DisclosureHeaderContent";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackNotFound from "@/components/ui-custom/FeedbackNotFound";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import ItemContainer from "@/components/ui-custom/ItemContainer";
import ItemHeaderContainer from "@/components/ui-custom/ItemHeaderContainer";
import P from "@/components/ui-custom/P";
import SearchInput from "@/components/ui-custom/SearchInput";
import StringInput from "@/components/ui-custom/StringInput";
import TableComponent from "@/components/ui-custom/TableComponent";
import { Field } from "@/components/ui/field";
import DeleteStatus from "@/components/widget/DeleteStatus";
import SelectProvince from "@/components/widget/SelectProvince";
import useEditCityDisclosure from "@/context/useEditCityDisclosure";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRenderTrigger from "@/context/useRenderTrigger";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import {
  FieldsetRoot,
  HStack,
  Icon,
  StatusIndicator,
  StatusRoot,
  useDisclosure,
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const Create = () => {
  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-city-coverage-area`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud-city-coverage-area",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      province: undefined as any,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(l.required_form),
      province: yup.array().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = new FormData();
      payload.append("name", values.name);
      payload.append("province_id", values.province?.[0]?.id);
      payload.append("is_active", "1");

      const url = `/api/piramid/admin/master-data/city-coverage-area`;
      const config = {
        url,
        method: "POST",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: () => {
            setRt(!rt);
            resetForm();
          },
        },
      });
    },
  });

  return (
    <>
      <BButton
        iconButton
        colorPalette={themeConfig?.colorPalette}
        onClick={onOpen}
      >
        <Icon>
          <IconPlus />
        </Icon>
      </BButton>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={`${l.add} ${l.master_data_navs.city}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="add_city_form" onSubmit={formik.handleSubmit}>
                <Field
                  label={l.name}
                  invalid={!!formik.errors.name}
                  errorText={formik.errors.name as string}
                  mb={4}
                >
                  <StringInput
                    name="name"
                    onChangeSetter={(input) => {
                      formik.setFieldValue("name", input);
                    }}
                    inputValue={formik.values.name}
                  />
                </Field>

                <Field
                  label={l.master_data_navs.province}
                  invalid={!!formik.errors.province}
                  errorText={formik.errors.province as string}
                >
                  <SelectProvince
                    name="province"
                    onConfirm={(input) => {
                      formik.setFieldValue("province", input);
                    }}
                    inputValue={formik.values.province}
                  />
                </Field>
              </form>
            </FieldsetRoot>
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />
            <BButton colorPalette={"p"} type="submit" form="add_city_form">
              {l.add}
            </BButton>
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};

const TableData = (props: any) => {
  // Props
  const { dataState } = props;
  const { data, pagination, limit, setLimit, page, setPage } = dataState;

  // Hooks
  const { l } = useLang();
  const dataId = useEditCityDisclosure((s) => s.data?.id);
  const { req, loading: deleteLoading } = useRequest({
    id: `crud-city-coverage-area-${dataId}`,
  });

  // Contexts
  const { rt, setRt } = useRenderTrigger();
  const setEditCityData = useEditCityDisclosure((s) => s.setData);
  const editCityOnOpen = useEditCityDisclosure((s) => s.onOpen);

  // States
  const ths = [
    {
      th: l.name,
      sortable: true,
    },
    {
      th: l.master_data_navs.province,
      sortable: true,
    },
    {
      th: l.delete_status,
      sortable: true,
    },
  ];
  const tds = data?.map((item: any) => {
    return {
      originalData: item,
      columnsFormat: [
        {
          value: item?.name,
          td: (
            <HStack>
              {item?.deleted_at && (
                <StatusRoot colorPalette={"red"} size={"sm"}>
                  <StatusIndicator />
                </StatusRoot>
              )}

              <P>{item?.name}</P>
            </HStack>
          ),
        },
        {
          value: item?.name,
          td: item?.province?.name,
        },
        {
          value: item?.deleted_at,
          td: item?.deleted_at ? (
            <DeleteStatus deletedAt={item?.deleted_at} />
          ) : (
            ""
          ),
          dataType: "date",
        },
      ],
    };
  });
  const rowOptions = [
    {
      label: "Edit",
      callback: (rowData: any) => {
        setEditCityData(rowData?.originalData);
        editCityOnOpen();
      },
    },
    {
      label: "Restore",
      disabled: (rowData: any): boolean => {
        return !rowData.originalData.deleted_at;
      },
      confirmation: (rowData: any) => ({
        id: `${rowData.id}`,
        title: "Restore?",
        description: `${l.restore_confirmation}`,
        confirmLabel: "Restore",
        confirmCallback: () => {
          back();

          const url = `/api/piramid/admin/master-data/city-coverage-area/${rowData.originalData.id}/restore`;
          const config = {
            url,
            method: "POST",
          };

          req({
            config,
            onResolve: {
              onSuccess: () => {
                setRt(!rt);
              },
            },
          });
        },
      }),
    },
    {
      label: "Delete",
      disabled: (rowData: any) => {
        return rowData.originalData.deleted_at;
      },
      menuItemProps: {
        color: "red.400",
      },
      confirmation: (rowData: any) => ({
        id: `${rowData.id}`,
        title: "Delete?",
        description: `${l.perma_delete_confirmation}`,
        confirmLabel: "Delete",
        confirmButtonProps: {
          colorPalette: "red",
        },
        loading: deleteLoading,
        confirmCallback: () => {
          back();

          const url = `/api/piramid/admin/master-data/city-coverage-area/${rowData.originalData.id}`;
          const config = {
            url,
            method: "DELETE",
          };

          req({
            config,
            onResolve: {
              onSuccess: () => {
                setRt(!rt);
              },
            },
          });
        },
      }),
    },
  ];

  return (
    <TableComponent
      ths={ths}
      tds={tds}
      originalData={data}
      rowOptions={rowOptions}
      limitControl={limit}
      setLimitControl={setLimit}
      pageControl={page}
      setPageControl={setPage}
      pagination={pagination}
    />
  );
};

const MasterDataCity = () => {
  // Contexts
  const { rt } = useRenderTrigger();

  // States
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });
  const dataState = useDataState({
    url: `/api/piramid/admin/master-data/city-coverage-area`,
    method: "GET",
    payload: {
      search: filterConfig.search,
    },
    dependencies: [filterConfig, rt],
  });
  const { data, loading, error, makeRequest } = dataState;
  const render = {
    loading: <ComponentSpinner flex={1} />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    notFound: <FeedbackNotFound />,
    loaded: <TableData dataState={dataState} />,
  };

  return (
    <CContainer flex={1} overflowY={"auto"}>
      <ItemContainer flex={1} overflowY={"auto"}>
        <ItemHeaderContainer borderless>
          <HStack py={2} justify={"space-between"} w={"full"}>
            <SearchInput
              onChangeSetter={(input) => {
                setFilterConfig({
                  ...filterConfig,
                  search: input,
                });
              }}
              inputValue={filterConfig.search}
            />

            <Create />
          </HStack>
        </ItemHeaderContainer>

        {loading && render.loading}
        {!loading && (
          <>
            {error && render.error}
            {!error && (
              <>
                {data && render.loaded}

                {!data && render.empty}
              </>
            )}
          </>
        )}
      </ItemContainer>
    </CContainer>
  );
};

export default MasterDataCity;
