import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import "./Register.css";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterValues) => {
    setLoading(true);
    const toastId = toast.loading("Registering...");

    try {
      const userInfo = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const res = await register(userInfo).unwrap();
      if (res.error) {
        toast.error(res.data?.message || "Registration failed!", {
          id: toastId,
          duration: 2000,
        });
        return;
      }
      toast.success("Registration successful!", {
        id: toastId,
        duration: 2000,
      });
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Registration failed!", { id: toastId, duration: 2000 });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-container">
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        className="register-form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          Already have an account <Link to="/login">Login</Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
