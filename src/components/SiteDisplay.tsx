
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

type DeleteFunction = () => void;
interface SiteDisplayProps {
    deleteSite: DeleteFunction,
    site: String
}

const Container = styled.div`
    display: inline-block;
`;

export default function SiteDisplay(props: SiteDisplayProps) {

    // Render the row that contains the delete and site. Add deletion role for accessibility and testing.
    return (
        <Container>
            <MdDelete onClick={props.deleteSite} role='deletion' />
            <p>{props.site}</p>
        </Container>
    );
}
