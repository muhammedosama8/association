import { useLocation, useNavigate } from "react-router-dom"
import {
    Card,
    Table,
    Button,
    Dropdown,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Translate } from "../../../../Enums/Tranlate";
import { useSelector } from "react-redux";
import EditFamilyCardModal from "../EditFamilyCardModal";

const People = () =>{
    const [data, setData] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [item, setItem] = useState({})
    const location = useLocation()
    const navigate = useNavigate()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=> {
        setData(location?.state?.people)
    },[])

    return <>
    <Card className="mb-3">
        <Card.Body>
        <Table responsive>
            <thead>
                <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.membership_number}</strong>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="table-body">
                {data?.map((item,index)=>{
                    return <tr key={index} className='text-center'>
                        <td>
                            <strong>{item.id}</strong>
                        </td>
                        <td>
                            {item?.name}
                        </td>
                        <td>{item.membership_number}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="light sharp i-false"
                                >
                                    <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=> {
                                        setItem(item)
                                        setEditModal(true)
                                    }}> {Translate[lang]?.edit}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
            </td>
                    </tr>
                })}
            </tbody>
        </Table>
            <Button variant="secondary" type='button' onClick={()=> navigate("/family_card")} className='mt-5' >
                {Translate[lang]?.cancel}
            </Button>
        </Card.Body>
    </Card>
    {editModal && 
        <EditFamilyCardModal
          item={item} 
          editModal={editModal} 
          setEditModal={()=> setEditModal(false)}
          data={data}
          setData={setData}
      />}
    </>
}
export default People