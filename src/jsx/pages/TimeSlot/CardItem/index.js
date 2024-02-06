import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Translate } from "../../../Enums/Tranlate";
// import TimeSlotService from "../../../../services/TimeSlotService";
import EditTimeSlotModal from "../EditModal";

const CardItem = ({ item, index, setShouldUpdate }) => {
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const Auth = useSelector((state) => state.auth?.auth);
  const lang = useSelector((state) => state.auth.lang);
  const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
  // const timeSlotService = new TimeSlotService()

  const changeStatusToggle = (e) => {
    if (!item.capacity || !item.interval_min || !item.to || !item.from) {
      toast.error("Edit Values First");
      return;
    }
    let data = {
      availableDays: [
        {
          capacity: item.capacity,
          interval_min: item.interval_min,
          to: item.to?.slice(0, 5),
          from: item.from?.slice(0, 5),
          isOpen: e.target.checked,
          id: item.id,
        },
      ],
    };
    // setLoading(true);
    // timeSlotService.create(data).then((res) => {
    //   if (res?.status === 201) {
    //     toast.success("TimeSlot Updated Successfully");
    //     setShouldUpdate((prev) => !prev);
    //   }
    //   setLoading(false);
    // });
  };
  return (
    <tr key={index} className="text-center">
      <td>
        <strong>{item.id}</strong>
      </td>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>{item.from || "-"}</td>
      <td>{item.to || "-"}</td>
      <td>{item.capacity || "-"}</td>
      <td>
        <Form.Check
          type="switch"
          style={{ cursor: "pointer" }}
          id={`custom-switch${index}`}
          checked={item.isOpen}
          disabled={loading}
          onChange={(e) => {
            if (!isExist("time_slot")) {
              return;
            }
            changeStatusToggle(e);
          }}
        />
      </td>
      <td>
        {isExist("time_slot") && (
          <Dropdown>
            <Dropdown.Toggle
              // variant="success"
              className="light sharp i-false"
            >
              <i className="la la-ellipsis-v" style={{ fontSize: "27px" }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setEditModal(true);
                }}
              >
                {" "}
                {Translate[lang].edit}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </td>

      {editModal && (
        <EditTimeSlotModal
          modal={editModal}
          setModal={() => setEditModal(false)}
          item={item}
          setShouldUpdate={setShouldUpdate}
        />
      )}
    </tr>
  );
};
export default CardItem;
