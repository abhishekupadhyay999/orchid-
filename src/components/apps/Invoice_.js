import React from "react";
import Image from "next/image";
import Link from "next/link";

class Invoice_ extends React.Component {
  totalFun = (value) => {
    var sum = 0;
    if (value) {
      let i = 0;
      for (i; i <= value.length; i++) {
        if (value[i]) {
          sum += Number(value[i].price * value[i].qty);
        }
      }
    }
    return sum;
  };
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card mt-3">
            <div className="card-header">
              {" "}
              Invoice{" "}
              <strong>
                {this.props.invoice && this.props.invoice.date}
              </strong>{" "}
              <span className="float-right">
                <strong>Status:</strong>{" "}
                {this.props.invoice && this.props.invoice.status}
              </span>{" "}
            </div>
            <div className="card-body">
              <div className="row mb-5">
                <div className="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <h6>From:</h6>
                  <div>
                    {" "}
                    <strong>
                      {this.props.invoice && this.props.invoice.fromname}
                    </strong>{" "}
                  </div>
                  {this.props.invoice &&
                    this.props.invoice.fromlocation
                      .split("/n")
                      .map((l, i) => <div key={i}>{l}</div>)}
                  <div>
                    Email: {this.props.invoice && this.props.invoice.fromemail}
                  </div>
                  <div>
                    Phone: {this.props.invoice && this.props.invoice.fromphn}
                  </div>
                </div>
                <div className="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <h6>To:</h6>
                  <div>
                    {" "}
                    <strong>
                      {this.props.invoice && this.props.invoice.toname}
                    </strong>{" "}
                  </div>
                  {this.props.invoice &&
                    this.props.invoice.tolocation
                      .split("/n")
                      .map((l, i) => <div key={i}>{l}</div>)}

                  <div>
                    Email: {this.props.invoice && this.props.invoice.toemail}
                  </div>
                  <div>
                    Phone: {this.props.invoice && this.props.invoice.tophn}
                  </div>
                </div>
                <div className="mt-4 col-xl-6 col-lg-12 col-sm-12 d-flex justify-content-xl-end justify-content-lg-center justify-content-md-center justify-content-xs-start">
                  <div className="row align-items-center">
                    <div className="col-sm-9">
                      <Link href="#" scroll={true}  className="brand-logo justify-content-start p-0 mb-3" passHref>
													<svg className="logo-abbr" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect width="64" height="64" rx="2" fill="#FFF0E4" className="svg-logo-rect"></rect>
														<path className="svg-logo-path" d="M31.5785 19.6842C31.5785 22.0351 30.765 26.0526 29.1379 31.7368C27.5109 37.386 26.6973 41 26.6973 42.5789C26.6973 44.1228 27.378 44.8947 28.7395 44.8947C30.1341 44.8947 32.0268 43.8246 34.4176 41.6842C34.5172 39.8947 34.7995 37.7544 35.2644 35.2632C36.659 27.4386 38.3525 21.7719 40.3448 18.2632C42.3372 14.7544 44.6616 13 47.318 13C48.8787 13 50.0409 13.4912 50.8046 14.4737C51.6015 15.4211 52 16.6842 52 18.2632C52 23.2456 48.7791 29.9474 42.3372 38.3684C42.2375 39.7368 42.1877 41.1228 42.1877 42.5263C42.1877 45.4386 42.6526 46.8947 43.5824 46.8947C44.1469 46.8947 44.6284 46.8246 45.0268 46.6842L45.7739 48.6842C43.7152 50.2281 41.6564 51 39.5977 51C36.6092 51 34.8991 49.1579 34.4674 45.4737C30.4828 49.1579 27.0792 51 24.2567 51C22.5632 51 21.1852 50.4561 20.1226 49.3684C19.0932 48.2456 18.5785 46.6316 18.5785 44.5263C18.5785 43.2982 18.9604 41.3158 19.7241 38.5789C20.5211 35.807 20.9859 34.1754 21.1188 33.6842C15.7063 31.3333 13 28.0702 13 23.8947C13 21.0175 14.2618 18.4912 16.7854 16.3158C19.3091 14.1053 22.1149 13 25.2031 13C29.4534 13 31.5785 15.2281 31.5785 19.6842ZM22.0651 29.8947C23.2273 25.614 23.8084 22.4211 23.8084 20.3158C23.8084 18.2105 23.0945 17.1579 21.6667 17.1579C20.272 17.1579 18.9936 17.8246 17.8314 19.1579C16.6692 20.4912 16.0881 21.9649 16.0881 23.5789C16.0881 25.1579 16.6692 26.4912 17.8314 27.5789C18.9936 28.6316 20.4049 29.4035 22.0651 29.8947ZM49.0115 18.1579C49.0115 17.2105 48.6794 16.7368 48.0153 16.7368C46.5543 16.7368 44.8774 22.0702 42.9847 32.7368C44.4789 30.6667 45.857 28.193 47.1188 25.3158C48.3806 22.4035 49.0115 20.0175 49.0115 18.1579Z" fill="#FF720D"></path>
													</svg>
													<div className="brand-title">Uena</div>
												</Link>
                      
