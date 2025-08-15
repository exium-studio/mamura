import { Interface__Select } from "@/constants/interfaces";
import useRequest from "@/hooks/useRequest";
import SelectInput from "../ui-custom/SelectInput";

interface Props extends Interface__Select {}
const SelectCareerCategory = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const { req } = useRequest({
    id: "select_career_category",
    showLoadingToast: false,
    showSuccessToast: false,
  });

  // Utils
  function fetch(setOptions: any) {
    const config = {
      url: `/api/mamura/public-request/get-carrier-category`,
      method: "GET",
      params: {
        with_trashed: 0,
        limit: Infinity,
      },
    };

    req({
      config,
      onResolve: {
        onSuccess: (r) => {
          const newOptions = r?.data?.data?.map((item: any) => ({
            id: item?.id,
            label: `${item?.name}`,
          }));
          setOptions(newOptions);
        },
      },
    });
  }

  return (
    <SelectInput
      id="select-career-category"
      title={"Kategori"}
      fetch={fetch}
      {...restProps}
    />
  );
};

export default SelectCareerCategory;
