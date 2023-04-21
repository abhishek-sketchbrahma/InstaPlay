import Spinner from "react-spinkit";

const Loader = ({ height, width }) => {
  return (
    <>
      <Spinner name='three-bounce' color='white' style={{ width, height }} />
    </>
  );
};
export default Loader;
