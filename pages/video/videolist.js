import { moodChange, pageTitle } from "../../src/redux/action/utils";
import { DataGrid } from '@mui/x-data-grid';
import Image from "next/image";
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "@mui/material";
import { useRouter } from 'next/router'



const Element = ({pageTitle}) => {
    const router = useRouter()
      const version = useSelector((state) => state.theme.version);

      useEffect(() => {
        if (version !== "dark") {
          moodChange();
        }
        pageTitle("Video Create");
      }, [pageTitle, version]);

      const [rows, setRows] = useState([]);

      useEffect(() => {
        axios
          .post("http://localhost:4000/api/video/get-video", {})
          .then((response) => {
            console.log("Videos fetched successfully");
      
            const formattedData = response.data.map((item, index) => {
              let videoUrl = null;
      
              if (item.video) {
                // Convert base64 string to Blob and create an Object URL
                const blob = new Blob([new Uint8Array(item.video.data)], { type: "video/mp4" }); 
                videoUrl = URL.createObjectURL(blob);
              }
      
              return {
                id: item.id,
                videoUrl, // Store the generated video URL
                srNo: index + 1, // Add serial number
              };
            });
      
            setRows(formattedData);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, []);
      
    
      const columns = [
        { field: "srNo", headerName: "ID", width: 90, flex:1 },
        {
          field: "image",
          headerName: "Image",
          width: 150, 
          flex:1,
          renderCell: (params) =>
            params.value ? (
              <video width="100" height="100" controls>
                <source src={params.value} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              "Video Is Available but to big to render"
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            sortable: false,flex:1,
            renderCell: (params) => (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(params.row.id)}
                  style={{ marginRight: 8 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </Button>
              </>
            ),
          },
      ];

      const handleDelete = (id) => {
        const payload = {
            id: id
        }
        const response  = axios.post('http://localhost:4000/api/video/delete-video',payload, {
            headers: { }
        });
        console.log(response)
      }
      const handleEdit = (id) =>{
        router.push(`/video/${id}`)
      }

    return (
        <div className="col-12">
          <div className="card">
            <div className="card-header" style={{ display:'flex', justifyContent:'space-between'}}>
              <h4 className="card-title">Video List</h4>
              <Button variant="contained" color="success" onClick={()=> router.push('/video/createVideo')}>
                Create
              </Button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
              <DataGrid 
              rows={rows} 
              columns={columns}
              disableRowSelectionOnClick
               pageSize={5} 
               hideFooter
               sx={{
                boxShadow: 2,
                width: '100%',
                overflowX: 'scroll',
                mb: 2
              }}
               />
              </div>
            </div>
          </div>
        </div>
    )
}

export default connect(null, { pageTitle })(Element);
