import React, { Fragment, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import PageTitle_ from "../../src/components/PageTitle";
import { moodChange, pageTitle } from "../../src/redux/action/utils";

const UiButtonGroup = ({ pageTitle }) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("Button Group");
  }, []);
  return (
    <Fragment>
      <PageTitle_ mother="Bootstrap" active="Button Group" />
      <Row>
        <Col xl="6">
          <Card>
            <Card.Header className=" d-block">
              <Card.Title>Button group</Card.Title>
              <Card.Text className="mb-0 subtitle">
                Default Button group style
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <ButtonGroup>
                <Button variant="primary">Left</Button>
                <Button variant="primary">Middle</Button>
                <Button variant="primary">Right</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xl="6">
          <Card>
            <Card.Header className=" d-block">
              <Card.Title>Button toolbar</Card.Title>
              <Card.Text className="mb-0 subtitle">
                Default Button toolbar style
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <ButtonGroup className="me-2 mb-2">
                <Button variant="primary">1</Button>
                <Button variant="primary">2</Button>
                <Button variant="primary">3</Button>
                <Button variant="primary">4</Button>
              </ButtonGroup>
              <div className="btn-group me-2 mb-2">
                <Button variant="primary">5</Button>
                <Button variant="primary">6</Button>
                <Button variant="primary">7</Button>
              </div>
              <div className="btn-group mb-2">
                <Button variant="primary">8</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl="6">
          <Card>
            <Card.Header className=" d-block">
              <Card.Title>Button Sizing</Card.Title>
              <Card.Text className="mb-0 subtitle">
                Default button size style
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <ButtonGroup size="lg" className="mb-2 me-2">
                <Button variant="primary">Left</Button>
                <Button variant="primary">Middle</Button>
                <Button variant="primary">Right</Button>
              </ButtonGroup>
              <ButtonGroup className="mb-2 me-2">
                <Button variant="primary">Left</Button>
                <Button variant="primary">Middle</Button>
                <Button variant="primary">Right</Button>
              </ButtonGroup>
              <ButtonGroup size="sm" className="mb-2 ">
                <Button variant="primary">Left</Button>
                <Button variant="primary">Middle</Button>
                <Button variant="primary">Right</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xl="6">
          <Card>
            <Card.Header className=" d-block">
              <Card.Title>Button Nesting</Card.Title>
              <Card.Text className="mb-0 subtitle">
                Default button nesting style
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <ButtonGroup>
                <Button variant="primary">1</Button>
                <Button variant="primary">2</Button>
                <DropdownButton
                  as={ButtonGroup}
                  title="Dropdown"
                  id="bg-nested-dropdown"
                >
                  <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xl="6">
          <Card>
            <Card.Header className=" d-block">
              <Card.Title>Vertical variation</Card.Title>
              <Card.Text className="mb-0 subtitle">
                Default button vertical variation style
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <ButtonGroup vertical>
                <Button variant="primary">Button</Button>
                <Button variant="primary">Button</Button>
                <Button variant="primary">Button</Button>
                <Button variant="primary">Button</Button>
                <Button variant="primary">Button</Button>
                <Button variant="primary">Button</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="6" md="6">
          <Card>
            <Card.Header className=" d-block">
              <Card.Title>Vertical dropdown variation</Card.Title>
              <Card.Text className="mb-0 subtitle">
                Default button vertical variation style
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <ButtonGroup vertical>
                <Button variant="primary">Button</Button>
                <Button variant="primary">Button</Button>
                <DropdownButton
                  as={ButtonGroup}
                  title="Dropdown"
                  id="bg-vertical-dropdown-3"
                >
                  <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>
                <Button variant="primary">Button</Button>
                <Button variant="primary">Button</Button>
                <DropdownButton
                  as={ButtonGroup}
                  title="Dropdown"
                  id="bg-vertical-dropdown-3"
                >
                  <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                  as={ButtonGroup}
                  title="Dropdown"
                  id="bg-vertical-dropdown-3"
                >
                  <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                  as={ButtonGroup}
                  title="Dropdown"
                  id="bg-vertical-dropdown-3"
                >
                  <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default connect(null, { pageTitle })(UiButtonGroup);
