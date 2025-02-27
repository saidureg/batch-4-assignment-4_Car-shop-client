import { useState } from "react";
import { Form, Input, Button } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginValues) => {
    const toastId = toast.loading("Logging in...");
    setLoading(true);
    console.log("Success:", values);

    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      };

      const res = await login({
        ...userInfo,
        headers: {
          "Content-Type": "application/json",
        },
      }).unwrap();
      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ token: res.data.token, user: user }));
      toast.success("Login successful!", { id: toastId, duration: 2000 });
      setLoading(false);
      console.log("User:", user);
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Login failed!", { id: toastId, duration: 2000 });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        className="login-form"
      >
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
