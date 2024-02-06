import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import { Translate } from "../../Enums/Tranlate";
import TimeSlotService from "../../../services/TimeSlotService";
import CardItem from "./CardItem";

const TimeSlot = () => {
  const [timeSlot, setTimeSlot] = useState([]);
  const [hasData, setHasData] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth?.auth);
  const lang = useSelector((state) => state.auth?.lang);
  const timeSlotService = new TimeSlotService();
  const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);

  useEffect(() => {
    setLoading(true);
    timeSlotService.getList().then((res) => {
      if (res?.status === 200) {
        setTimeSlot(res.data.data);
        setHasData(1);
      }
      setLoading(false);
    });
  }, [shouldUpdate]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 ">
        <div></div>
        {isExist("time_slot") && (
          <Button
            variant="primary"
            className="me-2 h-75"
            onClick={() => navigate("/time-slot/specific-block")}
          >
            {Translate[lang].specific_block}
          </Button>
        )}
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body className={`${hasData === 0 && "text-center"} `}>
              {loading && (
                <div style={{ height: "300px" }}>
                  <Loader />
                </div>
              )}
              {hasData === 1 && !loading && (
                <Table responsive>
                  <thead>
                    <tr className="text-center">
                      <th>
                        <strong>I.D</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang].name}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang].from}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang].to}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang].capacity}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang].status}</strong>
                      </th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody className="table-body">
                    {timeSlot?.map((item, index) => {
                      return (
                        <CardItem
                          index={index}
                          key={index}
                          item={item}
                          setShouldUpdate={setShouldUpdate}
                        />
                      );
                    })}
                  </tbody>
                </Table>
              )}
              {hasData === 0 && <NoData />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default TimeSlot;
