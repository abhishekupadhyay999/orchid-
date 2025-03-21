import React, { Fragment, useEffect } from "react";
import Image from "next/image";
/// Bootstrap
import { Button, Card, Col, Nav, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import PageTitle_ from "../../src/components/PageTitle";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
const UiCards = ({ pageTitle }) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("Card");
  }, []);
  return (
    <Fragment>
      <PageTitle_ mother="Bootstrap" active="Card" />
      <Row>
        <Col xl="6">
          <Card>
            <Card.Header className=" border-0 pb-0">
              <Card.Title>Card title</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                He lay on his armour-like back, and if he lifted his head a
                little he could see his brown belly, slightly domed and divided
                by arches into stiff <br /> sections. The bedding was hardly
                able to cover it and seemed ready to slide off any moment.
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" border-0 pt-0">
              <Card.Text className=" d-inline">Card footer</Card.Text>
              <Card.Link href="#" className="float-end">
                Card link
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card>
            <Card.Header>
              <Card.Title>Card title</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                This is a wider card with supporting text and below as a natural
                lead-in to the additional content. This content is a little
                <br /> bit longer. Some quick example text to build the bulk{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer className=" d-sm-flex justify-content-between align-items-center">
              <Card.Text className=" text-dark d-inline">
                Last updated 3 mins ago
              </Card.Text>

              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-center">
            <Card.Header>
              <Card.Title>Card Title</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                This is a wider card with supporting text and below as a natural
                lead-in to the additional content. This content
              </Card.Text>
              <Button as="a" variant="primary" href="#" className="mt-3">
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer>
              <Card.Text className=" text-dark">
                Last updateed 3 min ago
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-center">
            <Card.Header>
              <Card.Title>Special title treatment</Card.Title>
            </Card.Header>
            <Card.Body className=" custom-tab-1">
              <ul className="nav nav-tabs card-body-tabs mb-3">
                <Nav.Item as="li">
                  <Nav.Link active href="#">
                    Active
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link href="#">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link disabled href="#">
                    Disabled
                  </Nav.Link>
                </Nav.Item>
              </ul>

              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Button variant="primary" href="#" className="mt-3">
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-white bg-primary">
            <Card.Header>
              <Card.Title className="text-white">Primary card title</Card.Title>
            </Card.Header>
            <Card.Body className=" mb-0">
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card`&apos;s content.
              </Card.Text>
              <Button
                as="a"
                variant="primary light"
                href="#"
                className="btn-card mt-3"
              >
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer className=" bg-transparent border-0 text-white">
              Last updateed 3 min ago
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-white bg-secondary">
            <Card.Header>
              <Card.Title className="text-white">
                Secondary card title
              </Card.Title>
            </Card.Header>
            <Card.Body className=" mb-0">
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </Card.Text>
              <Button
                as="a"
                variant="secondary light"
                href="#"
                className="btn-card mt-3"
              >
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer className=" bg-transparent border-0 text-white">
              Last updateed 3 min ago
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-white bg-success">
            <Card.Header>
              <Card.Title className="text-white">Success card title</Card.Title>
            </Card.Header>
            <Card.Body className=" mb-0">
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </Card.Text>
              <Button
                as="a"
                variant="success light"
                href="#"
                className="btn-card mt-3"
              >
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer className=" bg-transparent border-0 text-white">
              Last updateed 3 min ago
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-white bg-danger">
            <Card.Header>
              <Card.Title className="text-white">Danger card title</Card.Title>
            </Card.Header>
            <Card.Body className=" mb-0">
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </Card.Text>
              <Button
                as="a"
                variant="danger light"
                href="#"
                className="btn-card mt-3"
              >
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer className=" bg-transparent border-0 text-white">
              Last updateed 3 min ago
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-white bg-warning">
            <Card.Header>
              <Card.Title className="text-white">Warning card title</Card.Title>
            </Card.Header>
            <Card.Body className=" mb-0">
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </Card.Text>
              <Button
                as="a"
                variant="warning light"
                href="#"
                className="btn-card mt-3"
              >
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer className=" bg-transparent border-0 text-white">
              Last updateed 3 min ago
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-white bg-info">
            <Card.Header>
              <Card.Title className="text-white">Info card title</Card.Title>
            </Card.Header>
            <Card.Body className=" mb-0">
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </Card.Text>
              <Button
                as="a"
                variant="info light"
                href="#"
                className="btn-card mt-3"
              >
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer className=" bg-transparent border-0 text-white">
              Last updateed 3 min ago
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="bg-light">
            <Card.Header>
              <Card.Title>Light card title</Card.Title>
            </Card.Header>
            <Card.Body className=" mb-0">
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </Card.Text>
              <Button as="a" variant="dark" href="#" className="btn-card mt-3">
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer className=" bg-transparent border-0">
              Last updateed 3 min ago
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="text-white bg-dark">
            <Card.Header>
              <Card.Title className="text-white">Dark card title</Card.Title>
            </Card.Header>
            <Card.Body className=" mb-0">
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </Card.Text>
              <Button
                as="a"
                variant="light"
                href="#"
                className="btn-card mt-3 text-dark"
              >
                Go somewhere
              </Button>
            </Card.Body>
            <Card.Footer className=" bg-transparent border-0 text-white">
              Last updateed 3 min ago
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="mb-3">
            <Image
              className="card-img-top img-fluid"
              width={450}
              height={250}
              src="/images/card/1.png"
              alt="Card image cap"
            />
            <Card.Header>
              <Card.Title>Card title</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text className=" text-dark">
                Last updated 3 mins ago
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="">
            <Image
              width={450}
              height={250}
              className="card-img-top img-fluid"
              src="/images/card/2.png"
              alt="Card image cap"
            />
            <Card.Header>
              <Card.Title>Card title</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                He lay on his armour-like back, and if he lifted his head a
                little
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Text className=" d-inline">Card footer</Card.Text>
              <a href="/ui-card" className="card-link float-end">
                Card link
              </a>
            </Card.Footer>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="">
            <Card.Header>
              <Card.Title>Card title</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                This is a wider card with supporting text and below as a natural
                lead-in to the additional content. This content is a little
              </Card.Text>
            </Card.Body>
            <Image
              width={450}
              height={250}
              className="card-img-bottom img-fluid"
              src="/images/card/3.png"
              alt="Card image cap"
            />
            <Card.Footer>
              <Card.Text className=" d-inline">Card footer</Card.Text>
              <a href="/ui-card" className="card-link float-end">
                Card link
              </a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default connect(null, { pageTitle })(UiCards);
