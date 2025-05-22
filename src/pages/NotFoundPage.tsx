import { Link, useRouteError } from 'react-router-dom';
import { Result, Button } from 'antd';

interface RouterError {
  statusText?: string;
  message?: string;
}

const NotFoundPage = () => {
  const error = useRouteError() as RouterError | Error | null;

  let errorMessage =
    "The page you're looking for doesn't exist or has been moved.";

  if (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if ('statusText' in error && error.statusText) {
      errorMessage = error.statusText;
    } else if ('message' in error && error.message) {
      errorMessage = error.message;
    }
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle={errorMessage}
      extra={
        <Button type="primary">
          <Link to="/">Go Home</Link>
        </Button>
      }
    />
  );
};

export default NotFoundPage;
