"use client";
import { useState } from "react";
import { people } from "../../data";
import { Option } from "../../types";
import { MultiSelect } from "../multi-select";

type Props = {};

export function SelectDemo({}: Props) {
  const [selected, setSelected] = useState<Option[]>([people[0], people[1]]);
  return <MultiSelect value={selected} onChange={setSelected} options={people} />;
}
