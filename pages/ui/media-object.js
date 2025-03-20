import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
/// Bootstrap
import { Card, Col,  Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import PageTitle_ from "../../src/components/PageTitle";
import { moodChange, pageTitle } from "../../src/redux/action/utils";

const UiMediaObject = ({ pageTitle }) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("Media Object");
  }, []);
  const heading = "Media heading";
  const text =
    "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.";
  const text2 =
    " Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fuscecondimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus. vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.";
  const text3 =
    "Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";

  return (
    <Fragment>
      <PageTitle_ mother="Bootstrap" active="Media Object" />
      <Row>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Media Object</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <Image
                    className='me-3 img-fluid '
                    width='60'
                    height='60'
                    src="/images/avatar/1.jpg"
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>
                  </div>
                </div>
                <div className='media mt-4'>
                  <Image
                    className='me-3 img-fluid '
                    width='60'
                    height='60'
                    src="/images/avatar/7.jpg"
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Nesting</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <Image
                    className='me-3 '
                    width='60'
                    height='60'
                    src="/images/avatar/2.jpg"
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>

                    <div className='media mt-4'>
                      <Link href={"#"} scroll={false} className='pe-3'>
                        <Image
                          className=''
                          width='60'
                          height='60'
                          src="/images/avatar/3.jpg"
                          alt='DexignZone'
                        />
                      </Link>
                      <div className='media-body'>
                        <h5 className='mt-0'>{heading}</h5>
                        <p className='mb-0'>{text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Align Top</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <Image
                    className='align-self-start me-3 '
                    width='60'
                    height='60'
                    src="/images/avatar/4.jpg"
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>Top-aligned media</h5>
                    <p>{text}</p>
                    <p className='mb-0'>{text3}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Align Center</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <Image
                    className='align-self-center me-3 '
                    width='60'
                    height='60'
                    src="/images/avatar/5.jpg"
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>Center-aligned media</h5>
                    <p>{text}</p>
                    <p className='mb-0'>{text3}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Align Bottom</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <Image
                    className='align-self-end me-3 '
                    width='60'
                    height='60'
                    src="/images/avatar/6.jpg"
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>Bottom-aligned media</h5>
                    <p>{text}</p>
                    <p className='mb-0'>{text3}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Order</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <div className='media-body'>
                    <h5 className='mt-0'>Media object</h5>
                    <p className='mb-0'>{text}</p>
                  </div>
                  <Image
                    className='ms-3 '
                    width='60'
                    height='60'
                    src="/images/avatar/7.jpg"
                    alt='DexignZone'
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <div className='col-lg-12'>
          <Card>
            <Card.Header>
              <Card.Title>Media list</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <ul className='list-unstyled'>
                  <li className='media'>
                    <Image
                      className='me-3 '
                      width='60'
                      height='60'
                      src="/images/avatar/8.jpg"
                      alt='DexignZone'
                    />
                    <div className='media-body'>
                      <h5 className='mt-0'>List-based media object</h5>
                      <p className='mb-0'>{text2}</p>
                    </div>
                  </li>
                  <li className='media my-4'>
                    <Image
                      className='me-3 '
                      width='60'
                      height='60'
                      src="/images/avatar/1.jpg"
                      alt='DexignZone'
                    />
                    <div className='media-body'>
                      <h5 className='mt-0'>List-based media object</h5>
                      <p className='mb-0'>{text2}</p>
                    </div>
                  </li>
                  <li className='media'>
                    <Image
                      className='me-3 '
                      width='60'
                      height='60'
                      src="/images/avatar/2.jpg"
                      alt='DexignZone'
                    />
                    <div className='media-body'>
                      <h5 className='mt-0'>List-based media object</h5>
                      <p className='mb-0'>{text2}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Fragment>
  );
};

export default connect(null, { pageTitle })(UiMediaObject);
