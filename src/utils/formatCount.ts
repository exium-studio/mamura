const formatCount = (number?: number): string => {
  if (typeof number !== "number" || isNaN(number)) return "0";

  const units = ["", "K", "Jt", "Ml", "Tr", "P", "E"];
  let index = 0;

  while (number >= 1000 && index < units.length - 1) {
    number /= 1000;
    index++;
  }

  return `${number}${units[index]}`;
};

export default formatCount;
