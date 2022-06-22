import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

import {
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import Notification from "./Notification";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};
const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
}));


const EditModal = (props) => {
  const [data, setData] = useState([]);
  const open = props.open
  const setOpen = props.setOpen
  const handleOpen = props.handleOpen
  const handleClose = props.handleClose
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const { register, handleSubmit, control, errors, setError, setValue } = useForm();
  const [maleRadio,setMaleRadio] = useState(false)
  const [femaleRadio,setFemaleRadio] = useState(false)

  const onSubmit = (data) => {

    handleClose()
    props.updateItem(data, props.name)

  }


  useEffect(() => {

    setTimeout(() => {
      setMaleRadio(false)
      setFemaleRadio(false)
      const name = props.name
      let data = JSON.parse(localStorage.getItem('data'))
      data.map((item) => {
        if (item.name == name) {
          
          setValue("name", item.name)
          setValue("email", item.email)
          setValue("gender", item.gender)
          if(item.gender == "male"){
            setMaleRadio(true)
          }else{
            setFemaleRadio(true)
          }
          
          setValue("designation", item.designation)
          setValue("date", item.date)
          setValue("skill", item.skill)
          console.log(item, "name")
        }
      })
    }, 500);
  }, [props])

  const onRadioButtonChange =(e)=>{
    console.log(e.target.name)
    console.log(e.target.checked)
    if(e.target.value == "male" && e.target.checked == true){
      setValue("male","male")
      setMaleRadio(true)
      setValue("female","")
      setFemaleRadio(false)
    }else if(e.target.value == "female" && e.target.checked == true){
      setValue("female","female")
      setFemaleRadio(e.target.checked)
      setValue("male","")
      setMaleRadio(false)
    }
  }


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>
          Edit model

          <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
              placeholder="Enter Your First Name"
              label="name"
              variant="outlined"
              fullWidth
              className={classes.inputField}
              name="name"
              inputRef={register({
                required: "Name is required.",
              })}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />


            <TextField
              placeholder="Enter Your E-mail Address"
              label="E-mail"
              variant="outlined"
              fullWidth
              className={classes.inputField}
              name="email"
              inputRef={register({
                required: "E-mail Address is required.",
              })}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />


            <FormControl
              className={classes.inputField}
              error={Boolean(errors.gender)}
            >
              <FormLabel>Choose Your Gender</FormLabel>
              <RadioGroup row name="gender" onChange={(e)=>{onRadioButtonChange(e)}}>
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      inputRef={register}
                    />
                  }
                  checked={femaleRadio}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      inputRef={register}
                    />
                  }
                  label="Male"
                  checked={maleRadio}
                  // onChange={(e)=>{setValue("male",e.target.checked)}}
                  // onChange={(e)=>{setMaleRadio(e.target.checked)}}
                  
                />
              </RadioGroup>
              <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              className={classes.inputField}
              error={Boolean(errors.designation)}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Your Designation
              </InputLabel>
              <Controller
                render={(props) => (
                  <Select value={props.value} onChange={props.onChange}>
                    <MenuItem value={"Trainee"}>Trainee</MenuItem>
                    <MenuItem value={"Junior devloper"}>Junior devloper</MenuItem>
                    <MenuItem value={"senior developer"}>Sinior devloper</MenuItem>
                  </Select>
                )}
                name="designation"
                control={control}
                defaultValue=""
                rules={{
                  required: "please choose your Designation",
                }}
              />
              <FormHelperText>{errors.course?.message}</FormHelperText>
            </FormControl>

            <TextField
              placeholder="Enter Your skill"
              label="skill"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.inputField}
              name="skill"
              inputRef={register({
                required: "skill is required.",
              })}
              error={Boolean(errors.skill)}
              helperText={errors.skill?.message}
            />


            <MuiPickersUtilsProvider utils={DateFnsUtils}>

              <Controller
                render={(props) => (
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Date"
                    value={props.value}
                    onChange={props.onChange}
                    fullWidth
                    error={Boolean(errors.date)}
                    helperText={errors.date?.message}
                  />
                )}
                name="date"
                defaultValue={null}
                control={control}
                rules={{
                  required: "Date is required.",
                }}
              />



            </MuiPickersUtilsProvider>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default EditModal;
