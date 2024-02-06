import { useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";

const KYCRequests = () => {
  const [search, setSearch] = useState(null);
  const lang = useSelector((state) => state.auth?.lang);
  const Auth = useSelector((state) => state.auth?.auth);
  const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);

  return (
    <>
      <Card className="mb-3">
        <Card.Body className="d-flex justify-content-between p-3 align-items-center">
          <div className="input-group w-50">
            <input
              type="text"
              style={{
                borderRadius: "8px",
                color: "initial",
                padding: "18px 16px",
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
                zIndex: "99",
                right: lang === "en" && "16px",
                left: lang === "ar" && "16px",
                top: "50%",
                transform: "translate(0, -50%)",
              }}
            ></div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default KYCRequests;
