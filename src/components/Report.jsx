// import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {
  Modal,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { report } from "api/AuthRequest";
import axios from "axios";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Report = ({ reportModal, setReportModal, postId }) => {
  const handleClose = (e) => {
    setReportModal(false);
  };
  // const posts = useSelector((state) => state.auth.posts);
  const reporterId = useSelector((state) => state.auth.user);

  const Submit = async (e, postId) => {
    e.preventDefault();
    const obj = {
      reason,
      reporterId: reporterId,
    };
    try {
      const response = await report(postId, obj);
      // const response= await axios.post(`http://localhost:3001/posts/${postId}/report-post`,obj)
      console.log(response, "response");

      if (response.status === 201) {
        toast.success("Report Submitted");
        setReportModal(false);
        console.log(response, "response");
      } else {
        toast.error(response.data.message);
        console.log(response, "erro");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [reason, setReason] = useState(null);
  return (
    <div>
      <Modal
        open={reportModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={(e) => Submit(e, postId)}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Report post</FormLabel>
              <RadioGroup aria-label="reason" name="reason">
                <FormControlLabel
                  value="spam"
                  control={<Radio />}
                  onChange={(e) => setReason("spam")}
                  label="spam"
                />
                <FormControlLabel
                  value="inappropriate"
                  control={<Radio />}
                  onChange={(e) => setReason("Inappropriate content")}
                  label="Inappropriate content"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  onChange={(e) => setReason("Other")}
                  label="Other"
                />
              </RadioGroup>
              <button type="submit" variant="warning">
                Submit
              </button>
            </FormControl>
          </form>
        </Box>
      </Modal>
      {/* <FormControl>
  <InputLabel id="">Reason for report</InputLabel>
  <Select
    labelId="report-reason-label"
    id="report-reason-select"
    value=""
    // {selectedReason}
    onChange=""
    // {handleReasonChange}
  >
    <MenuItem value="spam">Spam</MenuItem>
    <MenuItem value="harassment">Harassment</MenuItem>
    <MenuItem value="graphic_violence">Graphic violence</MenuItem>
    <MenuItem value="hate_speech">Hate speech</MenuItem>
  </Select>
</FormControl> */}
    </div>
  );
};

export default Report;
