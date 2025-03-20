import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import PageTitle_ from "../../src/components/PageTitle";

import {
  deleteBorderTable,
  deleteExamToppers,
  deleteRecentPayment,
  deleteStrippedTable,
  getBsTableData,
} from "../../src/redux/action/tableAction";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
const Bootstrap = ({
  pageTitle,
  getBsTableData,
  bsTables,
  recentPayment,
  examTopper,
  borderTable,
  tableStripped,
  // Delete
  deleteRecentPayment,
  deleteExamToppers,
  deleteBorderTable,
  deleteStrippedTable,
}) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("Table");
    getBsTableData();
  }, []);
  const [recentPaymentData, setRecentPaymentData] = useState(false);
  const [examToppermodal, setExamToppermodal] = useState(false);
  const [borderTableModal, setBorderTableModal] = useState(false);
  const [tableStrippedModal, setTableStrippedModal] = useState(false);
  const [editAble, setEditAble] = useState(null);


  const chackbox = document.querySelectorAll(".bs_exam_topper input");
  const motherChackBox = document.querySelector(".bs_exam_topper_all input");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  return (
    <Fragment>
      <PageTitle_ active="Bootstrap" mother="Table" customText={true} />      

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Recent Payments Queue</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th style={{ width: 80 }}>
                        <strong>#</strong>
                      </th>
                      <th>
                        <strong>PATIENT</strong>
                      </th>
                      <th>
                        <strong>DR NAME</strong>
                      </th>
                      <th>
                        <strong>DATE</strong>
                      </th>
                      <th>
                        <strong>STATUS</strong>
                      </th>
                      <th>
                        <strong>PRICE</strong>
                      </th>
                      <th >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayment &&
                      recentPayment.map((table, i) => (
                        <tr key={i}>
                          <td>
                            <strong>{table.id}</strong>
                          </td>
                          <td>{table.name}</td>
                          <td>{table.drName}</td>
                          <td>{table.date}</td>
                          <td>
                            <span
                              className={`badge light badge-${table.color}`}
                            >
                              {table.status}
                            </span>
                          </td>
                          <td>${table.price}</td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant=""
                                as="button"
                                className={`btn btn-${table.color} i-false light sharp`}
                              >
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 24 24"
                                  version="1.1"
                                >
                                  <g
                                    stroke="none"
                                    strokeWidth={1}
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <rect x={0} y={0} width={24} height={24} />
                                    <circle
                                      fill="#000000"
                                      cx={5}
                                      cy={12}
                                      r={2}
                                    />
                                    <circle
                                      fill="#000000"
                                      cx={12}
                                      cy={12}
                                      r={2}
                                    />
                                    <circle
                                      fill="#000000"
                                      cx={19}
                                      cy={12}
                                      r={2}
                                    />
                                  </g>
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    setEditAble({ table, id: i });
                                    setRecentPaymentData(true);
                                  }}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deleteRecentPayment(i)}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Exam Toppers</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                
                <table className="table table-responsive-md">
                  <thead>
                    <tr>
                      <th className="width50 ">
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper_all">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkAll"
                            required=""
                            onClick={() => chackboxFun("all")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkAll"
                          ></label>
                        </div>
                      </th>
                      <th>
                        <strong>ROLL NO.</strong>
                      </th>
                      <th>
                        <strong>NAME</strong>
                      </th>
                      <th>
                        <strong>Email</strong>
                      </th>
                      <th>
                        <strong>Date</strong>
                      </th>
                      <th>
                        <strong>Status</strong>
                      </th>
                      <th className="text-end">
                        <strong>Action</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox2"
                            required=""
                            onClick={() => chackboxFun()}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox2"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <strong>542</strong>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image
                            src="/images/avatar/1.jpg"
                            className="rounded-lg me-2"
                            width="30"
                            height="30"
                            alt=""
                          />{" "}
                          <span className="w-space-no">Dr. Jackson</span>
                        </div>
                      </td>
                      <td>example@example.com </td>
                      <td>01 August 2020</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="fa fa-circle text-success me-1"></i>{" "}
                          Successful
                        </div>
                      </td>
                      <td className="">
                        <div className="d-flex justify-content-end">
                          <Link
                            href="#"
                            scroll={false}
                            passHref
                            className="btn btn-primary shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                          <Link
                            href="#"
                            scroll={false}
                            passHref
                            className="btn btn-danger shadow btn-xs sharp"
                          >
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox3"
                            required=""
                            onClick={() => chackboxFun()}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox3"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <strong>542</strong>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image
                            src="/images/avatar/2.jpg"
                            className="rounded-lg me-2"
                            width="30"
                            height="30"
                            alt=""
                          />{" "}
                          <span className="w-space-no">Dr. Jackson</span>
                        </div>
                      </td>
                      <td>example@example.com </td>
                      <td>01 August 2020</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="fa fa-circle text-danger me-1"></i>{" "}
                          Canceled
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end">
                          <Link
                            href="#"
                            scroll={false}
                            passHref
                            className="btn btn-primary shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                          <Link
                            href="#"
                            scroll={false}
                            passHref
                            className="btn btn-danger shadow btn-xs sharp"
                          >
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check custom-checkbox checkbox-success check-lg me-3 bs_exam_topper">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox4"
                            required=""
                            onClick={() => chackboxFun()}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheckBox4"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <strong>542</strong>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image
                            src="/images/avatar/3.jpg"
                            className="rounded-lg me-2"
                            width="30"
                            height="30"
                            alt=""
                          />{" "}
                          <span className="w-space-no">Dr. Jackson</span>
                        </div>
                      </td>
                      <td>example@example.com </td>
                      <td>01 August 2020</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="fa fa-circle text-warning me-1"></i>{" "}
                          Pending
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end">
                          <Link
                            href="#"
                            scroll={false}
                            passHref
                            className="btn btn-primary shadow btn-xs sharp me-1"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                          <Link
                            href="#"
                            scroll={false}
                            passHref
                            className="btn btn-danger shadow btn-xs sharp"
                          >
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Basic</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-responsive-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.basic.map((table, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{table.name}</td>
                          <td>
                            <span className={`badge badge-${table.color}`}>
                              {table.status}
                            </span>
                          </td>
                          <td>{table.date}</td>
                          <td className="color-primary">${table.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Table Striped</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-responsive-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.basic.map((table, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{table.name}</td>
                          <td>
                            <span className={`badge badge-${table.color}`}>
                              {table.status}
                            </span>
                          </td>
                          <td>{table.date}</td>
                          <td className="color-primary">${table.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Table Bordered</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-responsive-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.basic.map((table, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{table.name}</td>
                          <td>
                            <span className={`badge badge-${table.color}`}>
                              {table.status}
                            </span>
                          </td>
                          <td>{table.date}</td>
                          <td className="color-primary">${table.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Table Hover</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-responsive-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.basic.map((table, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{table.name}</td>
                          <td>
                            <span className={`badge badge-${table.color}`}>
                              {table.status}
                            </span>
                          </td>
                          <td>{table.date}</td>
                          <td className="color-primary">${table.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* /# card */}
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Hover Table</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table header-border table-hover verticle-middle">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Popularity</th>
                      <th scope="col">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.hoverTable.map((table, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{table.name}</td>
                          <td>
                            <div
                              className="progress"
                              style={{ background: table.progressbar }}
                            >
                              <div
                                className={`progress-bar bg-${
                                  table.color.split(" ")[0]
                                }`}
                                style={{ width: `${table.value}%` }}
                                role="progressbar"
                              >
                                <span className="sr-only">
                                  {table.value}% Complete
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`badge badge-${table.color}`}>
                              {table.value}%
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Bordered Table</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered verticle-middle table-responsive-sm">
                  <thead>
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Progress</th>
                      <th scope="col">Deadline</th>
                      <th scope="col">Label</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borderTable &&
                      borderTable.map((table, i) => (
                        <tr key={i}>
                          <td>{table.task}</td>
                          <td>
                            <div
                              className="progress"
                              style={{ background: table.progressbar }}
                            >
                              <div
                                className={`progress-bar bg-${
                                  table.color.split(" ")[0]
                                }`}
                                style={{ width: `${table.value}%` }}
                                role="progressbar"
                              >
                                <span className="sr-only">
                                  {table.value}% Complete
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>{table.dadeLine}</td>
                          <td>
                            <span className={`badge badge-${table.color}`}>
                              {table.value}%
                            </span>
                          </td>
                          <td>
                            <span>
                              <Link href="#"
                                scroll={false}
                                passHref
                                  className="me-4"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Edit"
                                  onClick={() => {
                                    setEditAble({ table, id: i });
                                    setBorderTableModal(true);
                                  }}
                                >
                                  <i className="fa fa-pencil color-muted" />{" "}                                
                              </Link>

                              <Link href="#"
                                  scroll={false}
                                  passHref
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Close"
                                  onClick={() => deleteBorderTable(i)}
                                >
                                  <i className="fa fa-close color-danger" />                                
                              </Link>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Table Stripped</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped verticle-middle table-responsive-sm">
                  <thead>
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Progress</th>
                      <th scope="col">Deadline</th>
                      <th scope="col">Label</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableStripped &&
                      tableStripped.map((table, i) => (
                        <tr key={i}>
                          <td>{table.task}</td>
                          <td>
                            <div
                              className="progress"
                              style={{ background: table.progressbar }}
                            >
                              <div
                                className={`progress-bar bg-${
                                  table.color.split(" ")[0]
                                }`}
                                style={{ width: `${table.value}%` }}
                                role="progressbar"
                              >
                                <span className="sr-only">
                                  {table.value}% Complete
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>{table.dadeLine}</td>
                          <td>
                            <span className={`badge badge-${table.color}`}>
                              {table.value}%
                            </span>
                          </td>
                          <td>
                            <span>
                              <Link href="#"
                                  scroll={false}
                                  passHref
                                  className="me-4"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Edit"
                                  onClick={() => {
                                    setEditAble({ table, id: i });
                                    setTableStrippedModal(true);
                                  }}
                                >
                                  <i className="fa fa-pencil color-muted" />{" "}                                
                              </Link>

                              <Link href="#"
                                  scroll={false}
                                  passHref
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Close"
                                  onClick={() => deleteStrippedTable(i)}
                                >
                                  <i className="fa fa-close color-danger" />                                
                              </Link>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Responsive Table</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table header-border table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>User</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.responsiveTable.map((table, i) => (
                        <tr key={i}>
                          <td>
                            <Link href="#" scroll={ false} passHref>
                              Order #{table.invoice}
                            </Link>
                          </td>
                          <td>{table.user}</td>
                          <td>
                            <span className="text-muted">{table.date}</span>
                          </td>
                          <td>${table.amount}</td>
                          <td>
                            <span className={`badge badge-${table.color}`}>
                              {table.status}
                            </span>
                          </td>
                          <td>{table.country}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Heading With Background</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-info">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.headingWithBackground.map((table, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{table.first}</td>
                          <td>{table.last}</td>
                          <td>{table.handel}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Primary Table</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table primary-table-bordered">
                  <thead className="thead-primary">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.headingWithBackground.map((table, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{table.first}</td>
                          <td>{table.last}</td>
                          <td>{table.handel}</td>
                        </tr>
                      ))}
                  </tbody>{" "}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Primary Table Hover</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table primary-table-bg-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.primaryTableHover.map((table, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{table.first}</td>
                          <td>{table.last}</td>
                          <td>{table.handel}</td>
                        </tr>
                      ))}
                  </tbody>{" "}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Contextual Table</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table header-border"
                  style={{ minWidth: 500 }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Column heading</th>
                      <th>Column heading</th>
                      <th>Column heading</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bsTables &&
                      bsTables.contextualTable.map((table, i) => (
                        <tr className={`table-${table.color}`} key={i}>
                          <td>{i + 1}</td>
                          <td>{table.heading1}</td>
                          <td>{table.heading2}</td>
                          <td>{table.heading3}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  bsTables: state.table.bsTables,
  recentPayment: state.table.recentPayment,
  examTopper: state.table.examTopper,
  borderTable: state.table.borderTable,
  tableStripped: state.table.tableStripped,
});

export default connect(mapStateToProps, {
  pageTitle,
  getBsTableData,
  deleteRecentPayment,
  deleteExamToppers,
  deleteBorderTable,
  deleteStrippedTable,
})(Bootstrap);
