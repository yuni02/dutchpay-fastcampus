
import styled from 'styled-components'

export const OverlayWrapper = ({ children, padding, minheight }) => (
    <StyledContainer padding={padding} minheight={minheight} >{ children }</StyledContainer>
)

const StyledContainer = styled.div`
  padding: ${(props) => props.padding || '5vw'};
  border-radius: 15px;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  min-height: ${(props) => props.minheight || '0'};
`