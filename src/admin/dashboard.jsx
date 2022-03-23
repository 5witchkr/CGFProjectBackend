import react from 'react';
import styled from 'styled-component';

const Wrapper = styled.main`
    height: 100vh;
    background-image: url("https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_960_720.jpg");
    background-size: cover;
`;

const Text = styled.p`
    margin-top: 10vh;
    margin-left: 10vh;
    font-size: 3rem;
    color: white;
`;

export default function Dashboard() {
    return (
    <Wrapper>
        <Text>Admin Page</Text>
    </Wrapper>
    );
}