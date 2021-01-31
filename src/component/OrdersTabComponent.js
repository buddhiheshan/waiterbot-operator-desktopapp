import { connect } from 'react-redux';
import { Accordion, Card, Tabs, Tab, Button, ListGroup } from 'react-bootstrap';

function RenderOrders({ orders, nextState, items }) {
  
  return (
    <Accordion defaultActiveKey={1}>
      {
        orders.map((order, i) => {
          return (
            <Card key={i + 1}>
              <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                Order ID: {order._id}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={i + 1}>
                <Card.Body>
                  <div className="row">
                    <div className="col-8">
                      <RenderOrderItems orderedItems={order.items} items={items} />
                    </div>
                    <div className="col-4">
                      <ul>
                        <li>Status: {order.status}</li>
                        <li>Table: {order.table.table_number}</li>
                        <li>Amount: {order.amount}</li>
                      </ul>
                      {nextState ? <Button>{nextState}</Button> : null}
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          )
        })
      }
    </Accordion>
  );
};

function RenderOrderItems(props) {

  let filtered = [];
  props.orderedItems.forEach((ordered,i) => {
    const toBeAdded = props.items.filter((item,j) => {
      // console.log(item._id,ordered.item,item._id === ordered.item);
      return(item._id === ordered.item)
    })
    filtered = [...filtered, ...toBeAdded];
    // console.log(toBeAdded, filtered);
  });

  return (
    <ListGroup>
      {
        filtered.map((order, i) => {
          return (
            <ListGroup.Item key={i}>{order.name}</ListGroup.Item>
          )
        })
      }
    </ListGroup>
  );
};

const OrdersTab = (props) => {

  return (
    <Tabs defaultActiveKey="Pending" id="uncontrolled-tab-example">
      <Tab eventKey="Pending" title="Pending">
        <RenderOrders props orders={props.orders.orders.pending.orders} nextState="Accept" items={props.items.items} />
      </Tab>
      <Tab eventKey="Preparing" title="Preparing">
        <RenderOrders orders={props.orders.orders.preparing.orders} nextState="Deploy Robot" items={props.items.items} />
      </Tab>
      <Tab eventKey="Delivering" title="Delivering">
        <RenderOrders orders={props.orders.orders.delivering.orders} items={props.items.items} />
      </Tab>
      <Tab eventKey="Delivered" title="Delivered">
        <RenderOrders orders={props.orders.orders.delivered.orders} items={props.items.items} />
      </Tab>
      <Tab eventKey="Cancelled" title="Cancelled">
        <RenderOrders orders={props.orders.orders.cancelled.orders} items={props.items.items} />
      </Tab>
    </Tabs>
  );
}


const mapStateToProps = state => {
  return {
    property: state.property,
    orders: state.orders,
    items: state.items
  }
}

export default connect(mapStateToProps)(OrdersTab);