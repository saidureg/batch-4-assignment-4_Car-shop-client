import { Table, Button, Modal } from "antd";
import { toast } from "sonner";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../../redux/features/user/userManagement.api";
import { useState } from "react";

const UserTable = () => {
  const { data: allUsers } = useGetAllUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleBlockUser = async (id: string): Promise<void> => {
    try {
      const user = allUsers?.data?.find((user) => user._id === id);

      if (user?.isBlocked) {
        toast.warning("User is already blocked and cannot be blocked again");
        return;
      }
      await blockUser(id);
      toast.success("User status updated successfully!");
    } catch (error) {
      toast.error("Error updating user status");
    }
  };

  const handleDeleteUser = async (id: string): Promise<void> => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const showConfirmModal = (user: any) => {
    if (user.isBlocked) {
      toast.warning("User is already blocked.");
      return;
    }
    setSelectedUser(user);
    setIsConfirmModalOpen(true);
  };

  const confirmBlockUser = () => {
    if (selectedUser) {
      handleBlockUser(selectedUser._id);
      setIsConfirmModalOpen(false);
      setSelectedUser(null);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (
        <span
          style={{ fontWeight: "bold", color: isBlocked ? "red" : "green" }}
        >
          {isBlocked ? "Blocked" : "Active"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <span>
          <Button
            type="link"
            danger
            onClick={() => showConfirmModal(record)}
            disabled={record.isBlocked}
          >
            {record.isBlocked ? "Blocked" : "Deactivate"}
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteUser(record._id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 8px" }}>
      <Table
        style={{ width: "100%", height: "100vh" }}
        dataSource={allUsers?.data}
        columns={columns}
        scroll={{ x: true }}
        bordered
      />

      <Modal
        title="Confirm Action"
        open={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
        onOk={confirmBlockUser}
        okText="Deactivate User"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to <strong>deactivate</strong> this user? Once
          deactivated, they cannot be reactivated.
        </p>
      </Modal>
    </div>
  );
};

export default UserTable;