                      <span>
                        Please send exact amount:{" "}
                        <strong className="d-block">0.15050000 BTC</strong>
                        <strong>1DonateWffyhwAjskoEwXt83pHZxhLTr8H</strong>
                      </span>
                      <br />
                      <small className="text-muted">
                        Current exchange rate 1BTC = $6590 USD
                      </small>
                    </div>
                    <div className="col-sm-3 mt-3">
                      {" "}
                      <Image
                        src={this.props.invoice && this.props.invoice.qrCode}
                        className="img-fluid "
                        width={110}
                        height={110}
                        alt=""
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="center">#</th>
                      <th>Item</th>
                      <th>Description</th>
                      <th className="right">Unit Cost</th>
                      <th className="center">Qty</th>
                      <th className="right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.invoice &&
                      this.props.invoiceItems &&
                      this.props.invoiceItems.map((invo, i) => (
                        <tr key={i}>
                          <td className="center">{i + 1}</td>
                          <td className="left strong">{invo.name}</td>
                          <td className="left">{invo.dec}</td>
                          <td className="right">${invo.price}</td>
                          <td className="center">{invo.qty}</td>
                          <td className="right">${invo.price * invo.qty}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ms-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Subtotal</strong>
                        </td>

                        <td className="right">
                          ${" "}
                          {this.totalFun(
                            this.props.invoice &&
                              this.props.invoiceItems &&
                              this.props.invoiceItems
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>
                            Discount (
                            {this.props.invoice && this.props.invoice.discount}
                            %)
                          </strong>
                        </td>
                        <td className="right">
                          $
                          {this.props.invoice &&
                            (
                              (this.totalFun(
                                this.props.invoice &&
                                  this.props.invoiceItems &&
                                  this.props.invoiceItems
                              ) *
                                this.props.invoice.discount) /
                              100
                            ).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>
                            VAT ({this.props.invoice && this.props.invoice.vat}
                            %)
                          </strong>
                        </td>
                        <td className="right">
                          $
                          {this.props.invoice &&
                            (
                              ((this.totalFun(
                                this.props.invoice &&
                                  this.props.invoiceItems &&
                                  this.props.invoiceItems
                              ) -
                                (this.totalFun(
                                  this.props.invoice &&
                                    this.props.invoiceItems &&
                                    this.props.invoiceItems
                                ) *
                                  this.props.invoice.discount) /
                                  100) *
                                this.props.invoice.vat) /
                              (this.props.invoice.vat + 100)
                            ).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Total</strong>
                        </td>
                        <td className="right">
                          <strong>
                            $
                            {this.props.invoice &&
                              (
                                this.totalFun(
                                  this.props.invoice &&
                                    this.props.invoiceItems &&
                                    this.props.invoiceItems
                                ) -
                                (this.totalFun(
                                  this.props.invoice &&
                                    this.props.invoiceItems &&
                                    this.props.invoiceItems
                                ) *
                                  this.props.invoice.discount) /
                                  100 -
                                ((this.totalFun(
                                  this.props.invoice &&
                                    this.props.invoiceItems &&
                                    this.props.invoiceItems
                                ) -
                                  (this.totalFun(
                                    this.props.invoice &&
                                      this.props.invoiceItems &&
                                      this.props.invoiceItems
                                  ) *
                                    this.props.invoice.discount) /
                                    100) *
                                  this.props.invoice.vat) /
                                  (this.props.invoice.vat + 100)
                              ).toFixed(2)}
                          </strong>
                          <br />
                          <strong>0.15050000 BTC</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Invoice_;
