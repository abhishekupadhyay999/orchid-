import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { sideBarActive } from "../redux/action/utils";
const Sidebar = () => {
  const [loveEmoji, setLoveEmoji] = useState(false);
  const [doc, setDoc] = useState();
  useEffect(() => {
    setDoc(window);
    // sideBarActive(doc);
  }, [doc]);
  // sideBarActive(doc);
  let path = doc && doc.location.pathname;
  path = path && path.split("/");
  path = path && path[path.length - 1];
  let dashboard = [
      "",
      "index-dark",
      "orders-list",
      "order-detail",
      "customer-list",
      "analytics",
      "reviews",
    ],
    app = [
      "apps/profile",
      "apps/post-details",
      "apps/email/compose",
      "apps/email/inbox",
      "apps/email/read",
      "apps/ecom/product/grid",
      "apps/ecom/product/list",
      "apps/ecom/product/order",
      "apps/ecom/checkout",
      "apps/ecom/invoice",
      "apps/ecom/customers",
      "apps/ecom/product/detail",
    ],
    email = ["apps/email/compose", "apps/email/inbox", "apps/email/read"],
    shop = [
      "apps/ecom/product/grid",
      "apps/ecom/product/list",
      "apps/ecom/product/list",
      "apps/ecom/product/order",
      "apps/ecom/checkout",
      "apps/ecom/invoice",
      "apps/ecom/customers",
      "apps/ecom/product/detail",
    ],
    charts = [
      "chart/rechart",
      "chart/apex",
      "chart/chartjs",      
      "chart/sparkline",
    ],
    bootstrap = [
      "ui/accordion",
      "ui/badge",
      "ui/alert",
      "ui/button",
      "ui/modal",
      "ui/button-group",
      "ui/list-group",
      "ui/media-object",
      "ui/card",
      "ui/carousel",
      "ui/dropdown",
      "ui/popover",
      "ui/progressbar",
      "ui/tab",
      "ui/typography",
      "ui/pagination",
      "ui/grid",
    ],
    plugins = [
      "plugins/select2",
      "plugins/sweetalert",
      "plugins/toastr",
      "plugins/noui-slider",
      "plugins/jqvmap",
      "plugins/lightgallery",
    ],
    widget = ["widget-basic"],
    forms = [
      "form/element",
      "form/wizard",
      "form/summernote",      
      "form/pickers",
      "form/validation",
    ],
    hero = ["hero"],
    insta = ["insta"],
    offer = ["offer"],
    property= ["property"],
    video = ["video"],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
      "empty-page",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
  return (
    <div className="deznav">
      {doc && (
        <div className="deznav-scroll">
          <MetisMenu className="metismenu" id="menu">
            {/* <li className={`${dashboard.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-025-dashboard" />
                <span className="nav-text">Dashboard</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/" className={`${path === "" ? "mm-active" : ""}`}>
                      Dashboard Light                    
                  </Link>
                </li>
                <li>
                  <Link href="/index-dark"
                      className={`${path === "index-dark" ? "mm-active" : ""}`}
                    >
                      Dashboard Dark                    
                  </Link>
                </li>
                <li>
                  <Link href="/orders-list"
                      className={`${path === "orders-list" ? "mm-active" : ""}`}
                    >
                      Orders list                    
                  </Link>
                </li>
                <li>
                  <Link href="/order-detail"
                      className={`${
                        path === "order-detail" ? "mm-active" : ""
                      }`}
                    >
                      Order Detail                    
                  </Link>
                </li>
                <li>
                  <Link href="/customer-list"
                      className={`${
                        path === "customer-list" ? "mm-active" : ""
                      }`}
                    >
                      Customers                    
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className={`${path === "analytics" ? "mm-active" : ""}`}>
                      Analytics                    
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className={`${path === "reviews" ? "mm-active" : ""}`}>
                      Reviews                    
                  </Link>
                </li>
              </ul>
            </li> */}
            {/* <li className={`${app.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-050-info" />
                <span className="nav-text">Apps</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/apps/profile"
                      className={`${
                        path === "apps/profile" ? "mm-active" : ""
                      }`}
                    >
                      Profile                    
                  </Link>
                </li>
                <li>
                  <Link href="/apps/post-details"
                      className={`${
                        path === "apps/post-details" ? "mm-active" : ""
                      }`}
                    >
                      Post Details                    
                  </Link>
                </li>
                <li className={`${email.includes(path) ? "mm-active" : ""}`}>
                  <a className="has-arrow c-pointer" aria-expanded="false">
                    Email
                  </a>
                  <ul aria-expanded="false">
                    <li>
                      <Link href="/apps/email/compose"
                          className={`${
                            path === "apps/email/compose" ? "mm-active" : ""
                          }`}
                        >
                          Compose                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/email/inbox"
                          className={`${
                            path === "apps/email/inbox" ? "mm-active" : ""
                          }`}
                        >
                          Inbox                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/email/read"
                          className={`${
                            path === "apps/email/read" ? "mm-active" : ""
                          }`}
                        >
                          Read                        
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`${shop.includes(path) ? "mm-active" : ""}`}>
                  <a className="has-arrow c-pointer" aria-expanded="false">
                    Shop
                  </a>
                  <ul aria-expanded="false">
                    <li>
                      <Link href="/apps/ecom/product-grid"
                          className={`${
                            path === "apps/ecom/product-grid" ? "mm-active" : ""
                          }`}
                        >
                          Product Grid                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/ecom/product-list"
                          className={`${
                            path === "apps/ecom/product-list" ? "mm-active" : ""
                          }`}
                        >
                          Product List                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/ecom/product-detail"
                          className={`${
                            path === "apps/ecom/product-detail"
                              ? "mm-active"
                              : ""
                          }`}
                        >
                          Product Details                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/ecom/product-order"
                          className={`${
                            path === "apps/ecom/product-order"
                              ? "mm-active"
                              : ""
                          }`}
                        >
                          Order                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/ecom/checkout"
                          className={`${
                            path === "apps/ecom/checkout" ? "mm-active" : ""
                          }`}
                        >
                          Checkout                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/ecom/invoice"
                          className={`${
                            path === "apps/ecom/invoice" ? "mm-active" : ""
                          }`}
                        >
                          Invoice                        
                      </Link>
                    </li>
                    <li>
                      <Link href="/apps/ecom/customers"
                          className={`${
                            path === "apps/ecom/customers" ? "mm-active" : ""
                          }`}
                        >
                          Customers                        
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className={`${charts.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-041-graph" />
                <span className="nav-text">Charts</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/chart/rechart"
                      className={`${
                        path === "chart/rechart" ? "mm-active" : ""
                      }`}
                    >
                      Rechart                    
                  </Link>
                </li>

                <li>
                  <Link href="/chart/chartjs"                    
                      className={`${
                        path === "chart/chartjs" ? "mm-active" : ""
                      }`}
                    >
                      Chartjs                    
                  </Link>
                </li>
                <li>
                  <Link href="/chart/apex"
                      className={`${path === "chart/apex" ? "mm-active" : ""}`}
                    >
                      ApexChart                   
                  </Link>
                </li>
                
                <li>
                  <Link href="/chart/sparkline"
                      className={`${
                        path === "chart/sparkline" ? "mm-active" : ""
                      }`}
                    >
                      Sparkline
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${bootstrap.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-086-star" />
                <span className="nav-text">Bootstrap</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/ui/accordion"
                      className={`${
                        path === "ui/accordion" ? "mm-active" : ""
                      }`}
                    >
                      Accordion
                  </Link>
                </li>
                <li>
                  <Link href="/ui/alert" className={`${path === "ui/alert" ? "mm-active" : ""}`}>
                      Alert
                  </Link>
                </li>
                <li>
                  <Link href="/ui/badge" className={`${path === "ui/badge" ? "mm-active" : ""}`}>
                      Badge
                  </Link>
                </li>
                <li>
                  <Link href="/ui/button">Button</Link>
                </li>
                <li>
                  <Link href="/ui/modal"className={`${path === "ui/button" ? "mm-active" : ""}`}>
                      Modal
                  </Link>
                </li>
                <li>
                  <Link href="/ui/button-group"
                      className={`${
                        path === "ui/button-group" ? "mm-active" : ""
                      }`}
                    >
                      Button Group
                  </Link>
                </li>
                <li>
                  <Link href="/ui/list-group"
                      className={`${
                        path === "ui/list-group" ? "mm-active" : ""
                      }`}
                    >
                      List Group
                  </Link>
                </li>
                <li>
                  <Link href="/ui/media-object"
                      className={`${
                        path === "ui/media-object" ? "mm-active" : ""
                      }`}
                    >
                      Media Object
                  </Link>
                </li>
                <li>
                  <Link href="/ui/card" className={`${path === "ui/card" ? "mm-active" : ""}`}>
                      Cards
                  </Link>
                </li>
                <li>
                  <Link href="/ui/dropdown"
                      className={`${path === "ui/dropdown" ? "mm-active" : ""}`}
                    >
                      Dropdown
                  </Link>
                </li>
                <li>
                  <Link href="/ui/popover"
                      className={`${path === "ui/popover" ? "mm-active" : ""}`}
                    >
                      Popover
                  </Link>
                </li>
                <li>
                  <Link href="/ui/progressbar"
                      className={`${
                        path === "ui/progressbar" ? "mm-active" : ""
                      }`}
                    >
                      Progressbar
                  </Link>
                </li>
                <li>
                  <Link href="/ui/tab" className={`${path === "ui/tab" ? "mm-active" : ""}`}>
                      Tab
                  </Link>
                </li>
                <li>
                  <Link href="/ui/typography"
                      className={`${
                        path === "ui/typography" ? "mm-active" : ""
                      }`}
                    >
                      Typography
                  </Link>
                </li>
                <li>
                  <Link href="/ui/pagination"
                      className={`${
                        path === "ui/pagination" ? "mm-active" : ""
                      }`}
                    >
                      Pagination
                  </Link>
                </li>
                <li>
                  <Link href="/ui/grid" className={`${path === "ui/grid" ? "mm-active" : ""}`}>
                      Grid
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${plugins.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-045-heart" />
                <span className="nav-text">Plugins</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/plugins/select2">Select 2</Link>
                </li>
                
                <li>
                  <Link href="/plugins/noui-slider">Noui Slider</Link>
                </li>
                <li>
                  <Link href="/plugins/sweetalert">Sweet Alert</Link>
                </li>
                <li>
                  <Link href="/plugins/toastr">Toastr</Link>
                </li>
                <li>
                  <Link href="/plugins/jqvmap">Jqv Map</Link>
                </li>
                <li>
                  <Link href="/plugins/lightgallery">Light Gallery</Link>
                </li>
              </ul>
            </li> */}

            {/* <li className={`${widget.includes(path) ? "mm-active" : ""}`}>
              <Link href="/widget-basic" className="ai-icon" passHref>
                  <i className="flaticon-013-checkmark" />
                  <span className="nav-text">Widget</span>                
              </Link>
            </li> */}
            <li className={`${hero.includes(path) ? "mm-active" : ""}`}>
              <Link href="/hero/herolist" className="ai-icon" passHref>
                  <i className="flaticon-086-star" />
                  <span className="nav-text">Hero</span>                
              </Link>
            </li>
            <li className={`${insta.includes(path) ? "mm-active" : ""}`}>
              <Link href="/insta/instalist" className="ai-icon" passHref>
                  <i className="flaticon-013-checkmark" />
                  <span className="nav-text">Insta</span>                
              </Link>
            </li>
            <li className={`${offer.includes(path) ? "mm-active" : ""}`}>
              <Link href="/offer/offerlist" className="ai-icon" passHref>
                  <i className="flaticon-043-menu" />
                  <span className="nav-text">Offer</span>                
              </Link>
            </li>
            <li className={`${property.includes(path) ? "mm-active" : ""}`}>
              <Link href="/property/propertylist" className="ai-icon" passHref>
                  <i className="flaticon-013-checkmark" />
                  <span className="nav-text">Property</span>                
              </Link>
            </li>
            <li className={`${video.includes(path) ? "mm-active" : ""}`}>
              <Link href="/video/createVideo" className="ai-icon" passHref>
                  <i className="flaticon-072-printer" />
                  <span className="nav-text">Video</span>                
              </Link>
            </li>
            {/* <li className={`${forms.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-072-printer" />
                <span className="nav-text">Forms</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/form/element"
                      className={`${
                        path === "/form/element" ? "mm-active" : ""
                      }`}
                    >
                      Form Elements
                    
                  </Link>
                </li>
                <li>
                  <Link href="/form/wizard"
                      className={`${
                        path === "/form/wizard" ? "mm-active" : ""
                      }`}
                    >
                      Wizard                    
                  </Link>
                </li>
                <li>
                  <Link href="/form/summernote"
                      className={`${
                        path === "/form/summernote" ? "mm-active" : ""
                      }`}
                    >
                      Summernote                    
                  </Link>
                </li>
                
                <li>
                  <Link href="/form/pickers"
                      className={`${
                        path === "/form/pickers" ? "mm-active" : ""
                      }`}
                    >
                      Pickers                    
                  </Link>
                </li>
                <li>
                  <Link href="/form/validation"
                      className={`${
                        path === "/form/validation" ? "mm-active" : ""
                      }`}
                    >
                      Formik Validate                    
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${table.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-043-menu" />
                <span className="nav-text">Table</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link href="/table/bootstrap"
                      className={`${
                        path === "/table/bootstrap" ? "mm-active" : ""
                      }`}
                    >
                    Bootstrap                    
                  </Link>
                </li>
                <li>
                  <Link href="/table/datatable"
                      className={`${
                        path === "/table/datatable" ? "mm-active" : ""
                      }`}
                    >
                    Datatable                    
                  </Link>
                </li>
                <li>
                  <Link href="/table/react"
                      className={`${
                        path === "/table/react" ? "mm-active" : ""
                      }`}
                    >
                    React Table                    
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`${pages.includes(path) ? "mm-active" : ""}`}>
              <a className="has-arrow ai-icon c-pointer" aria-expanded="false">
                <i className="flaticon-022-copy" />
                <span className="nav-text">Pages</span>
              </a>
              <ul aria-expanded="false">			  
                <li>
                  <a className="has-arrow c-pointer" aria-expanded="false">
                    Error
                  </a>
                  <ul aria-expanded="false">
                    <li>
                      <Link href="/pages/error/400">Error 400</Link>
                    </li>
                    <li>
                      <Link href="/pages/error/403">Error 403</Link>
                    </li>
                    <li>
                      <Link href="/pages/error/404">Error 404</Link>
                    </li>
                    <li>
                      <Link href="/pages/error/500">Error 500</Link>
                    </li>
                    <li>
                      <Link href="/pages/error/503">Error 503</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/pages/lock-screen">Lock Screen</Link>
                </li>
                <li>
                  <Link href="/empty-page"
                      className={`${path === "empty-page" ? "mm-active" : ""}`}
                    >
                      Empty Page                    
                  </Link>
                </li>
              </ul>
            </li> */}
          </MetisMenu>
          <div className="copyright">
            <p>
              <strong>Canwhart Admin Dashboard</strong> © {new Date().getFullYear()}{" "}
              All Rights Reserved
            </p>
            <p>
              Made with{" "}
              <span
                className={`${loveEmoji ? "heart heart-blast" : "heart"}`}
                onClick={() => setLoveEmoji(!loveEmoji)}
              ></span>{" "}
              by Canwhart
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
