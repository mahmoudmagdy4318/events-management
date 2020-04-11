import React, { useState, useEffect } from "react";
import instance from "../../api/axiosInstance";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import WithAdminHeader from "../../HOCs/WithAdminHeader";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function AdminProfile() {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    instance
      .get("/admin/profile")
      .then((res) => {
        setNotifications(res.notifications);
      })
      .catch((error) => {
        history.push("/login");
      });
  }, []);

  return (
    <>
      <Accordion className="col-4">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <h1 className="display-2 text-warning">notifications</h1>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">date</th>
                  <th scope="col">notifications</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification._id}>
                    <td className="text-info">
                      <Moment format="YYYY/MM/DD">{notification.date}</Moment>
                    </td>
                    <td className="text-danger">{notification.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}
export default WithAdminHeader(AdminProfile);
