export const formatThousand = nominal => {
  if (nominal) {
    const parts = nominal.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  return 0;
};
