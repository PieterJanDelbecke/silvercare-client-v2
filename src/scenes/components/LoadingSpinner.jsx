import { RotatingLines, TailSpin } from "react-loader-spinner";
import { colors } from "../../styles/theme";
import styled from "@emotion/styled";

const Container = styled.div`
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoadingSpinner = () => {
	return (
		<Container>
			<RotatingLines
				visible={true}
				height="48"
				width="48"
				strokeColor={colors.blueAccent[500]}
				strokeWidth="5"
				animationDuration="0.75"
				ariaLabel="rotating-lines-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</Container>
	);
};

export default LoadingSpinner;
