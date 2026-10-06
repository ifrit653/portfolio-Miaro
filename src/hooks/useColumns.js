import { useEffect, useState } from "react";

const BREAKPOINTS = [
  ["(min-width: 1024px)", 4],
  ["(min-width: 768px)", 3],
];

function read() {
  for (const [query, columns] of BREAKPOINTS) {
    if (window.matchMedia(query).matches) return columns;
  }
  return 2;
}

export function useColumns() {
  const [columns, setColumns] = useState(read);

  useEffect(() => {
    const lists = BREAKPOINTS.map(([query]) => window.matchMedia(query));
    const update = () => setColumns(read());
    lists.forEach((mq) => mq.addEventListener("change", update));
    return () => lists.forEach((mq) => mq.removeEventListener("change", update));
  }, []);

  return columns;
}