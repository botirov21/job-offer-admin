/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Popup from "reactjs-popup";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { X } from "@mui/icons-material";

interface Job {
  _id: string;
  name: string;
  location: string;
  experience: string;
  education: string;
  corporateType: string;
  employmentType: string;
  salary: string;
}

const BASEURL = "http://localhost:5050/api/v1";
export default function OrderTable() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [allData, setAllData] = React.useState<Job[]>([]);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [experience, setExperience] = React.useState<string>("");
  const [education, setEducation] = React.useState<string>("");
  const [corporateType, setCorporateType] = React.useState<string>("");
  const [employmentType, setEmploymentType] = React.useState<string>("");
  const [salary, setSalary] = React.useState<string>("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}/jobs/allJobs`);
        const jobs: { data: Job[] } = await response.json();
        setAllData(jobs.data);
      } catch (error) {
        console.log("Motor data is wrong:", error);
      }
    };
    fetchData();
  }, []);

  //For Delete Data
  const handleDeleteClick = async (_id: string) => {
    try {
      const response = await fetch(`${BASEURL}/jobs/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAllData((prevJobs) => prevJobs.filter((job) => job._id !== _id)); // Update allData
      } else {
        throw new Error(
          `Delete request failed with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error deleting job:", error); // Updated resource name
      // Handle the error appropriately
    }
  };

  //For Update Data
  const handleUpdateClick = async (_id: string) => {
    try {
      const response = await fetch(`${BASEURL}/jobs/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Fix the typo here
        },
        body: JSON.stringify({
          name,
          location,
          experience,
          education,
          corporateType,
          employmentType,
          salary,
        } as Job),
      });
      if (response.ok) {
        setOpenEdit(false);
      }
    } catch (error) {
      console.error;
    }
  };

  return (
    <React.Fragment>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for offer</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        <Button
                    variant="outlined"
                    size="sm"
                    color="neutral"
                    startDecorator={<Add />}
                  >
                    New project
                  </Button>
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              ></th>
              <th style={{ width: 140, padding: "12px 6px" }}>Name</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Location</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Experience</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Education</th>
              <th style={{ width: 140, padding: "12px 6px" }}>
                Corporate Type
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>
                Employment Type
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Salary</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Tools</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((data) => (
              <tr key={data._id}>
                <td style={{ textAlign: "center", width: 120 }}></td>
                <td>
                  <Typography level="body-xs">{data.name}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{data.location}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{data.experience}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{data.education}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{data.corporateType}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{data.employmentType}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{data.salary}</Typography>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Link level="body-xs" component="button">
                      Download
                    </Link>
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: {
                            variant: "plain",
                            color: "neutral",
                            size: "sm",
                          },
                        }}
                      >
                        <MoreHorizRoundedIcon />
                      </MenuButton>
                      <Menu size="sm" sx={{ minWidth: 140 }}>
                        <MenuItem onClick={() => setOpen(true)}>Edit</MenuItem>
                        <MenuItem
                          onClick={() => handleDeleteClick(data._id)}
                          color="danger"
                        >
                          Delete
                        </MenuItem>
                        <Divider />
                      </Menu>
                    </Dropdown>
                    <Sheet>
                      <Modal open={open} onClose={() => setOpen(false)}>
                        <ModalDialog>
                          <DialogTitle>Edit Information</DialogTitle>
                          <form
                            onSubmit={(
                              event: React.FormEvent<HTMLFormElement>
                            ) => {
                              event.preventDefault();
                              setOpen(false);
                            }}
                          >
                            <Stack spacing={2}>
                              <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                  placeholder="Name"
                                  onChange={(e) => setName(e.target.value)}
                                  autoFocus
                                  required
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel> Experience</FormLabel>
                                <Input
                                  placeholder="Location"
                                  onChange={(e) => setLocation(e.target.value)}
                                  autoFocus
                                  required
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Experience</FormLabel>
                                <Input
                                  placeholder="Experience"
                                  onChange={(e) =>
                                    setExperience(e.target.value)
                                  }
                                  autoFocus
                                  required
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Education</FormLabel>
                                <Input
                                  placeholder="Education"
                                  onChange={(e) => setEducation(e.target.value)}
                                  autoFocus
                                  required
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Corporate Type </FormLabel>
                                <Input
                                  placeholder="Corporate Type"
                                  onChange={(e) =>
                                    setCorporateType(e.target.value)
                                  }
                                  autoFocus
                                  required
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Employment Type</FormLabel>
                                <Input
                                  placeholder="Employment Type"
                                  onChange={(e) =>
                                    setEmploymentType(e.target.value)
                                  }
                                  autoFocus
                                  required
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Salary</FormLabel>
                                <Input
                                  placeholder="Salary"
                                  onChange={(e) => setSalary(e.target.value)}
                                  autoFocus
                                  required
                                />
                              </FormControl>
                              <Button
                                type="submit"
                                onClick={() => handleUpdateClick(data._id)}
                              >
                                Update
                              </Button>
                              <Button
                                color="danger"
                                type="submit"
                                onClick={() => handleUpdateClick(data._id)}
                              >
                                Cancel
                              </Button>
                            </Stack>
                          </form>
                        </ModalDialog>
                      </Modal>
                    </Sheet>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
