import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getReport, removePost } from "api/AuthRequest";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Reporterlist = () => {
  const handleDelete = async (postid) => {
    console.log(postid);
    let arr = user;
    console.log(arr, "arrray in admin");
    const response = await removePost(postid);
    // const response = await axios.delete(
    //   'http://localhost:3001/admin/remove-post',{
    //     postid

    //   }

    //   );
    console.log(user, "post report section");
    arr = arr.filter((val) => val._id !== postid);
    console.log(arr, "after deletion ");
    setUser(arr);
    if (response) {
      // setRemove(true);
      console.log(response);
      // setAnchorEl(null);
    }
    // console.log(response,'responseresponse');
  };

  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getReports() {
      const Reports = await getReport();
      // const Reports= await axios.get('http://localhost:3001/admin/reports'
      // withCredentials: true
      // )
      if (Reports?.status === 201) {
        console.log(Reports.data.reports, "jhgfydfgku");
        setUser(Reports.data.reports);
        console.log(Reports.data.reports);
      } else {
        // alert('error')
      }
    }
    getReports();
  }, []);

  return (
    <React.Fragment>
      <div className="userTable-main">
        <div className="usersList">
          <Table striped bordered hover style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>PostId</th>
                <th>ReportCount</th>
                <th>reportreason</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {user
                ? user.map((reports, index) => {
                    console.log(reports.r, "reportsresult");
                    return (
                      <tr>
                        <td>{reports._id}</td>
                        <td>{reports.reports.length}</td>
                        <td>{reports.reports[index]?.reason}</td>
                        <td>
                          {
                            <button onClick={() => handleDelete(reports._id)}>
                              Delete
                            </button>
                          }
                        </td>

                        <td>{}</td>
                      </tr>
                    );
                  })
                : "null"}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Reporterlist;
