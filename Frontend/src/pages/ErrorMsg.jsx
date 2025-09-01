function ErrorMSg({ message }) {
  return (
    <div className="alert alert-danger col-6 offset-3">
      <strong>Error:</strong> {message}
    </div>
  );
}

export default ErrorMSg;
