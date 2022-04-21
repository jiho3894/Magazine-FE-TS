import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { storage } from "../shared/firebase";
/* import { postSignup } from "../api/query"; */

type Inputs = {
  contents: string;
};

const WriteBtn = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const fileInput = useRef<HTMLInputElement>();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImgBase64("");
    setValue("contents", "");
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const onChange = (e: React.ChangeEvent) => {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    let target = e.target as HTMLInputElement;
    if (target.files[0]) {
      reader.readAsDataURL(target.files[0]);
      setImgFile(target.files[0]);
    }
  };

  /* const { mutate, data, isSuccess } = postSignup(); */
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let image = fileInput?.current?.files[0];
    if (!image) {
      alert("이미지를 넣어주세요");
      return;
    }
    const _upload = storage.ref(`images/${image.name}`).put(image);
    console.log(_upload);
    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        /* mutate({
          username: url,
          password: "123123",
          passwordCheck: "123123",
          email: data.contents,
        }); */
        console.log(url);
        setOpen(false);
        setImgBase64("");
        setValue("contents", "");
        setAlertOpen(true);
      });
    });
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Fab
        size="medium"
        color="secondary"
        aria-label="edit"
        onClick={handleClickOpen}
      >
        <EditIcon fontSize="medium" />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 게시물 만들기</DialogTitle>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="w-[520px] h-[520px] flex flex-col justify-center items-center">
            {imgBase64 === "" ? (
              <DialogContentText>사진을 등록해주세요</DialogContentText>
            ) : null}
            <label htmlFor="icon-button-file">
              <input
                type="file"
                id="icon-button-file"
                className="hidden"
                onChange={onChange}
                ref={fileInput}
                name={imgFile}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
            {imgBase64 ? (
              <img
                width="250px"
                height="250px"
                onDoubleClick={() => console.log("hi")}
                src={imgBase64}
              ></img>
            ) : null}
            <TextField
              autoFocus
              margin="dense"
              id="contents"
              label="내용 작성"
              type="text"
              fullWidth
              variant="standard"
              {...register("contents")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              <strong>취소</strong>
            </Button>
            <Button type="submit">
              <strong>업로드</strong>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          게시물 등록 완료!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default WriteBtn;
