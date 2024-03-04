import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminService from "../../../services/AdminService";
import "./style.scss";
import { Translate } from "../../Enums/Tranlate";

const Home = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const adminService = new AdminService();
  const lang = useSelector((state) => state.auth.lang);

  useEffect(() => {
    setLoading(true);
    adminService.getDashboard().then((res) => {
      if (res && res?.status === 200) {
        setFormData(res.data.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Row>
        {Object.entries(formData)?.map((data) => {
          return (
            <Col className="col-md-3 col-sm-4">
              <Card style={{ height: "128.75px" }}>
                <Card.Body>
                  <div class="skeleton-loader">
                    <div class="loader-header"></div>
                    <div class="loader-content"></div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }

  return (
    <div className="row dashboard">
      <div className="col-md-12 col-sm-12 mb-3">
        <h3>{Translate[lang].website}</h3>
      </div>
      
      <div className="col-md-3 col-sm-4">
        <div className="card">
          <div className="card-body">
            <p className="mb-1">{Translate[lang]?.total_admins}</p>
            <p className="fs-32 mb-0 text-black font-w700">
              {formData.totalAdmins}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-4">
        <div className="card">
          <div className="card-body">
            <p className="mb-1">{Translate[lang]?.total_activities_and_events}</p>
            <p className="fs-32 mb-0 text-black font-w700">
              {formData.totalActivitiesAndEvents}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-4">
        <div className="card">
          <div className="card-body">
            <p className="mb-1">{Translate[lang]?.total_board_of_directors}</p>
            <p className="fs-32 mb-0 text-black font-w700">
              {formData.totalBoardOfDirectors}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-4">
        <div className="card">
          <div className="card-body">
            <p className="mb-1">{Translate[lang]?.total_branches_and_markets}</p>
            <p className="fs-32 mb-0 text-black font-w700">
              {formData.totalBranchesAndMarkets}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-4">
        <div className="card">
          <div className="card-body">
            <p className="mb-1">{Translate[lang]?.total_news}</p>
            <p className="fs-32 mb-0 text-black font-w700">
              {formData.totalNews}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-4">
        <div className="card">
          <div className="card-body">
            <p className="mb-1">{Translate[lang]?.total_offers}</p>
            <p className="fs-32 mb-0 text-black font-w700">
              {formData.totalOffers}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-4">
        <div className="card">
          <div className="card-body">
            <p className="mb-1">{Translate[lang]?.total_users}</p>
            <p className="fs-32 mb-0 text-black font-w700">
              {formData.totalUsers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
