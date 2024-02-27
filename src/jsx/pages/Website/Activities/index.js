import React, { Fragment } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import BrandsService from "../../../../services/BrandsService";
import Loader from "../../../common/Loader";
import NoData from "../../../common/NoData";
import Pagination from "../../../common/Pagination/Pagination";
import { Translate } from "../../../Enums/Tranlate";
import AddActivitiesModal from "./AddActivitiesModal";
import CardItem from "./CardItem";
import activityLogo from "../../../../images/activityLogo.svg"
import './style.scss'

const Activities = () => {
    const [data, setData] = useState([
      {id: 1, logo: activityLogo, title: 'الخيم الرمضانيه', description: 'خلافًا للاعتقاد الشائع، فإن إيبسوم ليس مجرد نص عشوائي. ,لها جذور في قطعة.'},
      {id: 1, logo: activityLogo, title: 'رحلات بحريه', description: 'خلافًا للاعتقاد الشائع، فإن إيبسوم ليس مجرد نص عشوائي. ,لها جذور في قطعة.'},
      {id: 1, logo: activityLogo, title: 'جزيرة فليكا', description: 'خلافًا للاعتقاد الشائع، فإن إيبسوم ليس مجرد نص عشوائي. ,لها جذور في قطعة.'},
      {id: 1, logo: activityLogo, title: 'تذاكر ترفيهية', description: 'خلافًا للاعتقاد الشائع، فإن إيبسوم ليس مجرد نص عشوائي. ,لها جذور في قطعة.'},
      {id: 1, logo: activityLogo, title: 'اشتراكات صالات رياضية', description: 'خلافًا للاعتقاد الشائع، فإن إيبسوم ليس مجرد نص عشوائي. ,لها جذور في قطعة.'},
      {id: 1, logo: activityLogo, title: 'شاليهات', description: 'خلافًا للاعتقاد الشائع، فإن إيبسوم ليس مجرد نص عشوائي. ,لها جذور في قطعة.'},
    ])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(1)//null
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const brandsService = new BrandsService()
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body className="d-flex justify-content-between p-3 align-items-center">
          <div className="input-group w-50">
            <input 
                type="text" 
                style={{borderRadius: '8px',
                color: 'initial',
                padding: '18px 16px'}}
                className="form-control"
                placeholder={`${Translate[lang]?.search_by} I.D, ${Translate[lang]?.name}`}
                value={search}
                onChange={e=> setSearch(e.target.value)} 
            />
            <div className="flaticon-381-search-2"
              style={{position: 'absolute',zIndex:'99', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          {isExist('website') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.activity}
          </Button>}
        </Card.Body >
      </Card>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body className={`${hasData === 0 && 'text-center'} `}>
            {loading && <div style={{height: '300px'}}>
                <Loader />
              </div>}
              {(hasData === 1 && !loading) && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.image}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.title}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.description}</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <CardItem 
                            index= {index}
                            key= {index}
                            item={item}
                            setItem={setItem}
                            setAddModal={setAddModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              {/* <Pagination
                  setData={setBrands}
                  service={brandsService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && 
        <AddActivitiesModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}
    </Fragment>
  );
};

export default Activities;
