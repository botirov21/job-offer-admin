import * as React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";

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
export default function OrderTable() {
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
    <React.Fragment>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          alignItems: "end",
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search job for offer</FormLabel>
          <FormLabel>There are {allData.length} jobs are available</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FormControl>
        <Button
          variant="outlined"
          size="sm"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpenAddModal(true)}
          sx={{height: "35px"}}
        >
          Add new job 
        </Button>
      </Box>
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <ModalDialog>
          <DialogTitle>Add New Information</DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleAdd();
            }}
          >
            <Stack spacing={2} sx={{ p: 2, display: "flex"}}>
              <div style={{display: "flex", gap: "40px"}}>
                <div>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
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
                />
              </FormControl>
              <FormControl>
                <FormLabel>Responsibilities</FormLabel>
                <Input
                  placeholder="Responsibilities"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ideal Candidate</FormLabel>
                <Input
                  placeholder="Ideal Candidate"
                  value={idealCandidate}
                  onChange={(e) => setIdealCandidate(e.target.value)}
                  autoFocus
                  required
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
            <Button type="submit">Add</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
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
              <th style={{ width: 160, padding: "12px 6px" }}>Name</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Location</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Experience</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Education</th>
              <th style={{ width: 140, padding: "12px 6px" }}>
                Corporate Type
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>
                Employment Type
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Salary</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Job Positon</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Role</th>
              <th style={{ width: 140, padding: "12px 6px" }}>
                Responsibilities
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>
                Ideal Candidate
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Tolls</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
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
                  <Typography level="body-xs">{data.jobPosition}</Typography>
                </td>
                <td>
                  <Typography
                    level="body-xs"
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
                </td>
                <td>
                  <Typography
                    level="body-xs"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    {data.responsibilities.length > 20
                      ? data.responsibilities.substring(0, 20) + "..."
                      : data.responsibilities}
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
                </td>
                <td>
                  <Typography level="body-xs">
                    {data.idealCandidate.length > 20
                      ? data.idealCandidate.substring(0, 20) + "..."
                      : data.idealCandidate}
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
                  </Typography>{" "}
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
                        <MenuItem
                          onClick={() => handleDelete(data._id)}
                          color="danger"
                        >
                          Delete
                        </MenuItem>
                        <Divider />
                      </Menu>
                    </Dropdown>
                  </Box>
                </td>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      {/* <Box
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
      </Box> */}
    </React.Fragment>
  );
}
