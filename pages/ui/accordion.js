import React, { Fragment, useEffect,useReducer } from "react";
import {  useSelector } from "react-redux";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import PageTitle_ from "../../src/components/PageTitle";
import { moodChange, pageTitle } from "../../src/redux/action/utils";


const defaultAccordion = [
  {
    title: "Accordion Header One",
    text:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
    bg: "primary",

  },
  {
    title: "Accordion Header Two",
    text:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",

    bg: "info",

  },
  {
    title: "Accordion Header Three",
    text:
      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",

    bg: "success",

  },
];
const UiAccordion = () => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("Alert");
  }, []);


  return (
    <Fragment>
      <PageTitle_ active="Accordion" mother="Bootstrap" />
      <Row>        
        <Col xl="6">
          <Card>
            <Card.Header className="d-block card-header">
              <Card.Title>Default Accordion</Card.Title>
              <Card.Text className="m-0 subtitle">
                Default accordion. Add <code>accordion</code> class in root
              </Card.Text>
            </Card.Header>
            <Card.Body className="card-body">
              {/* <!-- Default accordion --> */}
              <Accordion className="accordion-primary" defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item className="accordion-item" key={i} eventKey={`${i}`}>
                  <Accordion.Header className="accordion-header rounded-lg">
                    {d.title}
                  </Accordion.Header>
                  <Accordion.Collapse eventKey={`${i}`}>
                    <div className="accordion-body">{d.text}</div>
                  </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>				
            </Card.Body>
          </Card>
        </Col>
        
        
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion bordered</Card.Title>
              <Card.Text className="m-0 subtitle">
                Accordion with border. Add class <code>accordion-bordered</code>{" "}
                with the class <code> accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion-danger-solid" defaultActiveKey="0">
                {defaultAccordion.map((data, i) => (
                  <Accordion.Item  key={i} eventKey={`${i}`}>
                    <Accordion.Header className="accordion-header">
                      {" "}
                        {data.title}                      
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
					          	<div className="accordion-body">{data.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item >
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion without space</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-no-gutter</code> class with{" "}
                <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion-no-gutter accordion-header-bg" defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item  key={i} eventKey={`${i}`}>
                    <Accordion.Header  className="accordion-header">
					            	{d.title}                     
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`}>
						            <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion Without Space With Border</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-no-gutter accordion-bordered</code> class
                with <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion-no-gutter " defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item  key={i}  eventKey={`${i}`}>
                    <Accordion.Header as='div'>
						            {d.title}
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`}>
						            <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item >
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion Indicator In Left Position</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-left-indicator</code> class with{" "}
                <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion-left-indicator" defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item key={i} eventKey={`${i}`}>
                    <Accordion.Header  className="accordion-header">
                        {d.title}
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`}>
                        <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
       
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion With Icon</Card.Title>
              <Card.Text className="m-0 subtitle">
                  Add <code>accordion-with-icon</code> class with{" "}
                  <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion-with-icon" defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item key={i}  eventKey={`${i}`}>
                    <Accordion.Header className="accordion-header">
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">{d.title}</span>
                      <span className="accordion-header-indicator indicator-bordered"></span>
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`}>
                      <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion Header Background</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-header-bg</code> class with{" "}
                <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion
                className="accordion-header-bg accordion-bordered"
                defaultActiveKey="0"
              >
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item  key={i}  eventKey={`${i}`}>
                    <Accordion.Header  className={`accordion-header accordion-header-${d.bg}`}>
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">{d.title}</span>
                      <span className="accordion-header-indicator"></span>
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`} >
                      <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion Solid Background</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-solid-bg</code> class with{" "}
                <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion
                className="accordion accordion-solid-bg"
                defaultActiveKey="0"
              >
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item  key={i} eventKey={`${i}`}>
                    <Accordion.Header  className="accordion-header  accordion-header-primary">
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">{d.title}</span>
                      <span className="accordion-header-indicator "></span>
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                      <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item >
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion Active Background</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-active-header</code> class with{" "}
                <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion accordion-active-header" defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item className="accordion-item" key={i} eventKey={`${i}`}>
                    <Accordion.Header className="accordion-header accordion-header-primary">
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">{d.title}</span>
                      <span className="accordion-header-indicator "></span>
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                      <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card className="transparent-card">
            <Card.Header className="d-block">
              <Card.Title>Accordion header shadow</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-header-shadow</code> and{" "}
                <code>accordion-rounded</code> class with <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion-header-shadow accordion-rounded" defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item className="accordion-item" key={i} eventKey={`${i}`}>
                    <Accordion.Header  className="accordion-header  accordion-header--primary">
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">{d.title}</span>
                      <span className="accordion-header-indicator "></span>
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                        <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion Rounded Stylish</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-rounded-stylish</code> class with{" "}
                <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion-rounded-stylish accordion-bordered" defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item  key={i}  eventKey={`${i}`}>
                      <Accordion.Header className="accordion-header accordion-header-primary">
                        {d.title}
                        <span className="accordion-header-indicator "></span>					              
                      </Accordion.Header>
                      <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                        <div className="accordion-body">{d.text}</div>
                      </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
		
        <Col xl="6">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Accordion Gradient</Card.Title>
              <Card.Text className="m-0 subtitle">
                Add <code>accordion-gradient</code> class with{" "}
                <code>accordion</code>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Accordion className="accordion-rounded-stylish accordion-gradient" defaultActiveKey="0">
                {defaultAccordion.map((d, i) => (
                  <Accordion.Item  key={i} eventKey={`${i}`}>
                    <Accordion.Header  className="accordion-header accordion-header--primary">
                      <span className="accordion-header-icon"></span>
                      <span className="accordion-header-text">{d.title}</span>
                      <span className="accordion-header-indicator"></span>
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                        <div className="accordion-body">{d.text}</div>
                    </Accordion.Collapse>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>{" "}
    </Fragment>
  );
};

export default UiAccordion;