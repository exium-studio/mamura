import { IMAGES_PATH } from "./paths";

export const DUMMY_CONTENTS = {
  contents: {
    6: "Pilihan Tepat untuk Wifi Hemat Tanpa Drama",
    7: "100%",
    8: "Fiber Optic",
    9: "1:1",
    10: "Simetris Download:Upload",
    11: "100%",
    12: "Internet UNLIMITED",
    13: `${IMAGES_PATH}/internet.png`,
    14: `Internetan Unlimited & Hemat? Pilihan Tepat: Mamura`,
    15: `Super lancar, super hemat, tanpa drama. #WifiMurah terbaik untuk segala kebutuhan Anda.`,
  },
  promo: [
    {
      image: {
        id: 1,
        file_url: `${IMAGES_PATH}/promo.png`,
      },
    },
    {
      image: {
        id: 2,
        file_url: `${IMAGES_PATH}/promo.png`,
      },
    },
  ],
  pricing: {
    home: [
      {
        name: "Home Fiber Access 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        speed: 25,
        price: 185000,
        is_recommended: true,
      },
      {
        name: "Home Fiber Access 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        speed: 45,
        price: 185000,
        is_recommended: false,
      },
      {
        name: "Home Fiber Access 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        speed: 65,
        price: 185000,
        is_recommended: false,
      },
      {
        name: "Home Fiber Access 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        speed: 100,
        price: 185000,
        is_recommended: false,
      },
    ],
    bussiness: [
      {
        name: "Bisnis Fiber Access 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        speed: 100,
        price: 185000,
        is_recommended: true,
      },
      {
        name: "Bisnis Fiber Access 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        speed: 200,
        price: 185000,
        is_recommended: false,
      },
      {
        name: "Bisnis Fiber Access 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        speed: 300,
        price: 185000,
        is_recommended: false,
      },
      {
        name: "Bisnis Fiber Access 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        speed: 400,
        price: 185000,
        is_recommended: false,
      },
    ],
  },
};
