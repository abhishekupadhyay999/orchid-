
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import {
  useAsyncDebounce,
  useExpanded,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
const matchSorter = dynamic(() => import("match-sorter"), {
  ssr: false,
});

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      className="form-control"
      placeholder=""
    />
  );
}

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};
const defaultColumn = {
  Cell: EditableCell,
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
    console.log(value, 'data');
  }

  return (
    <div id="example_filter" className="dataTables_filter">
      <label >
        Search:
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          className=""
          placeholder=""
          type="search"
        />
      </label>
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}


fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data, skipReset, updateMyData }) {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,      
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
      updateMyData,
    },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  // Render the UI for your table
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="dataTables_length" id="example_length">
          <label className="d-flex align-items-center">
            <span className="me-1"> Show </span>
            <div className="dropdown bootstrap-select">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                className="btn dropdown-toggle btn-light"
              >
                {[5, 10, 15, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>{" "}
            <span className="ms-1">entries</span>
          </label>
        </div>

        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <table
        {...getTableProps()}
        className="display dataTable w-100"
        id="example"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  <div>
                    {column.canGroupBy ? (                      
                      <span {...column.getGroupByToggleProps()}></span>
                    ) : null}
                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Image src="/images/sort_desc.png" alt="desc" height={19} width={19}/>
                        ) : (
                          <Image src="/images/sort_asc.png" alt="asc" height={19} width={19} />
                        )
                      ) : (
                        <Image src="/images/sort_both.png" alt="both" height={19} width={19}/>
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? "👇" : "👉"}
                          </span>{" "}
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <div className="dataTables_info">
          Page {pageIndex + 1} of {pageOptions.length}
        </div>

        <div className="dataTables_paginate paging_simple_numbers">
          <div
            className="paginate_button previous disabled c-pointer"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </div>
          <span>
            {Array(pageOptions.length)
              .fill("_")
              .map((page, i) => (
                <a
                  className={`paginate_button c-pointer ${
                    i === pageIndex ? "current" : ""
                  }`}
                  onClick={() => gotoPage(i)}
                  key={i}
                >
                  {i + 1}
                </a>
              ))}
          </span>
          <div
            className="paginate_button next c-pointer"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
}

function FeesCollectionReactTable({ profileTable }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "img",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => (
          <Image src={s.value} className="rounded-circle" width="35" height={35} alt="" />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Department",
        accessor: "department",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Gender",
        accessor: "gender",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Education",
        accessor: "education",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => <strong>{`${s.value}`}</strong>,
      },
      {
        Header: "Email",
        accessor: "email",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => <strong>{`${s.value}`}</strong>,
      },
      {
        Header: "Joining Date",
        accessor: "date",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
    ],
    []
  );

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = React.useRef(false);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [data, setData] = React.useState(() => profileTable);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  React.useEffect(() => {
    skipResetRef.current = false;
  }, [profileTable]);

  return (
    <div className="table-responsive">
      <div id="example_wrapper" className="dataTables_wrapper react-tabel-profile">
        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </div>
    </div>
  );
}

export default FeesCollectionReactTable;
