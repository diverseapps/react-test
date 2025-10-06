import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "@tanstack/react-router";
import type { Character } from "../types";
import "./CharacterTable.css";

interface Props {
  characters: Character[];
}

const CharacterTable: React.FC<Props> = ({ characters }) => {
  const navigate = useNavigate();

  const columns = React.useMemo<ColumnDef<Character>[]>(() => [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ getValue }) => (
        <img
          src={getValue() as string}
          alt="character"
          className="table-image"
        />
      ),
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "species", header: "Species" },
    { accessorKey: "gender", header: "Gender" },
    {
      accessorKey: "origin.name",
      header: "Origin",
      cell: ({ row }) => row.original.origin.name,
    },
  ], []);

  const table = useReactTable({
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table className="character-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => navigate({ to: `/character/${row.original.id}` })}
              className="table-row"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
