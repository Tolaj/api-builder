import React,{useState,useEffect,useMemo,useCallback,useRef} from "react"
import { AgGridReact } from 'ag-grid-react';
import { isUserSignedIn , getTokenData} from "utils/auth";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRouter } from "next/router"
import axios from "axios";



const MyCompProfile = params => {
    return (
    <span className="flex items-center float-left" >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 rounded-full text-[#24346D]">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>    {params.value}
    </span>
    );
    };

    const MyCompColor = params => {
        return (
        <span className={`${params.value == "ACTIVE"?"text-green-600":params.value =="PENDING" ? "text-yellow-500":"text-red-600"} items-center justify-center flex`} >
            {params.value}
        </span>
        );
        };
    const ActionButton = (params) => {
        const ActionAlumniData = async (data)=>{
            if(data.accountStatus == "DELETE"){
                await axios.delete(process.env.SERVER_API+"api/alumni/", {data})
                .then((rowData) => {
                    params.setReloadChild(Math.random())
                })
            }else{
                !isUserSignedIn() ? router.push('/') : null
                const formData = new FormData();
                formData.append("document", JSON.stringify(data));
                let token = localStorage.getItem('token')
                await axios.put(process.env.SERVER_API+"api/alumni/", formData,{
                    headers: {
                    'Authorization': token
                    },
                })
                .then((rowData) => {
                    params.node.setDataValue('accountStatus', rowData.data.alumniData.accountStatus); 
                })
            }
        }
            return (<>
                        <div   className="flex items-center justify-around text-transparent">.
                          

                        
                            <div title="View" onClick={()=>{params.setModalToggle("/admin/alumniManagement");params.setAlumniData(params.data)}} >
                                <svg  className="w-6 h-6 text-yellow-500 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div title="Save" onClick={()=>{params.setModalToggle("/admin/alumniManagement");params.setAlumniData(params.data)}} >
                 
                               
                                <svg className="w-6 h-6 text-green-500 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                </svg>

                            </div>
                            

                            <div title="Delete" onClick={()=>ActionAlumniData({_id:params.data._id,accountStatus:"DELETE"})}  className={`${params.value == "INACTIVE" ? "visible" : "visible"}`}>
                                <svg className="w-6 h-6 text-red-700 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </div>


                        </div>

            

            </>
            );
            };

            const ButtonFilterHeaderComponent = (params) => {
                const handleButtonClick = () => {
                  // Add your button click logic here
                  params.addEmptyRow()
                };
              
                return (
                
                  <div className="text-center ">
                  <button
                    className="bg-white flex items-center gap-3 text-black active:bg-slate-200 text-sm font-medium  px-6 py-3 rounded-full hover:shadow-md outline-none focus:outline-none mr-1 mb-1 w-fit ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleButtonClick}
                //   onClick={()=>{props.setModalToggle(router.route)}}
                  >
                    <div>
                    Add API
                    </div>
                    
                    <div>
    
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-[#F0BD66] w-4 h-4 font-block" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
    
                    </div>
    
                  </button>
                
                </div>
                );
              };

  const payloadCell = (params)=>{
   
   
    if(true){
        return (<div class={`grid ${"grid-rows-"+(params.data.payload.length>2?'3':params.data.payload.length<2?'1':'2')} justify-start grid-flow-col gap-y-2 py-2`}>
        {params.data.payload.map((item, index) => {
            return (
                <div class="flex-shrink-0 inline-flex max-w-fit items-center px-2 py-1 mr-2 text-xs text-gray-800 bg-[#F0BD66] rounded">
                    {item.fieldName} - {item.dataType}
                    <button type="button" class="inline-flex items-center p-1 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300" data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Remove badge</span>
                    </button>
                </div>
            );
        })}
    </div>)
    }else{
        return(<>
            <div className=" absolute left-0 pt-2 ">
              <div className="grid grid-flow-row gap-1" >
                  {params.data.payload.map((item,index)=>{
                    return (<div className=" flex justify-between items-center gap-2">
                            <div className="flex gap-1">
                            <input type="text" class="h-8 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Field Name" required/>
                            <input type="text" class="h-8 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Data Type" required/>
                            </div> 
                            <div className=" ">
                
                                <svg className="text-red-400 hover:bg-white hover:cursor-pointer rounded-full w-5 h-5 font-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                     <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </div>
                        </div>)
                  })}
                    
                
              </div>
              <div className=" float-right " title="Add Input Field">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#F0BD66] hover:bg-white hover:cursor-pointer rounded-full w-5 h-5 font-block" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
              
            </div>
            </>)
    }
      
  }

  const statusCodeCell = (params)=>{
   
   
    if(true){
        return (<div class={`grid ${"grid-rows-"+(params.data.statusCode.length>2?'3':params.data.statusCode.length<2?'1':'2')} justify-start grid-flow-col gap-y-2 py-2`}>
        {params.data.statusCode.map((item, index) => {
            return (
                <div class="flex-shrink-0 inline-flex max-w-fit items-center px-2 py-1 mr-2 text-xs text-gray-800 bg-slate-300 rounded">
                    {item.code} - {item.remark}
                    <button type="button" class="inline-flex items-center p-1 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300" data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Remove badge</span>
                    </button>
                </div>
            );
        })}
    </div>)
    }else{
        return(<>
            <div className=" absolute left-0 pt-2 ">
              <div className="grid grid-flow-row gap-1" >
                  {params.data.statusCode.map((item,index)=>{
                    return (<div className=" flex justify-between items-center gap-2">
                            <div className="flex gap-1">
                            <input type="text" class="h-8 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Status Code" required/>
                            <input type="text" class="h-8 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Remark" required/>
                            </div> 
                            <div className=" ">
                
                                <svg className="text-red-400 hover:bg-white hover:cursor-pointer rounded-full w-5 h-5 font-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                     <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </div>
                        </div>)
                  })}
                    
                
              </div>
              <div className=" float-right " title="Add Input Field">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#F0BD66] hover:bg-white hover:cursor-pointer rounded-full w-5 h-5 font-block" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
              
            </div>
            </>)
    }
      
  }

const Layout = (props) => {

    const router = useRouter()

    
    const gridRef = useRef();
    const addEmptyRow = () => {
        const newId = rowData.length + 1;
        const newEmptyRow = { id: newId, resource: '',address:'',protocol:'',payload:'',statusCode:'' }; // Customize this according to your data structure
        setRowData([...rowData, newEmptyRow]);
      };
    const [rowData, setRowData] = useState([
        {
            "resource":"Register User",
            "address":"/register",
            "protocol":"POST",
            "payload":[{"fieldName":"username","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"},{"fieldName":"password","dataType":"string"}],
            "statusCode":[{"code":"200","remark":"OK"},{"code":"300","remark":"user not found"}],
            
        },{
            "resource":"Register User",
            "address":"/register",
            "protocol":"POST",
            "payload":[{"fieldName":"username","dataType":"string"}],
            "statusCode":[{"code":"200","remark":"OK"},{"code":"300","remark":"user not found"}],
            
        },{
            "resource":"Register User",
            "address":"/register",
            "protocol":"POST",
            "payload":[{"fieldName":"username","dataType":"string"},{"fieldName":"password","dataType":"string"}],
            "statusCode":[{"code":"200","remark":"OK"},{"code":"300","remark":"user not found"}],
            
        },{
            "resource":"Register User4",
            "address":"/register",
            "protocol":"POST",
            "payload":[{"fieldName":"username","dataType":"string"},{"fieldName":"password","dataType":"string"}],
            "statusCode":[{"code":"200","remark":"OK"},{"code":"300","remark":"user not found"}],
            
        },{
            "resource":"Register User",
            "address":"/register",
            "protocol":"POST",
            "payload":[{"fieldName":"username","dataType":"string"},{"fieldName":"password","dataType":"string"}],
            "statusCode":[{"code":"200","remark":"OK"},{"code":"300","remark":"user not found"}],
            
        },
    ]); // Set rowData to Array of Objects, one Object per Row

    

     // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        {headerName:'Resource',field: 'resource', filter: true,},
        {headerName:'Address',field: 'address', filter: true},
        {headerName:'Protocol',field: 'protocol', filter: true, width:140},
        {headerName:'Payload',field: 'payload', filter: true,width:400,cellRenderer: payloadCell, autoHeight: true,editable: false},
        {headerName:'Status Code',field: 'statusCode', filter: true,cellRenderer: statusCodeCell, autoHeight: true,editable: false},
        {headerName:'Action', headerComponentFramework: ButtonFilterHeaderComponent,headerComponentParams:{addEmptyRow:addEmptyRow},filter: false, cellRenderer: ActionButton,cellRendererParams: { setModalToggle: props.setModalToggle,setAlumniData:props.setAlumniData,setReloadChild:props.setReloadChild }},

        
    ]);
    
    const defaultColDef = useMemo(() => {
        return {
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          sortable: true,
          resizable: true,
          filter: true,
          flex: 0,
          minWidth: 100,
          
          filter: 'agTextColumnFilter',
          floatingFilter: true,
        };
      }, []);

       // Example load data from server
       
        // useEffect(async () => {
        //     !isUserSignedIn() ? router.push('/') : null
        //     let token = localStorage.getItem('token')
        //     await axios.get(`${process.env.SERVER_API}api/alumni/admin`,{
        //         headers: {
        //           'Authorization': token
        //         },
        //       })
        //     .then((rowData) => {

        //     rowData.data.map(item=>item.name.full_name = item.name.first_name + " " + item.name.middle_name + " "+ item.name.last_name)
        //     rowData.data.map(item=>item.permanent_address.display_name = item.permanent_address.permanent_street + " " + item.permanent_address.permanent_district + " "+ item.permanent_address.permanent_state+" "+item.permanent_address.permanent_country)

        //     setRowData(rowData.data)
        //     }).catch((err)=>alert(" We're sorry, but it seems your session has expired or you have been logged out. Please log in again to continue. Thank you!"))
        // }, [props.reloadChild]);

        const getRowStyle = params => {
            return {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              margin: '0.5rem 0',
              backgroundColor: 'rgba(249, 250, 254, 0.7)',
              
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
            //   cursor: 'pointer'
            };
          };

          const getRowHeight = useCallback((params) => {
           const rowHeight = 0
            switch (3   ) {
                case 0:
                    rowHeight = params.data.payload.length*35 + 45
                    break;
                case 1:
                    rowHeight = params.data.statusCode.length*35 + 45
                    break;
                case 2:
                    rowHeight = Math.max(...[params.data.payload.length*35 + 45, params.data.statusCode.length*35 + 45])
                    break;
            
                default:
                    rowHeight = 45
                    break;
            }
            return  rowHeight
          }, []);

          const containerStyle = useMemo(() => ({
            width: 'auto',
            height: '450px', // Fixed height in pixels
          }), []);
          
          const gridStyle = useMemo(() => ({
            height: '70vh', // Responsive height based on viewport height
            width: 'auto',
          }), []);

          
    
    return (<>
                             <style >{`
                                .ag-theme-alpine {
                                    // --ag-header-height: 30px;
                                    --ag-header-foreground-color: black;
                                    --ag-header-background-color: rgba(248, 247, 252,0);
                                    // --ag-header-background-color: rgb(248, 247, 252);
                                    // --ag-header-cell-hover-background-color: rgb(248, 247, 252);
                                    // --ag-header-cell-moving-background-color: rgb(248, 247, 252);
                                  }
                                  
                                  
                                  .ag-theme-alpine {
                                        /* disable all borders */

                                        --ag-borders: none;

                                        /* then add back a border between rows */

                                        --ag-row-border-style: solid;
                                        --ag-row-border-width: 2px;

                                        // --ag-row-border-color: rgb(150, 150, 200);
                                        --ag-row-border-color: rgb(240, 189, 102);
                                    }
                                    .ag-theme-alpine {
                                        // --ag-foreground-color: rgb(126, 46, 132);
                                        --ag-background-color: rgba(248, 247, 252, 0.5);
                                        // --ag-header-foreground-color: rgb(204, 245, 172);
                                        // --ag-header-background-color: rgb(209, 64, 129);
                                        // --ag-odd-row-background-color:  rgba(248, 247, 252, 0.5);
                                        // --ag-header-column-resize-handle-color: rgb(126, 46, 132);
                                      
                                        // --ag-font-size: 17px;
                                        // --ag-font-family: monospace;
                                      }

                                      .ag-theme-alpine {
                                        --ag-borders-input: solid 2px;
                                        --ag-input-border-color: rgb(240, 189, 102);
                                        // --ag-input-border-color: rgb(240, 189, 102);
                                        // --ag-input-border-color: rgb(240, 189, 102);
                                    }
                                  
                                  `}
                             </style>
                             
                              <div style={containerStyle} className="my-8  ">
                                    <div  className="ag-theme-alpine 2xl:h-[80vh] md:h-[70vh]  ">
                                        
                                        <AgGridReact
                                            className="w-full h-full "
                                            ref={gridRef}
                                            columnDefs= {columnDefs}
                                            rowData= {rowData}
                                            getRowStyle={getRowStyle}

                                            defaultColDef={defaultColDef}
                                            getRowHeight={getRowHeight}
                                            pagination={true}
                                            // rowSelection={'single'}
                                            // onSelectionChanged={onSelectionChanged}

                                            >
                                              
                                              
                                        </AgGridReact>
                                    </div>
                              </div>
    </>)
}

export default Layout