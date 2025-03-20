import Image from "next/image";
import dynamic from "next/dynamic";
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
        setFilter(e.target.value || undefined); 
      }}
      className="form-control"
      placeholder=""
    />
  );
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  }

  return (
    <div id="example_filter" className="dataTables_filter">
      <label className="d-flex align-items-center">
        Search:
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          type="search"
          className=""
          placeholder=""
        />
      </label>
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}


fuzzyTextFilterFn.autoRemove = (val) => !val;


function Table({ columns, data, skipReset }) {
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

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    
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
    },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
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
            <tr {...headerGroup.getHeaderGroupProps()} key={ headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={ column.id}>
                  <div>
                    {column.canGroupBy ? (
                      
                      <span {...column.getGroupByToggleProps()}></span>
                    ) : null}
                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}                      
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Image src="/images/sort_desc.png" alt="desc"
                            width={15}
                            height={15}
                          />
                        ) : (
                            <Image src="/images/sort_asc.png" alt="asc"
                              width={15}
                              height={15}
                            />
                        )
                      ) : (
                          <Image
                            src="/images/sort_both.png" alt="both"
                            width={15}
                            height={15}
                          />
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
                    <td {...cell.getCellProps()} key={ cell.id}>
                      {cell.isGrouped ? (                        
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

      <div className="d-flex d-flex justify-content-between align-items-center">
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
                  key={page.id}
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

function FeesCollectionReactTable({ feeTable }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Roll",
        accessor: "roll",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Student Name",
        accessor: "name",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Invoice number",
        accessor: "invoiceNumber",
        invoiceNumber: true,
        Cell: (s) => `#${s.value}`,
        //    Aggregated: ({ value }) => `${value}`,
      },
      {
        Header: "Fees Type",
        accessor: "feeType",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Payment Type",
        accessor: "paymentType",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Status",
        accessor: "status",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => (
          <span className={`badge light badge-${s.value.color}`}>
            {s.value.text}
          </span>
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Amount",
        accessor: "price",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => <strong>{`${s.value}$`}</strong>,
      },
    ],
    []
  );

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = React.useRef(false);

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    skipResetRef.current = false;
  }, [feeTable]);

  return (
    <div className="table-responsive">
      <div id="example_wrapper" className="dataTables_wrapper react-tabel-profile">
        <Table columns={columns} data={feeTable} />
      </div>
    </div>
  );
}

export default FeesCollectionReactTable;
