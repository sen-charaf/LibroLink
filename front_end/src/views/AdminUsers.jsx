import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PenaltyForm from "@/components/PenaltyForm";


export default function AdminUsers() {
  const rows = [
    {
      id: 1,
      username: "@sen_charaf",
      displayname: "Charaf Eddine",
      subscribed: true,
      email: "kaouri.charafeddine@gmail.com",
      created_at: "2024-03-02 20:08:58",
      updated_at: "2024-03-02 20:08:58",
    },
    { id: 2, username: "@mohamed", displayname: "Mohammed" },
    { id: 3, username: "@ussef", displayname: "Youssef" },
  ];

  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 60,
      renderCell: () => (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      ),
      sortable: false,
      filterable: false,
    },
    { field: "username", headerName: "Username", width: 150 },
    { field: "displayname", headerName: "Displayname", width: 150 },
    {
      field: "subscribed",
      headerName: "Subscribed",
      width: 150,
      type: "boolean",
      editable: true,
    },
    { field: "email", headerName: "Email", width: 180, editable: false },
    {
      field: "created_at",
      headerName: "Created_at",
      width: 180,
      editable: false,
      
    },
    {
      field: "updated_at",
      headerName: "updated_at",
      width: 180,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: () => (
        <PenaltyForm />
      ),
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center w-full mx-10">
        <h1 className="text-2xl w-full font-semibold mx-10 mt-5">Users</h1>
        <div className=" lg:w-[60rem] 2xl:w-[80rem]  bg-white p-3 my-24 rounded-sm ">
          <p className="text-sm mb-3">
            This is where user management content will be displayed.
          </p>
          <div className="font-[520] text-[0.9rem] mb-1">User statictics</div>
          <div className="flex flex-row justify-between gap-2 w-full mb-6">
            <div className="flex flex-col justify-center bg-orange-400 rounded-sm h-16 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Total Users
              <div className="font-bold text-[1.5rem]">1000</div>
            </div>
            <div className="flex flex-col justify-center bg-orange-400 rounded-sm h-16 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Subscribed Users
              <div className="font-bold text-[1.5rem]">300</div>
            </div>
            <div className="flex flex-col justify-center bg-orange-400 rounded-sm h-16 text-white text-[0.9rem] font-medium p-2 w-1/3">
              Non-subscribed Users
              <div className="font-bold text-[1.5rem]">700</div>
            </div>
          </div>
          <div className="">
            <DataGrid
              sx={{ m: 1 , }}
              autoHeight
              rows={rows}
              columns={columns}
              columnHeaderHeight={40}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10, 50, 100]}
              rowSelection={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}