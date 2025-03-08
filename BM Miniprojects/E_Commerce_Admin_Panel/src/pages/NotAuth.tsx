
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotAuth = () =>{
    // https://chatgpt.com/c/67cc284c-cd58-800f-af03-34ace8e9c737
    // https://recharts.org/en-US/examples
const navigate = useNavigate();
 return (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" onClick={()=>navigate('/orders')}>Back Home</Button>}
  />
);
}

export default NotAuth;