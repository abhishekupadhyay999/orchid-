import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { Dropdown } from "react-bootstrap";
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
    <div id="example_filter" className="dataTables_filter ">
      <label className="d-flex align-items-center">
        <span className="me-2">Search:</span>

        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          className="form-control"
          placeholder=""
        />
      </label>
    </div>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="form-control"
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Be sure to pass our updateMyData and the skipReset option
function Table({ columns, data, skipReset }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
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
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
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
    useRowSelect,

    // Here we will use a plugin to add our selection column
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            // Make this column a groupByBoundary. This ensures that groupBy columns
            // are placed after it
            groupByBoundary: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ];
      });
    }
  );

  // Render the UI for your table
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
                {[5, 10, 15, 20].map((pageSize, i) => (
                  <option key={pageSize}  value={pageSize}>
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
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()} key={i}>
                  <div>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}></span>
                    ) : null}
                    <span className="d-flex" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Image src="/images/sort_desc.png" alt="desc"  height={15} width={15}/>
                        ) : (
                          <Image src="/images/sort_asc.png" alt="asc"  height={15} width={15}/>
                        )
                      ) : (
                        <Image src="/images/sort_both.png" alt="both"  height={15} width={15}/>
                      )}
                    </span>
                  </div>
                  {/* Render the columns filter UI */}
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()} key={i}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? "👇" : "👉"}
                          </span>{" "}
                          {cell.render("Cell", { editable: false })} (
                          {row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render("Cell", { editable: true })
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

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="form-check-input"
        />
      </>
    );
  }
);

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox'

function PatientReactTable({ patientTable }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Patient ID",
        accessor: "id",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `#${s.value}`,
      },
      {
        Header: "Date Check in",
        accessor: "date",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Patient Name",
        accessor: "name",
        invoiceNumber: true,
        Cell: (s) => `#${s.value}`,
        //    Aggregated: ({ value }) => `${value}`,
      },
      {
        Header: "Doctor Assgined",
        accessor: "assgined",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Disease",
        accessor: "disease",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Status",
        accessor: "status",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => (
          <span className={`badge light badge-${s.value.color}`}>
            <i className="fa fa-circle text-danger me-1"></i>
            {s.value.text}
          </span>
        ),
      },
      {
        Header: "Room no",
        accessor: "roomNo",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => `${s.value}`,
      },
      {
        Header: "Action",
        accessor: "price",
        Aggregated: ({ value }) => `${value}`,
        Cell: (s) => (
          <Dropdown className="ms-auto text-right">
            <Dropdown.Toggle
              as="a"
              variant=""
              className="btn-link i-false c-pointer"
            >
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <rect x={0} y={0} width={24} height={24} />
                  <circle fill="#000000" cx={5} cy={12} r={2} />
                  <circle fill="#000000" cx={12} cy={12} r={2} />
                  <circle fill="#000000" cx={19} cy={12} r={2} />
                </g>
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight={true}>
              <Dropdown.Item>Accept Patient</Dropdown.Item>
              <Dropdown.Item>Reject Order</Dropdown.Item>
              <Dropdown.Item>View Details</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
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
  }, [patientTable]);

  return (
    <div className="table-responsive">
      <div id="example_wrapper" className="dataTables_wrapper react-tabel-profile">
        <Table columns={columns} data={patientTable} />
      </div>
    </div>
  );
}

export default PatientReactTable;
