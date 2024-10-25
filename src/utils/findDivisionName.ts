import { DivisionsProps } from "@/interfaces/DivisionsProps";

export const findDivisionName = (code: number, divisions:DivisionsProps[]): string => {
  if (!divisions || divisions.length === 0) {
    return "Неизвестно";
  }

  const division = divisions.find((div) => div.Code === code);
  
  return division ? division.Name : "Неизвестно";
};