/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListDivider from "@mui/joy/ListDivider";
import { Button } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";


interface Job {
  _id: string;
  name: string;
  location: string;
  experience: string;
  education: string;
  corporateType: string;
  employmentType: string;
  salary: string;
  jobPosition: string;
  role: string;
  responsibilities: string;
  idealCandidate: string;
}

const BASEURL = "https://api-job-offer.isabek.uz/api/v1/";
export default function OrderList() {
  const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);
  const [openAllRole, setOpenAllRole] = React.useState<string | null>(null);
  const [openAllRes, setopenAllRes] = React.useState<string | null>(null);
  const [openAllIdeal, setopenAllIdeal] = React.useState<string | null>(null);
  const [allData, setAllData] = React.useState<Job[]>([]);
  const [name, setName] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [experience, setExperience] = React.useState<string>("");
  const [education, setEducation] = React.useState<string>("");
  const [corporateType, setCorporateType] = React.useState<string>("");
  const [employmentType, setEmploymentType] = React.useState<string>("");
  const [salary, setSalary] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [jobPosition, setJobPosition] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [responsibilities, setResponsibilities] = React.useState<string>("");
  const [idealCandidate, setIdealCandidate] = React.useState<string>("");

  // Function to fetch all data
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASEURL}jobs/allJobs`);
      const jobs: { data: Job[] } = await response.json();
      setAllData(jobs.data);
    } catch (error) {
      console.log("Job data is wrong:", error);
    }
  };

  // Fuction to search data from datas
  const filteredData = allData.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetching all data on component mount
  React.useEffect(() => {
    fetchData();
  }, []);

  // Function to handle addition of new data
  const handleAdd = async () => {
    try {
      const response = await fetch(`${BASEURL}jobs/addNewJob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          experience,
          education,
          corporateType,
          employmentType,
          salary,
          jobPosition,
          role,
          responsibilities,
          idealCandidate,
        } as Job),
      });

      if (response.ok) {
        setOpenAddModal(false);
        // Reset state values
        setName("");
        setLocation("");
        setExperience("");
        setEducation("");
        setCorporateType("");
        setEmploymentType("");
        setSalary("");
        // Refresh data after addition
        fetchData();
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Function deletion of data
  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`${BASEURL}jobs/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAllData((prevJobs) => prevJobs.filter((job) => job._id !== _id));
      } else {
        throw new Error(`Delete: ${response.status}`);
      }
    } catch (error) {
      console.error("job deleted:", error);
    }
  };

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      <div
        className="SearchAndFilters-tabletUp"
        style={{
          borderRadius: "sm",
          gap: '10px',
          display: 'flex',
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>There are {allData.length} jobs are available</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon/>}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FormControl>
        <Button
          variant="outlined"
          size="sm"
          color="neutral"
          startDecorator={<Add/>}
          onClick={() => setOpenAddModal(true)}
          sx={{height: "35px"}}
        >
          Add new job
        </Button>
      </div>
      {filteredData.map((data) => (
        <List
          key={data._id}
          size="sm"
          sx={{
            "--ListItem-paddingX": 0,
          }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              padding: '10px'
            }}
          >
            <ListItemContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Name:{" "}
                </Typography>
                <Typography fontWeight={500} gutterBottom>
                  {data.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Location:{" "}
                </Typography>
                <Typography fontWeight={500} gutterBottom>
                  {data.location}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Experience:{" "}
                </Typography>
                <Typography fontWeight={500} gutterBottom>
                  {data.experience}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Education:{" "}
                </Typography>
                <Typography fontWeight={500} gutterBottom>
                  {data.education}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Corporate Type:{" "}
                </Typography>
                <Typography fontWeight={500} gutterBottom>
                  {data.corporateType}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Employment Type:{" "}
                </Typography>
                <Typography fontWeight={500} gutterBottom>
                  {data.employmentType}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Salary:{" "}
                </Typography>
                <Typography fontWeight={500} gutterBottom>
                  {data.salary}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Job Position:{" "}
                </Typography>
                <Typography fontWeight={500} gutterBottom>
                  {data.jobPosition}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Role:{" "}
                </Typography>
                <Typography
                  fontWeight={500}
                  gutterBottom
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  {data.role.length > 20
                    ? data.role.substring(0, 20)
                    : data.role}
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenAllRole(data._id)}
                  >
                    more..
                  </button>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Responsibilities:{" "}
                </Typography>
                <Typography
                  fontWeight={500}
                  gutterBottom
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  {data.responsibilities.length > 20
                    ? data.role.substring(0, 20)
                    : data.role}
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setopenAllRes(data._id)}
                  >
                    more..
                  </button>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Typography fontWeight={700} gutterBottom>
                  Ideal Candidate :{" "}
                </Typography>
                <Typography
                  fontWeight={500}
                  gutterBottom
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  {data.idealCandidate.length > 20
                    ? data.role.substring(0, 20)
                    : data.role}
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setopenAllIdeal(data._id)}
                  >
                    more..
                  </button>
                </Typography>
              </Box>
                <Button onClick={() => handleDelete(data._id)} color="danger">
                  Delete offer
                </Button>
              <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
                <ModalDialog>
                  <DialogTitle>Add New Information</DialogTitle>
                  <form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                      event.preventDefault();
                      handleAdd();
                    }}
                  >
                    <Stack sx={{display: "flex" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div>
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Location</FormLabel>
                            <Input
                              placeholder="Location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Experience</FormLabel>
                            <Input
                              placeholder="Experience"
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Education</FormLabel>
                            <Input
                              placeholder="Education"
                              value={education}
                              onChange={(e) => setEducation(e.target.value)}
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Corporate Type</FormLabel>
                            <Input
                              placeholder="Corporate Type"
                              value={corporateType}
                              onChange={(e) => setCorporateType(e.target.value)}
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                        </div>
                        <div>
                          <FormControl>
                            <FormLabel>Salary</FormLabel>
                            <Input
                              placeholder="Salary"
                              value={salary}
                              onChange={(e) => setSalary(e.target.value)}
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Job Position</FormLabel>
                            <Input
                              placeholder="Job Position"
                              value={jobPosition}
                              onChange={(e) => setJobPosition(e.target.value)}
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input
                              placeholder="Role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Responsibilities</FormLabel>
                            <Input
                              placeholder="Responsibilities"
                              value={responsibilities}
                              onChange={(e) =>
                                setResponsibilities(e.target.value)
                              }
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Ideal Candidate</FormLabel>
                            <Input
                              placeholder="Ideal Candidate"
                              value={idealCandidate}
                              onChange={(e) =>
                                setIdealCandidate(e.target.value)
                              }
                              autoFocus
                              required
                              sx={{width: "150px"}}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormControl>
                        <FormLabel>Employment Type</FormLabel>
                        <Input
                          placeholder="Employment type"
                          value={employmentType}
                          onChange={(e) => setEmploymentType(e.target.value)}
                          autoFocus
                          required
                        />
                      </FormControl>
                      <Button sx={{marginTop: "20px"}} type="submit" color="success">Add</Button>
                    </Stack>
                  </form>
                </ModalDialog>
              </Modal>
              <Modal
                open={openAllRole === data._id}
                onClose={() => setOpenAllRole(null)}
              >
                <ModalDialog>
                  <p>{data.role}</p>
                </ModalDialog>
              </Modal>
              <Modal
                open={openAllRes === data._id}
                onClose={() => setopenAllRes(null)}
              >
                <ModalDialog>
                  {data.responsibilities && (
                    <>
                      <Typography>Responsibilities:</Typography>
                      <ul style={{ marginTop: "3px" }}>
                        {data.responsibilities
                          .split(".")
                          .map((responsibility, index) => (
                            <li
                              style={{
                                fontFamily: "Outfit",
                                fontWeight: "300",
                              }}
                              key={index}
                            >
                              {responsibility.trim()}
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                </ModalDialog>
              </Modal>
              <Modal
                open={openAllIdeal === data._id}
                onClose={() => setopenAllIdeal(null)}
              >
                <ModalDialog>
                  <p>{data.idealCandidate}</p>
                </ModalDialog>
              </Modal>
            </ListItemContent>
          </ListItem>
          <ListDivider />
        </List>
      ))}
    </Box>
  );
}
