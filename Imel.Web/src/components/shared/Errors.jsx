export const Errors = ({ errors }) => {
  return (
    <>
      {errors.length > 0 &&
        errors.map((error, index) => {
          return (
            <p key={index} className="error-field">
              - {error}
            </p>
          );
        })}
    </>
  );
};
