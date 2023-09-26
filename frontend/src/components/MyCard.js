import { Card, Badge } from 'react-bootstrap';

function MyCard(props) {
  return (
    <Card className="card card-flush h-md-50 mb-5 mb-xl-10">
      <Card.Header className="pt-5">
        <div className="card-title d-flex flex-column">
          <div className="d-flex align-items-center">
            <span className="fs-4 fw-bold text-gray-400 me-1 align-self-start">$</span>
            <span className="fs-2hx fw-bolder text-dark me-2 lh-1">{props.amount}</span>
            <Badge bg="success" className="fs-6 lh-1 py-1 px-2 d-flex flex-center" style={{ height: '22px' }}>
              2.2%
            </Badge>
          </div>
          <span className="text-gray-400 pt-1 fw-bold fs-6">{props.title}</span>
        </div>
      </Card.Header>
      <Card.Body className="pt-2 pb-4 d-flex align-items-center">
        <div className="d-flex flex-center me-5 pt-2">
          <div style={{ minWidth: '70px', minHeight: '70px' }} data-kt-size="70" data-kt-line="11">
            <span></span>
            <canvas height="70" width="70"></canvas>
          </div>
        </div>
        <div className="d-flex flex-column content-justify-center w-100">
          <div className="d-flex fs-6 fw-bold align-items-center">
            <div className="bullet w-8px h-6px rounded-2 bg-danger me-3"></div>
            <div className="text-gray-500 flex-grow-1 me-4">{props.label1}</div>
            <div className="fw-boldest text-gray-700 text-xxl-end">{props.value1}</div>
          </div>
          <div className="d-flex fs-6 fw-bold align-items-center my-3">
            <div className="bullet w-8px h-6px rounded-2 bg-primary me-3"></div>
            <div className="text-gray-500 flex-grow-1 me-4">{props.label2}</div>
            <div className="fw-boldest text-gray-700 text-xxl-end">{props.value2}</div>
          </div>
          <div className="d-flex fs-6 fw-bold align-items-center">
            <div className="bullet w-8px h-6px rounded-2 me-3" style={{ backgroundColor: '#E4E6EF' }}></div>
            <div className="text-gray-500 flex-grow-1 me-4">{props.label3}</div>
            <div className="fw-boldest text-gray-700 text-xxl-end">{props.value3}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default MyCard;