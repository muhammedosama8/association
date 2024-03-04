import { useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserService from "../../../services/UserService";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
import CardItem from "./CardItem";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [hasData, setHasData] = useState(null);
  const [search, setSearch] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state?.auth.lang);
  const userService = new UserService();

  return (
    <>
      <Card className="d-flex mb-3 p-3 justify-content-between">
        <div className="input-group w-50">
          <input
            type="text"
            style={{
              borderRadius: "8px",
              color: "initial",
              padding: "18px",
            }}
            className="form-control"
            placeholder={`${Translate[lang]?.search_by} I.D, ${Translate[lang]?.name}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className="flaticon-381-search-2"
            style={{
              position: "absolute",
              zIndex: "1",
              right: lang === "en" && "16px",
              left: lang === "ar" && "16px",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
          ></div>
        </div>
      </Card>
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
                    <strong>{Translate[lang]?.name}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.email}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.phone}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.status}</strong>
                  </th>
                  <th>
                    <strong>{Translate[lang]?.verified}</strong>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => {
                  return (
                    <CardItem
                      key={index}
                      index={index}
                      item={item}
                      setShouldUpdate={setShouldUpdate}
                    />
                  );
                })}
              </tbody>
            </Table>
          )}

          {hasData === 0 && <NoData />}

          <Pagination
            setData={setUsers}
            service={userService}
            shouldUpdate={shouldUpdate}
            setHasData={setHasData}
            setLoading={setLoading}
            search={search}
          />
        </Card.Body>
      </Card>
    </>
  );
};
export default Users;
