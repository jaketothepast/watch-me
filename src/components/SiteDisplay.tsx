
import { useSetAtom } from 'jotai';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { sitesAtom } from '../state';

type DeleteFunction = () => void;
interface SiteDisplayProps {
    site: String
}

const Container = styled.div`
    display: inline-block;
`;

export default function SiteDisplay(props: SiteDisplayProps) {

    const setSites = useSetAtom(sitesAtom);

    function deleteSite(site: String) {
        console.log("deleting");
        setSites((sites) => {
            return sites.filter((s) => s !== site);
        });
    }

    // Render the row that contains the delete and site. Add deletion role for accessibility and testing.
    return (
        <Container>
            <MdDelete onClick={() => deleteSite(props.site)} role='deletion' />
            <p>{props.site}</p>
        </Container>
    );
}
