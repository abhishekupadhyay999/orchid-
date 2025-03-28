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
        pageTitle("Hero Create");
      }, [pageTitle, version]);

      const [rows, setRows] = useState([]);

      useEffect(() => {

        const fetch = async() =>{

        axios.post("http://localhost:4000/api/hero/get-heros",{},{
            headers:{
            }
        })
          .then((response) => {
            const formattedData = response.data.map((item) => ({
              id: item.id,
              title: item.title,
              image: item.image ? `data:image/png;base64,${Buffer.from(item.image.data).toString("base64")}` : null,
            }));
            setRows(formattedData.map((obj, index) => ({ ...obj, srNo: index + 1 })))

            // setRows(formattedData);
          })
          .catch((error) => console.error("Error fetching data:", error));
        }

        fetch()
      }, []);
    
      const columns = [
        { field: "srNo", headerName: "ID", width: 90, flex:1 },
        { field: "title", headerName: "Title", width: 200, flex:1 },
        {
          field: "image",
          headerName: "Image",
          width: 150, 
          flex:1,
          renderCell: (params) =>
            params.value ? <Image src={params.value} alt="hero" width="150" height="150" /> : "No Image",
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
        const response  = axios.post('http://localhost:4000/api/hero/delete-hero',payload, {
            headers: { }
        });
        if(response.data.status == 200){
          fetch()
        }
      }
      const handleEdit = (id) =>{
        router.push(`/hero/${id}`)
      }

    return (
        <div className="col-12">
          <div className="card">
            <div className="card-header" style={{ display:'flex', justifyContent:'space-between'}}>
              <h4 className="card-title">Hero List</h4>
              <Button variant="contained" color="success" onClick={()=> router.push('/hero/createHero')}>
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
