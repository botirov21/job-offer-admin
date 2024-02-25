import React from "react";
import AddElonlar from "./addPrayerTime";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Popup from "reactjs-popup";
import { Input } from "@mui/material";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BASEURL = "https://api.al-qubo.com/api/v1/news";

const Elonlar = () => {
    const [open, setOpen] = useState(false);
    const [newData, setNewData] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(${ BASEURL } / getAllNews);
                const data = await response.json();
                setNewData(data.data);
                setFilteredData(data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);

    console.log(newData);
    // if (newData.length === 0) {
    //   return <div>Loading...</div>;
    // }

    const formattedDate = (createdAt) => {
        const date = new Date(createdAt);
        return date.toISOString().split("T")[0];
    };
    const reversedTableData = [...newData].reverse();

    const handleUpdate = async (id, close) => {
        try {
            const response = await fetch(${ BASEURL } / getAllNews / ${ id }, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                // You can update the body with the required fields to be updated
                body: JSON.stringify({
                    title: title,
                    desc: desc,
                }),
            });

            if (response.ok) {
                setOpen(true);
                setTimeout(() => {
                    close();
                }, 1000);
            } else {
                console.error("Error updating news");
            }
        } catch (error) {
            console.error("Error updating news:", error.message);
        }
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    <Popup
        trigger={
            <Button
                variant="outlined"
                endIcon={<CreateOutlinedIcon />}
            />
        }
        modal
        nested
    >
        {(close) => (
            <div className="modal">
                <button className="close" onClick={close}>
                    &times;
                </button>
                <div className="header" style={{ fontWeight: 600 }}>
                    Namoz Vaqtlari
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 10,
                    }}
                >
                    <div>
                        <span>Sarlovha:</span>
                        <Input
                            type="text"
                            color="primary"
                            style={{ marginLeft: 20 }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "start",
                            marginTop: 20,
                        }}
                    >
                        <span>Mazmun:</span>
                        <textarea
                            type="text"
                            color="primary"
                            rows={10}
                            style={{
                                marginLeft: 20,
                                marginTop: 20,
                                paddingLeft: 10,
                            }}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>
                <div className="actions">
                    <div
                        style={{ display: "flex", justifyContent: "right" }}
                    >
                        <Stack spacing={2}>
                            <Button
                                variant="contained"
                                color="success"
                                style={{ marginRight: 20 }}
                                onClick={() => handleUpdate(data._id, close)}
                            >
                                Tasdiqlash
                            </Button>
                            <Snackbar
                                open={open}
                                autoHideDuration={4000}
                                onClose={handleClose}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="success"
                                    sx={{ width: "100%" }}
                                >
                                    E'lon yangilandi! Iltimos tekshirib ko'ring
                                </Alert>
                            </Snackbar>
                        </Stack>
                        <Popup
                            trigger={
                                <Button
                                    variant="outlined"
                                    endIcon={<CreateOutlinedIcon />}
                                />
                            }
                            modal
                            nested
                        >
                            {(close) => (
                                <div className="modal">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="header" style={{ fontWeight: 600 }}>
                                        Namoz Vaqtlari
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: 10,
                                        }}
                                    >
                                        <div>
                                            <span>Sarlovha:</span>
                                            <Input
                                                type="text"
                                                color="primary"
                                                style={{ marginLeft: 20 }}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "start",
                                                marginTop: 20,
                                            }}
                                        >
                                            <span>Mazmun:</span>
                                            <textarea
                                                type="text"
                                                color="primary"
                                                rows={10}
                                                style={{
                                                    marginLeft: 20,
                                                    marginTop: 20,
                                                    paddingLeft: 10,
                                                }}
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="actions">
                                        <div
                                            style={{ display: "flex", justifyContent: "right" }}
                                        >
                                            <Stack spacing={2}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    style={{ marginRight: 20 }}
                                                    onClick={() => handleUpdate(data._id, close)}
                                                >
                                                    Tasdiqlash
                                                </Button>
                                                <Snackbar
                                                    open={open}
                                                    autoHideDuration={4000}
                                                    onClose={handleClose}
                                                >
                                                    <Alert
                                                        onClose={handleClose}
                                                        severity="success"
                                                        sx={{ width: "100%" }}
                                                    >
                                                        E'lon yangilandi! Iltimos tekshirib ko'ring
                                                    </Alert>
                                                </Snackbar>
                                            </Stack>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    console.log("modal closed ");
                                                    close();
                                                }}
                                            >
                                                Yopish
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            style={{
                                marginLeft: 10,
                            }}
                        />
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer >
    </div >
  );
};

export default Elonlar;