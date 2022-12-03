
interface IProps {
  info: string;
}
const CustomLabel = ({ info }: IProps) => {
  return <div className="customLabel">{info} </div>;
};

export default CustomLabel;
