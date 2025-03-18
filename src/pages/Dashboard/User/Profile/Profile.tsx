import { Card, Avatar, Button, Modal, Form, Input } from "antd";
import { UserOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TUser } from "../../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../../utils/verifyToken";
import { useChangePasswordMutation } from "../../../../redux/features/user/userManagement.api";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = verifyToken(token) as TUser;
      setUser(userData);
    }
  }, []);

  const handleChangePassword = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const toastId = toast.loading("Changing password...");
    try {
      const response = await changePassword(values).unwrap();
      if (response.error) {
        toast.error(response.data?.message || "Failed to change password.", {
          id: toastId,
          duration: 2000,
        });
        return;
      }
      toast.success(response.message || "Password changed successfully!", {
        id: toastId,
        duration: 2000,
      });
      setIsModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to change password.", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card
        style={{
          width: 450,
          height: 500,
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Avatar
          size={200}
          icon={<UserOutlined />}
          src="https://i.ibb.co.com/1t2tDpp9/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thu.png"
        />
        <h2 style={{ marginTop: "15px", fontSize: "1.7rem" }}>
          {user?.userEmail?.split("@gmail.com")[0].toUpperCase() ||
            "Unknown User"}
        </h2>
        <p style={{ color: "#666", marginBottom: "10px", fontSize: "1.1rem" }}>
          {user?.userEmail}
        </p>
        <p>
          <strong>Role:</strong> {user?.role || "N/A"}
        </p>

        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ marginTop: "15px" }}
          onClick={() => setIsModalOpen(true)}
        >
          Change Password
        </Button>
      </Card>

      <Modal
        title="Change Password"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item label="Email">
            <Input disabled value={user?.userEmail} />
          </Form.Item>
          <Form.Item
            label="Current Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter current password"
            />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter a new password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter new password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
